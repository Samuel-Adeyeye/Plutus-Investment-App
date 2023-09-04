import express, { Request, Response, NextFunction } from "express";
import Company, { ICOMPANY } from "../../model/company";
import User, { IUSER } from "../../model/user";
import { v4 } from "uuid";
import { hashedPassword } from "../../utils/auth";
import { generateOTP } from "../../utils/auth";
import { sendmail, emailHtmlForCompany, emailHtmlForCompanyTransferToInvestor, sendmailForInvestment } from "../../utils/notifications";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { companyAccount } from "../../utils/auth";
import Joi from "joi";
import bcrypt from "bcrypt";
import { createCompanySchema, companyLogin } from "../../utils/inputvalidation";
import Investor from "../../model/investor";
import investment_Records from "../../model/investmentRecord";
import { Op } from "sequelize";
import roiTransferRecord, { RECORD } from "../../model/roiTransferRecord";


dotenv.config();


//Controller For Creating Company
export const createCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const schema = createCompanySchema
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const token: any = req.headers.authorization;
      const token_info = token.split(" ")[1];
      const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

      const userId = decodedToken.id
      const company_details:any = await User.findOne({
        where: { id: userId}
      }) 
      const user_role = company_details.role
  
      if (decodedToken) {
        const {
          companyName,
          company_description,
          email,
          password,
          businessType,
          roi,
          investment_category,
          investment_description,
          duration,
          min_investment_amount,
          max_investment_amount,
        } = req.body;
  
        const findCompany:any = await Company.findOne({
          where: {
            [Op.or]: [
              { email: email },
              { companyName: companyName }
            ]
          }
        });
  
        if (findCompany) {
          return res.status(400).json({
            message: `${companyName} has already been registered.`,
          });
        } else {
          if (user_role === "admin") {
            const OTP = generateOTP();
  
            const company_account_number: string = companyAccount();
  
            const hashPassword: string = await hashedPassword(password);
  
            let newCompany = (await Company.create({
              id: v4(),
              companyName,
              company_description,
              email,
              password: hashPassword,
              otp: OTP,
              accountNumber: company_account_number,
              wallet: 1000000,
              verified: true,
              role: "company",
              active: true,
              businessType,
              roi,
              noOfInvestors: 0,
              investment_category,
              investment_description,
              duration,
              min_investment_amount,
              max_investment_amount,
              imageUrl: "",
              phoneNumber: "",
              address: "",
              zipCode: "",
              city: "",
              state: "",
              country: ""
            })) as unknown as ICOMPANY;
  
            const company_dets = (await Company.findOne({
              where: { email },
            })) as unknown as ICOMPANY;
  
            if (newCompany) {
              const html = emailHtmlForCompany(companyName, email, password);
              await sendmail(
                `${process.env.DEV_GMAIL_USER}`,
                email,
                "Welcome",
                html
              );
              return res.status(200).json({
                message: `${companyName} created successfully`,
                data: newCompany,
              });
            }
          } else {
            return res.status(400).json({
              message: "You are not an ADMIN user.",
            });
          }
        }
        // } else {
        //   return res.status(400).json({
        //     message: `${companyName} has already been registered.`,
        //   });
        // } else {
        //   if (user_role === "admin") {
        //     const OTP = generateOTP();

        //     const company_account_number: string = companyAccount();

        //     const hashPassword: string = await hashedPassword(password);

        //     let newCompany = (await Company.create({
        //       id: v4(),
        //       companyName,
        //       company_description,
        //       email,
        //       password: hashPassword,
        //       otp: OTP,
        //       accountNumber: company_account_number,
        //       wallet: 0,
        //       verified: true,
        //       role: "company",
        //       active: true,
        //       businessType,
        //       roi,
        //       noOfInvestors: 0,
        //       investment_category,
        //       investment_description,
        //       duration,
        //       min_investment_amount,
        //       max_investment_amount,
        //       imageUrl: "",
        //       phoneNumber: "",
        //       address: "",
        //       zipCode: "",
        //       city: "",
        //       state: "",
        //       country: ""
        //     })) as unknown as ICOMPANY;

        //     const company_dets = (await Company.findOne({
        //       where: { email },
        //     })) as unknown as ICOMPANY;

        //     if (newCompany) {
        //       const html = emailHtmlForCompany(companyName, email, password);
        //       await sendmail(
        //         `${process.env.DEV_GMAIL_USER}`,
        //         email,
        //         "Welcome",
        //         html
        //       );
        //       return res.status(200).json({
        //         message: `${companyName} created successfully`,
        //         data: newCompany,
        //       });
        //     }
        //   } else {
        //     return res.status(400).json({
        //       message: "You are not an ADMIN user.",
        //     });
        //   }
      } else {
      return res.status(400).json({
        message: `You are not an AUTHENTICATED USER`,
      });
    }
  } catch (error) {
    console.error("Error creating company:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Controller for Company Login

export const loginCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = companyLogin;
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const company_details = (await Company.findOne({
      where: { email },
    })) as unknown as IUSER;

    if (!company_details) {
      return res
        .status(404)
        .json({
          message: `Company does not exist, please register via the Signup page`,
        });
    } else {
      const validate = await bcrypt.compare(password, company_details.password);

      if (validate) {
        const token = jwt.sign(
          { email: company_details.email, id: company_details.id },
          process.env.APP_SECRET!,
          { expiresIn: "1d" }
        );

        return res.status(200).json({
          message: `Login SUCCESSFUL`,
          token,
          company_details
        });
      } else {
        return res.status(400).json({
          message: `Invalid Password. Please ensure password is correct.`,
        });
      }
    }
  } catch (error) {
    console.error("Login company:", error);
    return res.status(500).json({
      message: `Internal Server Error`,
      Error: "/company/login",
    });
  }
};


