import express, { Request, Response, NextFunction } from "express";
import User from "../../model/user";
import Transfers, { TRANSFER } from "../../model/transfer";
import { v4 } from "uuid";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Op } from "sequelize";

import Company from "../../model/company";
import investment_Records from '../../model/investmentRecord';
import Investor from "../../model/investor";
import { transfer_Beneficiary, transfer_InvestmentCompany, transferToSavings_Wallet } from '../../utils/inputvalidation';


dotenv.config();

export const transferToBeneficiary = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction
) => {
  
  try {
    const schema = transfer_Beneficiary;
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const {
      accountNumber,
      amount,
      transfer_purpose,
      beneficiary_name,
      beneficiary_email,
      payer_reference,
      information_for_beneficiary,
    } = req.body;

    const validated_Beneficiary: any = await User.findOne({
      where: { accountNumber },
    });

    if (decodedToken.email) {
      if (validated_Beneficiary) {
        const beneficiary_AccountNumber = validated_Beneficiary.accountNumber;

        const sender_id = decodedToken.id;
        const sender_accountDetails: any = await User.findOne({
          where: { id: sender_id },
        });
        const sender_AccountBalance = sender_accountDetails.accountBalance;
        const sender_accountNumber = sender_accountDetails.accountNumber;

        if (+sender_accountNumber !== +beneficiary_AccountNumber && +beneficiary_AccountNumber === +accountNumber) {
          if (sender_AccountBalance > amount) {

            const beneficiary_old_Account_Balance = validated_Beneficiary.accountBalance;
            const beneficiary_new_AccountBalance = amount + beneficiary_old_Account_Balance;

            const fulfilled_transaction = await User.update(
              { accountBalance: beneficiary_new_AccountBalance },
              {
                where: {
                  accountNumber: beneficiary_AccountNumber,
                },
              }
            );

            const sender_old_Account_Balance = sender_AccountBalance;
            const sender_new_Account_Balance = sender_old_Account_Balance - amount;

            const user_Transaction_Status = await User.update(
              { accountBalance: sender_new_Account_Balance },
              {
                where: {
                  accountNumber: sender_accountNumber,
                },
              }
            );

            const beneficiary_AccNumber = beneficiary_AccountNumber;

            const expected_beneficiary_balance: any = await User.findOne({
              where: { accountNumber: beneficiary_AccNumber },
            });
            const expected_beneficiary_AccountBalance = expected_beneficiary_balance.accountBalance;

            if (beneficiary_new_AccountBalance !== expected_beneficiary_AccountBalance) {

              const update_beneficiary_accountBalance = await User.update({ accountBalance: beneficiary_old_Account_Balance }, { where: { accountNumber: beneficiary_AccNumber } });
              const update_sender_accountBalance = await User.update({ accountBalance: sender_old_Account_Balance }, { where: { accountNumber: sender_accountNumber } });

              if (update_beneficiary_accountBalance && update_sender_accountBalance) {
                const pending_transfer = await Transfers.create({
                  id: v4(),
                  accountNumber,
                  amount,
                  transfer_purpose,
                  beneficiary_name,
                  beneficiary_email,
                  payer_reference,
                  information_for_beneficiary,
                  status: "PENDING",
                  senderId: sender_id,
                });

                return res.status(400).json({
                  message: "Transaction PENDING. Please wait for few minutes before trying again.",
                  data: pending_transfer
                });
              } else {
                return res.status(400).json({
                  message: `PENDING TRANSACTION. Please contact customer service or go to the nearest plutus branch.`
                });
              }
            } else {
              if (fulfilled_transaction && user_Transaction_Status) {
                const sucessful_transfer = await Transfers.create({
                  id: v4(),
                  accountNumber,
                  amount,
                  transfer_purpose,
                  beneficiary_name,
                  beneficiary_email,
                  payer_reference,
                  information_for_beneficiary,
                  status: "SUCCESSFUL",
                  senderId: sender_id,
                });
                let sender_notification = sender_accountDetails.notification
                let beneficiary_notifcation = validated_Beneficiary.notification

                const timestamp = new Date().getTime()
                const date = new Date(timestamp)
                const year = date.getFullYear()
                const month = date.getMonth()+1
                const transfer_date = date.getDate()

                const hours = date.getHours().toString().padStart(2, "0")
                const minutes = date.getMinutes().toString().padStart(2, "0")
                const seconds = date.getSeconds().toString().padStart(2, "0")

                let debit_transfer_alert = {
                  Txn: "DEBIT",
                  Ac: `${sender_accountNumber[0]}XX..${sender_accountNumber[sender_accountNumber.length-3]}${sender_accountNumber[sender_accountNumber.length-2]}X`,
                  Amt: `NGN${amount}`,
                  Des: `${validated_Beneficiary.firstName} ${validated_Beneficiary.lastName}/Transfer P APP_`,
                  Date: `${year}-${month}-${transfer_date} ${hours}:${minutes}:${seconds}`,
                  Bal: `NGN${sender_new_Account_Balance}`
                }
                sender_notification.push(debit_transfer_alert)

                const sender_Transaction_Status = await User.update(
                  { notification: sender_notification },
                  {
                    where: {
                      accountNumber: sender_accountNumber,
                    },
                  }
                );

                let credit_transfer_alert = {
                  Txn: "CREDIT",
                  Ac: `${beneficiary_AccountNumber[0]}XX..${beneficiary_AccountNumber[beneficiary_AccountNumber.length-3]}${beneficiary_AccountNumber[beneficiary_AccountNumber.length-2]}X`,
                  Amt: `NGN${amount}`,
                  Des: `${sender_accountDetails.firstName} ${sender_accountDetails.lastName}/Transfer P APP_`,
                  Date: `${year}-${month}-${transfer_date} ${hours}:${minutes}:${seconds}`,
                  Bal: `NGN${beneficiary_new_AccountBalance}`
                }
                beneficiary_notifcation.push(credit_transfer_alert)

                const beneficiary_Transaction_Status = await User.update(
                  { notification: beneficiary_notifcation },
                  {
                    where: {
                      accountNumber: beneficiary_AccountNumber,
                    },
                  }
                );

                return res.status(200).json({
                  message: "Transaction Successful",
                  data: sucessful_transfer
                });
              } else {
                const failed_transfer = await Transfers.create({
                  id: v4(),
                  accountNumber,
                  amount,
                  transfer_purpose,
                  beneficiary_name,
                  beneficiary_email,
                  payer_reference,
                  information_for_beneficiary,
                  status: "FAILED",
                  senderId: sender_id,
                });
                return res.status(400).json({
                  message: "Transaction Failed",
                  data: failed_transfer
                });
              }
            }

          } else {
            return res.status(400).json({
              message: "Insufficient Funds",
            });
          }
        } else {
          return res.status(400).json({
            message: "Cannot make TRANSFER. Please check details properly.",
          });
        }
      } else {
        return res.status(400).json({
          message: "Beneficiary Account Number is not found",
        });
      }
    } else {
      return res.status(400).json({
        message: "You must be LOGGED IN to make a transfer",
      });
    }
  } catch (error) {
    console.error("Error Transferring to user:", error);
    return res.status(500).json({
      Error: "Internal Server Error",
    });
  }
};


