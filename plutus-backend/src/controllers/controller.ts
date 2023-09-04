import express, { Request, Response, NextFunction } from "express";
import Company, { ICOMPANY } from "../model/company";
import User, { IUSER } from "../model/user";
import { v4 } from "uuid";
import { hashedPassword, tokenGenerator, verifyToken } from "../utils/auth";
import { genAccount } from "../utils/auth";
import { generateOTP } from "../utils/auth";
import { emailHtml, sendmail } from "../utils/notifications";
import jwt, { JwtPayload } from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Joi from "joi";
import bcrypt from "bcrypt";

dotenv.config();
// import {database} from '../config/index'
//notes

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //HASH THE PASSWORD

  // TO CREATE USER
  try {
    const { firstName, lastName, email, password } = req.body;

    //CHECK IF THE NEW USER EMAIL ALREADY EXISTS
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //HASH THE PASSWORD

    const hashPassword: string = await hashedPassword(password);

    // Account number
    const accNumber: string = genAccount();

    // OTP
    const OTP = generateOTP();

    //CREATE THE NEW USER
    const newUser = await User.create({
      id: v4(),
      firstName,
      lastName,
      email,
      password: hashPassword,
      accountNumber: accNumber,
      savingsWallet: { id: v4(), amount: 0 },
      otp: OTP,
      token: "",
      imageUrl: "",
      notification: [],
      accountBalance: 10000,
      role: "user",
      verify: false,
      phoneNumber: "",
      address: "",
      zipCode: "",
      city: "",
      state: "",
      country: "",
    });

    const user = (await User.findOne({ where: { email } })) as unknown as IUSER;

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.APP_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    //RETURN NEW USER
    const html = emailHtml(email, OTP);
    await sendmail(`${process.env.GMAIL_USER}`, email, "Welcome", html);
    return res.status(200).json({
      message: `User created successfully`,
      newUser,
      token,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const user = (await User.findOne({ where: { email } })) as unknown as IUSER;
    if (!user) {
      return res.status(400).json({ error: "User does not exist!" });
    }
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.APP_SECRET!,
      {
        expiresIn: "10m",
      }
    );

    const html = `
              <h2>Please click on given link to reset your password</h2>
              <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
          `;

    await sendmail(`${process.env.DEV_GMAIL_USER}`, email, "Welcome", html);
    return res.status(200).json({
      message: "Verification Sent",
      method: req.method,
    });
    // return user.updateOne({ resetLink: token }, function (error, success) {
    //     if (error) {
    //         return res.status(400).json({ error: "result password link error" })
    //     } else {

    //     }
    // });
  } catch (error) {
    console.error(error);
  }
  res.json("Recover password");
};