export const updateCompanyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    if (decodedToken) {
      const { companyName, email, phoneNumber, address, zipCode, city, state, country } = req.body;
      const company_id = decodedToken.id;

      const company_profile: any = await Company.findOne({
        where: { id: company_id }
      });

      const company_role = company_profile.role;
      if (company_role === "company") {

        const company_update_profile = await Company.update({ companyName, phoneNumber, address, zipCode, city, state, country },
          {
            where: {
              email
            }
          });
        
          const get_company_dets = await Company.findOne({
            where: {
              id: company_id
            }
          });
  
          return res.status(200).json({
            message: `Company profile updated SUCCESSFULLY`,
            data: get_company_dets
          });
  
        } else {
          return res.status(400).json({
            message: `You are not an authorized company. Please insert token.`
          });
        }
      }
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

        
// export const updateCompanyProfile = async(req: Request, res: Response, next: NextFunction) => { 
//   try { 

//   let { companyName,email, phoneNumber, address, zipCode, city, state, country } = req.body

//     console.log("image live", companyName, email, phoneNumber, address, zipCode, city, state, country)

//   const updateField: Partial<ICOMPANY> = {}

//   if(companyName !== ""){
//       updateField.companyName = companyName
//   }
//   if(email !== ""){
//       updateField. email =  email
//   }
//   if(phoneNumber !== ""){
//       updateField. phoneNumber =  phoneNumber
//   }
//   if(address !== ""){
//       updateField. address =  address
//   }
//   if(zipCode !== ""){
//       updateField. zipCode =  zipCode
//   }
//   if(city !== ""){
//       updateField. city =  city
//   }
//   if(state !== ""){
//       updateField. state =  state
//   }
//   if(country !== ""){
//       updateField. country =  country
//   }
//   console.log('update live',updateField)
//   const updatedCompany = await Company.update(updateField,  {where: {email: email }} ) as unknown as ICOMPANY

//      if (updatedCompany) {
//         return res.status(200).json({
//            message: `Company updated successfully`,
//            data: updatedCompany
//         });
//      }

//      return res.status(401).json({
//         message: `Update operation failed`
//      });
//   } catch (error: any) {
//      console.log(error.message);
//      return res.status(500).json({ message: 'Internal server error' });
//   }
// };

