import express, { Request, Response, NextFunction } from "express";
import Transfers from "../model/transfer";
import User from "../model/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();





export const getAllExpenses = async (
     req: Request,
     res: Response,
     NextFunction: NextFunction) => {
     try {
          const token: any = req.headers.authorization;
          const token_info = token.split(" ")[1];
          const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

          const user_Id = decodedToken.id

          if(user_Id){
               const user_TransactionsDetails: any = await Transfers.findAll({
                    where: {id: user_Id},
               })
               return res.status(200).json({
                    message:"All expenses for user",
                    user_TransactionsDetails
               })
          }else{
               return res.status(400).json({
                    message: "Log in to get transaction details"
               })
          }
     } catch (error) {
          console.error(error)
     }
};

export const getUserDetails = async (
     req: Request,
     res: Response,
     NextFunction: NextFunction) => {

     try {
          const token: any = req.headers.authorization;
          const token_info = token.split(" ")[1];
          const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
          

          const user_Id = decodedToken.id
          
          
          if(user_Id){
               const user_Details: any = await User.findOne({
                    where: {id: user_Id},
               })
               return res.status(200).json({
                    message:"User's details",
                    user_Details
               })
          }else{
               return res.status(400).json({
                    message: "Log in to get users details"
               })
          }
          
     } catch (error) {
          console.error(error)
     }
};

export const getAllIncome = async (
     req: Request,
     res: Response,
     NextFunction: NextFunction)=>{
          try {
               const token: any = req.headers.authorization;
               const token_info = token.split(" ")[1];
               const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
          
               const user_Id = decodedToken.id
               const role = user_Id.role

               if(user_Id && role === "admin"){

                    const user_Details: any = await User.findOne({
                         where: {id: user_Id},
                    })

                    const userAccountNumber = user_Details.accountNumber

                    if(userAccountNumber){
                    const userIncome: any = await Transfers.findOne({
                         where: {accountNumber: userAccountNumber},
                    })


                         if(userIncome){
                              return res.status(200).json({
                                   message:"List of user's income",
                                   userIncome
                              })
                         }else{
                              return res.status(400).json({
                                   message: "No income yet"
                                   }) 
                         }

                    }else{
                         return res.status(400).json({
                         message: "Invalid account number"
                         })
                    }


               }else{
                    return res.status(400).json({
                         message: "Log in to get users income"
                    })
               
               }

               
          } catch (error) {
               console.error(error)
          }
};

export const getAllTransactions = async (
     req: Request,
     res: Response,
     NextFunction: NextFunction)=>{
          try {
               const token: any = req.headers.authorization;
               const token_info = token.split(" ")[1];
               const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
          
               const user_Id = decodedToken.id
               const role = user_Id.role

               if(user_Id && role === "admin"){


                    const user_Details: any = await User.findOne({
                         where: {id: user_Id},
                    })

                    const transfer_Details: any = await Transfers.findOne({
                         where: {id: user_Id},
                    })


                    const userAccountNumber = user_Details.accountNumber
                    const senderId = transfer_Details.senderId


                    if(userAccountNumber && senderId){
                         const getAllTransactions: any = await Transfers.findAll({
                              where: {accountNumber: userAccountNumber, senderId: senderId}
                         })

                         if(getAllTransactions){
                              return res.status(200).json({
                                   message: "User's transactions",
                                   getAllTransactions
                              })
                         }


                    }else{
                         return res.status(400).json({
                              message: "No such user present"
                         })  
                    }


          
               }else{
                    return res.status(400).json({
                         message: "Log in to get users transactions"
                    })             
               }

          } catch (error) {
               console.error(error)
          }
};