export const transferToSavingsWallet = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction
) => {
  try {
    const schema = transferToSavings_Wallet;
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    if (decodedToken.email) {
      const { amount } = req.body;

      const user_id = decodedToken.id;
      const user_info: any = await User.findOne({ where: { id: user_id } });

      const user_savings_balance = user_info.savingsWallet;
      const user_balance_amount = user_savings_balance.amount;
      const user_accountBalance = user_info.accountBalance;

      if (amount < user_accountBalance) {

        const new_Savings_Balance = user_balance_amount + amount;

        const savings_wallet_obj = { id: user_id, amount: new_Savings_Balance };

        const current_savings_balance = await User.update(
          { savingsWallet: savings_wallet_obj },
          {
            where: {
              id: user_id
            },
          }
        );

        const user_new_balance = user_accountBalance - amount;

        const updating_user_balance = await User.update(
          { accountBalance: user_new_balance },
          {
            where: {
              id: user_id
            },
          }
        );

        if (current_savings_balance && updating_user_balance) {

          let sender_accNumber = user_info.accountNumber
          let sender_notification:any = user_info.notification
          let sender_firstName = user_info.firstName
          let sender_lastName = user_info.lastName

          const timestamp = new Date().getTime()
          const date = new Date(timestamp)
          const year = date.getFullYear()
          const month = date.getMonth()+1
          const transfer_date = date.getDate()

          const hours = date.getHours().toString().padStart(2, "0")
          const minutes = date.getMinutes().toString().padStart(2, "0")
          const seconds = date.getSeconds().toString().padStart(2, "0")


          let debit_transfer_alert = {
            Txn: "DEBIT",
            Ac: `${sender_accNumber[0]}XX..${sender_accNumber[sender_accNumber.length-3]}${sender_accNumber[sender_accNumber.length-2]}X`,
            Amt: `NGN${amount}`,
            Des: `${sender_firstName} ${sender_lastName}/SAVINGS WALLET P_`,
            Date: `${year}-${month}-${transfer_date} ${hours}:${minutes}:${seconds}`,
            Bal: `NGN${user_new_balance}`
          }
          sender_notification.push(debit_transfer_alert)

          const sender_Transaction_Status = await User.update(
            { notification: sender_notification },
            {
              where: {
                accountNumber: sender_accNumber,
              },
            }
          );

          return res.status(200).json({
            message: `NGN${amount} Transferred to Savings Wallet`
          });
        } else {
          return res.status(400).json({
            message: "Transfer PENDING!! Please wait a few minutes or contact customer service. "
          });
        }

      } else {
        return res.status(400).json({
          message: "You do not have sufficient balance to execute this savings transfer"
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};


export const transferToInvestmentCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    if (decodedToken.email) {
      const user_id = decodedToken.id
      const {amount, company_account_number} = req.body

      const user_details:any = await User.findOne({where: {id:user_id}})
      const user_account_balance = user_details.accountBalance
      const user_account_number = user_details.accountNumber
      const user_firstName = user_details.firstName
      const user_lastName = user_details.lastName

      const company_details:any = await Company.findOne({where: { accountNumber: company_account_number }})
      if(company_details.accountNumber){

        const company_id = company_details.id
        const company_account_balance = company_details.wallet
        const comapany_wallet_balance = amount + company_account_balance
        const min_investment_amount = company_details.min_investment_amount
        const max_investment_amount = company_details.max_investment_amount

      if( user_account_balance > amount){
        if( amount < min_investment_amount ){
          return res.status(400).json({
            message: `You cannot invest below the minimum investment amount.`
          })
        }

        if(amount > max_investment_amount){
          return res.status(400).json({
            message: `You cannot invest above the maximum investment amount.`
          })        
        }

        //User can only invest once in a company.
        const existing_investor_for_that_company =  await investment_Records.findAll({
          where: {
            [Op.and]: [
               { investor_id: user_id  },
                  { investment_company_id: company_id }
             ]
           }
         });
            
         if(existing_investor_for_that_company.length > 0){
           return res.status(200).json({
             message: `SORRY!! You can only invest once in this company. Please try looking at other suitable investment plans from other companies on Plutus investment portal. Thank you for considering plutus as your investment option.`
           })
         }

        const user_new_balance = user_account_balance - amount
        const investment_Transfer = await User.update(
          { accountBalance: user_new_balance },
          {
            where: {
              accountNumber: user_account_number,
            },
          }
        );

          const successful_Transfer = await Company.update(
            { wallet: comapany_wallet_balance },
            {
              where: {
                accountNumber: company_account_number,
              },
            }
          );
          
          const company_dets: any = await Company.findOne({
            where: { accountNumber: company_account_number },
          });
  
          const current_wallet_balance = company_dets.wallet
          const expected_company_balance = comapany_wallet_balance
  
          if( current_wallet_balance !== expected_company_balance ){

            const update_company_balance = await Company.update(
              { wallet: company_account_balance },
              {
                where: {
                  accountNumber: company_account_number,
                },
              }
            );

            const update_user_balance = await User.update(
              { accountBalance: user_account_balance },
              {
                where: {
                  accountNumber: user_account_number,
                },
              }
            );

            if(update_company_balance && update_user_balance){
              const pending_transaction_record = await investment_Records.create({
                id: v4(),
                amount: amount,
                investor_name: user_firstName + " " + user_lastName,
                investor_id: user_id,
                investment_company_id: company_id,
                transaction_status: "PENDING"
              })
              return res.status(400).json({
                message: `Transfer PENDING.`,
                data: pending_transaction_record 
              })
            }else{
              return res.status(400).json({
                message: `Please wait and try for a few minutes before trying again or contact Customer Service.`
              })
            }
          }else{

            if( investment_Transfer && successful_Transfer){
              const sucessful_transaction_record = await investment_Records.create({
                id: v4(),
                amount: amount,
                investor_name: user_firstName + " " + user_lastName,
                investor_id: user_id,
                investment_company_id: company_id,
                transaction_status: "SUCCESSFUL",
              })

              const investment_duration = company_dets.duration
              let actual_investment_duration = 0
              if(investment_duration.split(" ")[1] === "months" || investment_duration.split(" ")[1] === "month"){
                actual_investment_duration += +investment_duration.split("")[0]
              }else if(investment_duration.split(" ")[1] === "year" || investment_duration.split(" ")[1] === "years"){
                actual_investment_duration += (+investment_duration.split("")[0] * 12)
              }
              
              const company_roi = company_dets.roi
              const expected_return_amount:any = (amount * company_roi).toFixed(2)
              const expected_monthly_return:any = (expected_return_amount/actual_investment_duration).toFixed(2)

             await Investor.create({
                id:v4(),
                firstName:user_details.firstName,
                lastName:user_details.lastName,
                accountNumber:user_details.accountNumber,
                email:user_details.email,
                investedCapital:amount,
                expectedReturn:expected_return_amount,
                monthlyReturn:expected_monthly_return,
                returnOnInvestment: company_roi,
                active: true,
                companyId:company_id,
                companyName: company_dets.companyName
              })

                const investor_count = company_dets.noOfInvestors + 1
                     await Company.update(
                  { noOfInvestors: investor_count },
                  {
                    where: {
                      accountNumber: company_account_number,
                    },
                  }
                );

                let sender_notification:any = user_details.notification

                const timestamp = new Date().getTime()
                const date = new Date(timestamp)
                const year = date.getFullYear()
                const month = date.getMonth()+1
                const transfer_date = date.getDate()

                const hours = date.getHours().toString().padStart(2, "0")
                const minutes = date.getMinutes().toString().padStart(2, "0")
                const seconds = date.getSeconds().toString().padStart(2, "0")

                const company_Name = company_details.companyName

                let debit_transfer_alert = {
                  Txn: "DEBIT",
                  Ac: `${user_account_number[0]}XX..${user_account_number[user_account_number.length-3]}${user_account_number[user_account_number.length-2]}X`,
                  Amt: `NGN${amount}`,
                  Des: `${company_Name}/Transfer P APP_`,
                  Date: `${year}-${month}-${transfer_date} ${hours}:${minutes}:${seconds}`,
                  Bal: `NGN${user_new_balance}`
                }
                sender_notification.push(debit_transfer_alert)

                const sender_Transaction_Status = await User.update(
                  { notification: sender_notification },
                  {
                    where: {
                      accountNumber: user_account_number,
                    },
                  }
                );

              return res.status(200).json({
                message: `Transfer SUCCESSFUL!!`,
                data: sucessful_transaction_record
              })
            }else{
              const failed_transaction_record = await investment_Records.create({
                id: v4(),
                amount: amount,
                investor_name: user_firstName + " " + user_lastName,
                investor_id: user_id,
                investment_company_id: company_id,
                transaction_status: "FAILED"
              })
              return res.status(400).json({
                message: `Transfer FAILED.`,
                data: failed_transaction_record
              })        
            }
          }
        }else{
          return res.status(400).json({
            message: `Company does not exist. Please check if account number is correct`
          })
        }
      }else{
        return res.status(400).json({
          message: `Sorry! You do not have sufficient funds to make this investment. Please credit your account`
        })
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

