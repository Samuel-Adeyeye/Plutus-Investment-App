import express, { Request, Response, NextFunction } from "express";
import Beneficiary from "../../model/beneficiary";
import User from "../../model/user";
import { v4 } from "uuid";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { createBeneficiary } from '../../utils/inputvalidation'

export const createBeneficiaries = async (
    req: Request,
    res: Response,
    NextFunction: NextFunction
  ) => {
  try {
    const schema = createBeneficiary
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

     const token: any = req.headers.authorization;
     const token_info = token.split(" ")[1];
     const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
 
     const user_id = decodedToken.id;
     const { beneficiaryName, accountNumber } = req.body;
  
      const user = await User.findOne({ where: { id: user_id } });
  
      if (!user) {
        return res.status(404).json({
          error: "No existng beneficiary. Please ADD BENEFICIARY.",
        });
      }
 
      const validating_beneficiary = await User.findOne({ where: { accountNumber:accountNumber } });
      const checking_existing_beneficiary = await Beneficiary.findOne({ where: { accountNumber }})
 
      if(validating_beneficiary){
       if(!checking_existing_beneficiary){
         res.status(400).json({
           message: "Beneficiary Already Exists"
         })
       }else{
         const newBeneficiary = await Beneficiary.create({
           id:v4(),
           userId: user_id,
           beneficiaryName,
           accountNumber
         });
         res.status(200).json({
           message: "Beneficiary created successfully",
           data: newBeneficiary
         });
       }
      }else{
       res.status(400).json({
         message: "Account Number doesn't Match"
       })
      }
    } catch (error) {
      console.error("Error creating beneficiary", error);
      res.status(500).json({
        error: "Internal server error, Error creating beneficiary",
      });
    }
  };
 
  export const deleteBeneficiary = async (req: Request, res: Response, NextFunction: NextFunction) =>{
       try{
         const token: any = req.headers.authorization;
         const token_info = token.split(" ")[1];
         const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
 
         const { accountNumber } = req.body
         if(decodedToken.id){
           const user_id = decodedToken.id
 
           const get_User_Beneficiaries = await Beneficiary.findAll({where: {userId: user_id}} )
           
           if(get_User_Beneficiaries.length !== 0){
             const delete_beneficiary = await Beneficiary.destroy({
               where: { accountNumber}
           })
 
           if(delete_beneficiary){
             return res.status(200).json({
               message: "Beneficiary has been successfully deleted."
             })
           }else{
             return res.status(200).json({
               message: "DELETE FAILED!! Account is not your beneficiary"
             })
           }
         }else{
           return res.status(400).json({
             message: "You do not have any beneficiary"
           })
         }
       }else{
         return res.status(400).json({
           message: "You must be LOGGED IN to delete any beneficiary"
         })
       }
 
       }catch(error){
          console.error('Error deleting Beneficiary', error);
          res.status(500).json({
             error: 'Internal server error'
          })
       }
  }
 