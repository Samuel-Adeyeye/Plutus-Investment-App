import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import otpGenerator from "otp-generator";
import { OTP_LENGTH, OTP_CONFIG } from "./notifications";
import dotenv  from "dotenv";
import User, { IUSER } from "../model/user";
dotenv.config()


export const hashedPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};


export const genAccount = () => {
  const prefix = '015';
    const num = Math.floor(10000000 + Math.random() * 9000);
  const account = `${prefix + num}`
  return account;
}
export const companyAccount = () => {
  const prefix = '301';
    const num = Math.floor(10000000 + Math.random() * 900000);
  const account = `${prefix + num}`
  return account;
}
 
export const generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
}

export const tokenGenerator = (data:any)=>{
  const token = jwt.sign(data, process.env.APP_SECRET!, {expiresIn: '1d'})
  return token
}

export const verifyToken = (token:any)=>{
   const decoded = jwt.verify(token, process.env.APP_SECRET!)
   return decoded
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) =>{
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token)
    if (!token || token === undefined) {
      throw new Error('No token provided');
    }
  const decodedToken = jwt.verify(token, process.env.APP_SECRET!) as JwtPayload;

  const user = await User.findOne({where : {id:decodedToken.id}}) as unknown as IUSER


  if(user.role !== 'admin'){
      return res.status(400).json({
        message: `You are not an admin user`
      })
  }else{
      next();
  }
};


