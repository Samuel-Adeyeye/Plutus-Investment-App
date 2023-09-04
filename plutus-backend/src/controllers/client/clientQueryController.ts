import {Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../../model/user'
import Transfers from '../../model/transfer'
import Beneficiary from '../../model/beneficiary'
import Investor from '../../model/investor';
import Company from '../../model/company'


dotenv.config();

export const getUsersBalance = async (req: Request, res: Response) => {
  try {
    const token: any = req.headers.authorization;
    const payload = token.split(" ")[1];
    const user_details: any = jwt.verify(payload, process.env.APP_SECRET!);

    if (user_details.id) {
      const user_id = user_details.id;

      const user_info: any = await User.findOne({ where: { id: user_id } });

      const user_account_Balance = user_info.accountBalance;
      const user_account_Savings_Wallet_Balance =
        user_info.savingsWallet.amount;

      return res.status(200).json({
        data: {
          account_balance: user_account_Balance,
          savings_wallet: user_account_Savings_Wallet_Balance,
        },
      });
    } else {
      res.status(400).json({
        message: "Please LOGIN to get your information",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Allows Users to see Total Balance, Total Savings, Transactions History, savings goals and beneficiaries.

export const getUsersInfo = async (req: Request, res: Response) => {
  try {
    const token: any = req.headers.authorization;
    const payload = token.split(" ")[1];
    const user_details: any = jwt.verify(payload, process.env.APP_SECRET!);

    if (user_details.id) {
      const user_id = user_details.id;
      const user_info: any = await User.findOne({ where: { id: user_id } });

      const user_account_Balance = user_info.accountBalance;
      const user_account_Savings_Wallet_Balance =
        user_info.savingsWallet.amount;
      const user_account_number = user_info.accountNumber;
      const user_account_name = `${user_info.firstName} ${user_info.lastName}`;

      const user_transactions = await Transfers.findAll({
        where: { senderId: user_id },
      });
      const user_beneficiary = await Beneficiary.findAll({
        where: { userId: user_id },
      });

      return res.status(200).json({
        data: {
          account_name: user_account_name,
          account_number: user_account_number,
          account_balance: user_account_Balance,
          savings_wallet: user_account_Savings_Wallet_Balance,
          transactions_history: user_transactions,
          beneficiary: user_beneficiary,
          user: user_info,
        },
      });
    } else {
      res.status(400).json({
        message: "Please LOGIN to get your information",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllExpenses = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const user_Id = decodedToken.id;

    if (user_Id) {
      const user_TransactionsDetails: any = await Transfers.findAll({
        where: { id: user_Id },
      });
      return res.status(200).json({
        message: "All expenses for user",
        user_TransactionsDetails,
      });
    } else {
      return res.status(400).json({
        message: "Log in to get transaction details",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserDetails = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const user_Id = decodedToken.id;

    if (user_Id) {
      const user_Details: any = await User.findOne({
        where: { id: user_Id },
      });
      return res.status(200).json({
        message: "All user's details",
        user_Details,
      });
    } else {
      return res.status(400).json({
        message: "Log in to get users details",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllIncome = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const user_Id = decodedToken.id;

    if (user_Id) {
      const user_Details: any = await User.findOne({
        where: { id: user_Id },
      });

      const userAccountNumber = user_Details.accountNumber;

      if (userAccountNumber) {
        const userIncome: any = await Transfers.findOne({
          where: { accountNumber: userAccountNumber },
        });

        if (userIncome) {
          return res.status(200).json({
            message: "List of user's income",
            userIncome,
          });
        } else {
          return res.status(400).json({
            message: "No income yet",
          });
        }
      } else {
        return res.status(400).json({
          message: "Invalid account number",
        });
      }
    } else {
      return res.status(400).json({
        message: "Log in to get users income",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getInvestment = async (req: Request, res: Response) => {
     try {
       const token: any = req.headers.authorization;
       // console.log(token);
       const token_info = token.split(" ")[1];
       const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
   
       const email = decodedToken.email;
       // console.log("EMAIL", email);
   
       const investment = await Investor.findAll({
         where: { email: email },
       });
       // console.log("INVESTOR", investment);
       const allInvestment = await Investor.findAll();
       console.log(allInvestment);
   
       if (investment) {
         const totalInvestedCapital = await Investor.sum("investedCapital", {
           where: { email: email },
         });
         console.log("TOTAL", totalInvestedCapital);
   
         const totalInvestments = await Investor.count({
           where: { email: email },
         });
   
         return res.status(200).json({
           message: "Fetching Investor Successfully",
           data: investment,
           totalInvestedCapital: totalInvestedCapital,
           totalInvestments: totalInvestments,
         });
       } else {
         res.status(400).json({
           message: "Error Fetching Investor",
         });
       }
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: "Internal Server Error" });
     }
   };

export const getCompanyDetails = async(req: Request, res:Response, next:NextFunction) => {
  
  try{
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

          if(decodedToken){

               const user_id = decodedToken.id

               const user_Info:any = await User.findOne({ 
                    where: 
                    { id: user_id}
               })
               const user_role = user_Info.role

               if(user_role === "user"){
                    const getAllCompanies = await Company.findAll()

                    return res.status(200).json({
                         message: `You get have SUCCESSFULLY gotten all companies data.`,
                         data: getAllCompanies
                    })
               }else{
                    return res.status(400).json({
                         message: `SORRY! You are not registered as a USER.`
                    })
               }
          }else{
               res.status(400).json({
                    message: `You are not an authroized user. Token Not Found.`
               })
          }

     }catch(error){
          console.error(error)
          res.status(500).json({
               message: `Internal Server Error getting company details`
          })
     }
}

export const getUserNotifications = async(req:Request, res:Response, next:NextFunction) => {

  try{
       const token: any = req.headers.authorization;
       const token_info = token.split(" ")[1];
       const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
     
          if(decodedToken){
               const user_id = decodedToken.id
               const user_details:any = await User.findOne({where: {id: user_id}})
               const user_role = user_details.role
               const user_name = `${user_details.firstName} ${user_details.lastName}`
               if(user_role === "user"){
                    const user_transfer_notifications = user_details.notification

                    return res.status(200).json({
                         message: `You have SUCCESSFULLY gotten all transaction notifcations of ${user_name}`,
                         data: user_transfer_notifications
                    })
               }else{
                    return res.status(400).json({
                         message: `Your account is not registered as a user.`
                    })
               }
          }else{
               return res.status(400).json({
                    message: `No Bearer Token for authorization`
               })
          }
     }catch(error){
          console.error("Error getting user notifcations", error);
          res.status(500).json({
            error: "Internal server error, Error getting notifications",
          });
     }
   }


//   try {
//     const token: any = req.headers.authorization;
//     // console.log(token);
//     const token_info = token.split(" ")[1];
//     const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

//     const email = decodedToken.email;
//     // console.log("EMAIL", email);

//     const investment = await Investor.findAll({
//       where: { email: email },
//     });
//     console.log("INVESTOR", investment);

//     if (investment) {
//       const totalInvestedCapital = await Investor.sum("investedCapital", {
//         where: { email: email },
//       });
//       console.log("TOTAL", totalInvestedCapital);

//       const totalInvestments = await Investor.count({
//         where: { email: email },
//       });

//       return res.status(200).json({
//         message: "Fetching Investor Successfully",
//         data: investment,
//         totalInvestedCapital: totalInvestedCapital,
//         totalInvestments: totalInvestments,
//         //     returnOnInvestment: investment.dataValues.returnOnInvestment
//       });
//     } else {
//       res.status(400).json({
//         message: "Error Fetching Investor",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const getInvestmentsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const companies = await Company.findAll({
      limit: 8,
      order: [["noOfInvestors", "DESC"]], // Order by highest number of investors
    });

    const companyData = companies.map((company: any) => {
      return {
        companyName: company.companyName,
        numberOfInvestors: company.noOfInvestors,
        rateOfReturn: company.roi,
      };
    });
    //     console.log("hoss", companyData);

    return res.json({
      data: companyData,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
