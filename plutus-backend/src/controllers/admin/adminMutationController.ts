import { Request, Response, NextFunction } from "express";
import User, { IUSER } from "../../model/user";
import { v4 } from "uuid";
import { hashedPassword, tokenGenerator } from "../../utils/auth";
import { createAdminSchema } from "../../utils/inputvalidation";

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = createAdminSchema;
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { firstName, lastName, email, password } = req.body;

    const existingAdminUser = await User.findOne({ where: { email } });

    if (existingAdminUser) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      const hashPassword: string = await hashedPassword(password);

      const createAdmin = await User.create({
        id: v4(),
        firstName,
        lastName,
        email,
        password: hashPassword,
        accountNumber: "No Account Number",
        savingsWallet: { id: v4(), amount: 0 },
        otp: "",
        token: "",
        imageUrl: "",
        notification: [],
        accountBalance: 0,
        phoneNumber:"",
        role: "admin",
        verify: true,
        address: "",
        zipCode: "",
        city: "",
        state: "",
        country: "",
      }) as unknown as IUSER;

      const admin_details: any = await User.findOne({ where: { email } });

      if (admin_details.email) {
        const token = tokenGenerator({
          email: admin_details.email,
          id: admin_details.id,
        });

        return res.status(200).json({
          message: `User created successfully`,
          data: createAdmin,
        });
      } else {
        return res.status(400).json({
          messsage: `Admin account has not been created.`,
        });
      }
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  console.log("user", userId);

  try {
    const result = await User.findOne({ where: { id: userId } });
    console.log("results", result);
    if (!result)
      return res
        .status(404)
        .json({ message: "user with id ${req.params.id} not found" });
    await User.destroy({ where: { id: userId } });
    return res.status(200).json({ message: "user deleted successfully" });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};