export const createCompanyImage = async (req: JwtPayload, res: Response) => {
  try {

    const { id } = req.user;



    const user = await Company.findOne({ where: { id: id } }) as unknown as ICOMPANY;

    const updateField: Partial<ICOMPANY> = {};


    const updateUserImage = await Company.update({ imageUrl: req.file?.path }, { where: { id: id } }) as unknown as ICOMPANY;

    if (updateUserImage) {
      return res.status(200).json({
        message: `User updated successfully`,
        data: updateUserImage
      });
    }

    return res.status(401).json({
      message: `Update operation failed`
    });

  } catch (error) {
    return res.status(500).json({
      message: `Error Uploading Imsge`
    });
  }

};

//Controller for deleting company
export const deleteCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
   
      const token: any = req.headers.authorization;
      const token_info = token.split(" ")[1];
      const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
  
      if(decodedToken){
        const company_id:any = decodedToken.id
        const company_details:any = await Company.findOne({ where: {id:company_id}})
        
        if(company_details){
          const user_role = company_details.role
          if(user_role === "company"){
          
          const { accountNumber } = req.body
          const investor_main_details:any = await User.findOne({ where: { accountNumber }})
          
          if(investor_main_details){
            const investor_id_number:any = investor_main_details.id
      
            await Company.destroy();
            res.status(200).json({ message: "Company deleted successfully" });
          }
        }
        }
    }
  } catch (error) {
    console.log("Error deleting company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const companyTransferToInvestor = async (req:Request, res:Response, next: NextFunction) => {

  try{
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    if(decodedToken){
      const company_id:any = decodedToken.id
      const company_details:any = await Company.findOne({ where: {id:company_id}})
      
      if(company_details){
      const user_role = company_details.role
      if(user_role === "company"){
      
      const { accountNumber } = req.body

      const investor_main_details:any = await User.findOne({ where: { accountNumber }})

      if(investor_main_details){
        const investor_id_number:any = investor_main_details.id

        const investor_investment_details:any = await investment_Records.findOne({
          where: {
            [Op.and]: [
              { investment_company_id: company_id },
              { investor_id:investor_id_number }
            ]
          }
        });

        if(investor_investment_details){

          const investor_investment_status = investor_investment_details.transaction_status
          const investor_name:any = investor_investment_details.investor_name

          if(investor_investment_status === "SUCCESSFUL"){
            const company_account_number = company_details.accountNumber
            const company_account_balance = +((company_details.wallet).toFixed(2))
            const name_of_company = company_details.companyName

            const investor_account_balance = investor_main_details.accountBalance

            const investor_email = investor_main_details.email

            const investor_returns_record:any = await Investor.findOne({
              where: {
                [Op.and]: [
                  { email:investor_email },
                  { companyId:company_id }
                ]
              }
            });

            if(investor_returns_record){

              const investor_return_of_investment = +((investor_returns_record.expectedReturn).toFixed(2))

              if(investor_return_of_investment < company_account_balance){
                const new_investor_balance = investor_account_balance + investor_return_of_investment
  
                const update_investor_accountBalance = await User.update({ 
                  accountBalance: new_investor_balance }, 
                  { where: {accountNumber}})

                const new_company_balance = company_account_balance - investor_return_of_investment

                const update_company_wallet = await Company.update({ 
                  wallet: new_company_balance }, 
                  { where: {accountNumber: company_account_number}})

                  if(update_investor_accountBalance && update_company_wallet){

                    const current_investor_balance_details:any = await User.findOne({ where: { accountNumber }})
                    const current_investor_balance = current_investor_balance_details.accountBalance

                    if(current_investor_balance !== new_investor_balance){

                      await User.update({ 
                        accountBalance: investor_account_balance }, 
                        { where: {accountNumber}})

                      await Company.update({ 
                          wallet: company_account_balance }, 
                          { where: {accountNumber: company_account_number}})  
                          
                         const pending_transfer =  await roiTransferRecord.create({
                            id: v4(),
                            investor_id: investor_id_number,
                            investor_name: investor_name,
                            transfer_amount: investor_return_of_investment,
                            company_name: company_details.companyName,
                            company_id: company_id,
                            transfer_status: "PENDING"  
                          })as unknown as RECORD

                      return res.status(200).json({
                        message: `TRANSACTION PENDING!!! Sorry, your transfer of $${investor_return_of_investment} to ${investor_name} is pending. Please wait for few minutes before trying again.`,
                        data: pending_transfer
                      })                  
                    }else{

                      const successful_transfer = await roiTransferRecord.create({
                        id: v4(),
                        investor_id: investor_id_number,
                        investor_name: investor_name,
                        transfer_amount: investor_return_of_investment,
                        company_name: company_details.companyName,
                        company_id: company_id,
                        transfer_status: "SUCCESSFUL"  
                      })as unknown as RECORD

                      const get_transfer_date:any = await roiTransferRecord.findOne({
                        where: {
                          [Op.and]: [
                            { investor_id: investor_id_number },
                            { company_id: company_id }
                          ]
                        }
                      });

                      const date = get_transfer_date.createdAt

                      const email = investor_main_details.email
                      const expectedReturn = investor_return_of_investment
                      const companyName = company_details.companyName
                      const roi = company_details.roi
                      const amount = investor_investment_details.amount
                      const duration = company_details.duration

                      let actual_duration = ""
                      if(duration.split(" ")[1].toLowerCase() === "months" || duration.split(" ")[1].toLowerCase() === "month"){
                        actual_duration += duration.split("")[0]
                      }else if(duration.split(" ")[1].toLowerCase() === "year" || duration.split(" ")[1].toLowerCase() === "years"){
                        actual_duration += (duration.split("")[0] * 12)
                      }

                      const monthlyReturn = investor_returns_record.monthlyReturn

                      const html = emailHtmlForCompanyTransferToInvestor (investor_name, expectedReturn, companyName, roi, amount, actual_duration, monthlyReturn, date);
                      const sent_mail = await sendmailForInvestment(
                        `${process.env.GMAIL_USER}`,
                        email,
                        `CREDIT: RETURN ON INVESTMENT TO ${investor_name}`,
                        html
                      );

                      const deleting_investor_record:any = await Investor.destroy({
                        where: {
                          [Op.and]: [
                            { email: investor_email },
                            { companyId:company_id }
                          ]
                        }
                      });

                        return res.status(200).json({
                        message: `SUCCESS!!! You have successfully transferred $${investor_return_of_investment} to ${investor_name}.`,
                        data: successful_transfer
                      })
                    }
                  }else{

                    const failed_transfer = await roiTransferRecord.create({
                      id: v4(),
                      investor_id: investor_id_number,
                      investor_name: investor_name,
                      transfer_amount: investor_return_of_investment,
                      company_name: company_details.companyName,
                      company_id: company_id,
                      transfer_status: "FAILED"  
                    })as unknown as RECORD

                    return res.status(200).json({
                      message: `Transfer FAILED. Please wait for few minutes before trying again.`,
                      data: failed_transfer 
                    })
                  }

              }else{
                return res.status(200).json({
                  message: `Company account does not have sufficient balance to make this transfer.`
                })              
              }

            }else{
              return res.status(400).json({
                message: `${investor_name} does not have any active investment with ${name_of_company}`
              })
            }
          }else{
            return res.status(400).json({
              messsage: `Thare is NO SUCCESSFUL INVESTMENT from ${investor_main_details.firstName} ${investor_main_details.lastName} to ${company_details.companyName}.`
            })
          }
        }else{
          return res.status(400).json({
            message: `No investment record found for your company.`
          })
        }

      }else{
        return res.status(400).json({
          message: `User with that account number doesn't exist. Please ensure you have the correct account number`
        })
      }
      
      }else{
        return res.status(400).json({
          message: `SORRY! You are not registered as a company.`
        })
      }
      }else{
        return res.status(400).json({
          message:`Investor doesn't exist.`
        })
      }
    }else{
      return res.status(400).json({
        message: `Invalid User. Ensure Token is inserted.`
      })
    }
  }catch(error){
    console.error("Error in sending money to investor:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
