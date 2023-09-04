import express, { Request, Response, NextFunction } from "express";
import Beneficiary from "../../model/beneficiary";
import jwt from 'jsonwebtoken'


export const getBeneficiaries = async (req: Request, res: Response) => {
   try {

    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
    
    const id = decodedToken.id;

     const beneficiaries = await Beneficiary.findAll({ where: { userId: id } });
     res.status(200).json(beneficiaries);

   } catch (error) {
     console.error('Error fetching beneficiaries:', error);
     res.status(500).json({ error: 'Internal server error' });
   }
 };
 