export const verifyUser = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const { otp } = req.body;

    // Check if user exists
    const user = (await User.findOne({ where: { id } })) as unknown as IUSER;
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // Update user verification status
    await User.update(
      {
        verify: true,
      },
      {
        where: { id: id },
      }
    );

    return res.status(200).json({
      msg: "User verified",
    });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({
      Error: "Internal Server Error",
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const user = (await User.findOne({ where: { email } })) as unknown as IUSER;

    if (!user) {
      return res
        .status(404)
        .json({ message: `User does not exist, please register` });
    }
    if (user && user.verify === true) {
      const validate = await bcrypt.compare(password, user.password);

      if (validate) {
        const token = jwt.sign(
          { email: user.email, id: user.id },
          process.env.APP_SECRET!,
          { expiresIn: "1d" }
        );

        console.log("hello");
        return res.status(200).json({
          message: `Login successfully`,
          email: user.email,
          token,
          role: user.role,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName
        });
      }

      if (!validate) {
        return res.status(400).json({
          message: `Invalid Password`,
        });
      }
    }

    return res.status(400).json({
      message: `User Not Verified`,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Internal Server Error`,
      Error: "/users/login",
    });
  }
};

export const resendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;

    const verified = jwt.verify(
      token,
      process.env.APP_SECRET!
    ) as unknown as JwtPayload;

    if (!verified) {
      return res.status(400).json({
        message: "invalid token",
      });
    }

    const OTP = generateOTP();

    await User.update({ otp: OTP }, { where: { email: verified.email } });

    const html = emailHtml(verified.email, OTP);
    await sendmail(
      `${process.env.DEV_GMAIL_USER}`,
      verified.email,
      "Welcome",
      html
    );

    return res.status(200).json({ message: "resendOTP successful" });
  } catch (error) {
    return res.json({
      message: "resendOTP failed",
      error: error,
    });
  }
};

export const verifyChangePasswordEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    // Find user based on email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a random four-digit OTP
    // const otp = resetPasswordOTP(); // You need to implement this function

    // Generate token for the user (assuming generateToken is asynchronous)
    const otp = await generateOTP(); // Get plain object of the user from the query result


    const token = jwt.sign({ email: user.email, id: user.id }, process.env.APP_SECRET!, {
      expiresIn: '1d'
    });


    // Compose mail
    const mailOptions = {
      from: process.env.DEV_DEV_GMAIL_USER!,
      to: user.get().email,
      subject: "Password Reset OTP",
      text: `<h1>Your OTP for password reset is: ${otp}</h1>`,
    };

    await User.update({ otp }, { where: { email } });

    await sendmail(
      mailOptions.from,
      mailOptions.to,
      mailOptions.subject,
      mailOptions.text
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: "Invalid User" });
  }
};

export const verifyChangePasswordOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //VERIFY OTP
  //fetch otp from req.query.params
  //const id = req.user
  //const user = await User.findOne({where: {id}})
  //if(otp === user.otp) => otp correct
  try {
    const { otp } = req.body;
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    if (!user || !("otp" in user)) {
      return res.status(404).json({ message: "Invalid OTP" });
    }

    if (otp !== user.otp) {
      return res.status(404).json({ message: "Invalid OTP" });
    } else {
      user.otp = "0";
      return res.status(200).json({ message: "Proceed to Change Password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyChangePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userid = req.params.id;
    const { oldPassword, newPassword, confirm_password } = req.body;

    // Find user based on ID
    const user = (await User.findOne({
      where: { id: userid },
    })) as unknown as IUSER;

    // if (!user) {
    //     return res.status(404).json({ message: 'User not found' });
    // }

    if (newPassword !== confirm_password) {
      return res
        .status(400)
        .json({ message: "NewPassword must be the same as ConfirmPassword" });
    }

    if (oldPassword === newPassword) {
      return res
        .status(404)
        .json({ message: "Oldpaswword cannot be the same with Newpassword" });
    }

    // Check if the old password matches the one in the database
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Hash the new password
    const hashedNewPassword = await hashedPassword(newPassword);

    // Update the user's password using the Sequelize update method
    // const [affectedRows] =
    await User.update(
      { password: hashedNewPassword },
      { where: { id: userid } }
    );
    return res.json({ "Password change": "successful" });

    // if (affectedRows > 0) {
    //     return res.status(200).json({ message: 'Password reset successful' });
    // } else {
    //     return res.status(500).json({ message: 'Failed to update password' });
    // }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;

    //CHECK IF THE NEW USER EMAIL ALREADY EXISTS
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (role !== "admin") {
      return res.status(400).json({
        message: `Invalid role. Role must be 'admin'`,
      });
    }
    //HASH THE PASSWORD

    const hashPassword: string = await hashedPassword(password);

    // Account number
    const accNumber: string = genAccount();

    // OTP
    const OTP = generateOTP();

    // Token
    // const tokens = tokenGenerator({ firstName, lastName, email, role });

    //CREATE THE NEW USER
    const newUser = (await User.create({
      id: v4(),
      firstName,
      lastName,
      email,
      password: hashPassword,
      accountNumber: accNumber,
      savingsWallet: { id: v4(), amount: 0 },
      otp: OTP,
      token: "",
      imageUrl: "",
      notification: [],
      accountBalance: 0,
      phoneNumber: "",
      role: "admin",
      verify: true,
      address: "",
      zipCode: "",
      city: "",
      state: "",
      country: "",
    })) as unknown as IUSER;

    //RETURN NEW USER
    const html = emailHtml(email, OTP);
    await sendmail(`${process.env.DEV_GMAIL_USER}`, email, "Welcome", html);

    const token = tokenGenerator({ email: newUser.email, id: newUser.id });
    return res.status(200).json({
      message: `User created successfully`,
      newUser,
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    if (decodedToken) {
      const { firstName, lastName, email, phoneNumber, address, zipCode, city, state, country } = req.body;
      const user_id = decodedToken.id;

      const user_profile: any = await User.findOne({
        where: { id: user_id }
      });

      const user_role = user_profile.role;
      const user_firstName = user_profile.firstName;
      const user_lastName = user_profile.lastName;
      const user_email = user_profile.email;
      if (user_role === "user") {

        const user_update_profile = await User.update({ firstName, lastName, phoneNumber, address, zipCode, city, state, country },
          {
            where: {
              email
            }
          });

          const get_user_dets = await User.findOne({
            where: {
              id: user_id 
            }
          })

        return res.status(200).json({
          message: `Profile updated SUCCESSFULLY`,
          data: get_user_dets
        });

      } else {
        return res.status(400).json({
          message: `You are not an authorized user. Please insert token.`
        });
      }

      // const updateField: Partial<IUSER> = {};

      // if (!firstName) {
      //   updateField.firstName = firstName;
      // }
      // if (!lastName) {
      //   updateField.lastName = lastName;
      // }
      // if (!email) {
      //   updateField.email = email;
      // }
      // if (!phoneNumber) {
      //   updateField.phoneNumber = phoneNumber;
      // }

      // if(!imageUrl){
      //     updateField.imageUrl =  req.file
      // }

      // if (!address) {
      //   updateField.address = address;
      // }
      // if (!zipCode) {
      //   updateField.zipCode = zipCode;
      // }
      // if (!city) {
      //   updateField.city = city;
      // }
      // if (!state) {
      //   updateField.state = state;
      // }
      // if (!country) {
      //   updateField.country = country;
      // }

      // const updatedUser = (await User.update(updateField, {
      //   where: { email: email },
      // })) as unknown as IUSER;

      // if (updatedUser) {
      //   return res.status(200).json({
      //     message: `User updated successfully`,
      //     data: updatedUser,
      //   });
      // }

      // return res.status(401).json({
      //   message: `Update operation failed`,
      // });
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createUserImage = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    console.log("email ", email);

    const user = (await User.findOne({
      where: { email: email },
    })) as unknown as IUSER;

    const updateField: Partial<IUSER> = {};

    const updateUserImage = (await User.update(
      { imageUrl: req.file?.path },
      { where: { email: email } }
    )) as unknown as IUSER;

    if (updateUserImage) {
      return res.status(200).json({
        message: `User updated successfully`,
        data: updateUserImage,
      });
    }

    return res.status(401).json({
      message: `Update operation failed`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error Uploading Imsge`,
    });
  }
};
