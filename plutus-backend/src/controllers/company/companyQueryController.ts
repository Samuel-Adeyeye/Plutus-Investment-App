import express, { Request, Response, NextFunction } from "express";
import Company, { ICOMPANY } from "../../model/company";
import dotenv from "dotenv";
import { getPagination } from "../../utils/pagination";
import Investor from "../../model/investor";
import jwt from "jsonwebtoken";
import User from "../../model/user";

dotenv.config();

export const getAllCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const user_id = decodedToken.id;

    const get_user_dets: any = await User.findOne({ where: { id: user_id } });
    const user_role = get_user_dets.role;

    if (user_role === "admin") {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;

      const { offset, limit: paginationLimit } = getPagination({ page, limit });

      const companies = await Company.findAndCountAll({
        offset,
        limit: paginationLimit,
      });

      return res.json({
        totalCompanies: companies.count,
        totalPages: Math.ceil(companies.count / limit),
        currentPage: page,
        data: companies.rows,
      });

    }else{
      return res.status(400).json({
        message: "You are not an ADMIN user.",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getInvestor = async (req: Request, res: Response) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const companyId = decodedToken.id;

    const investor = await Investor.findAll({ where: { id: companyId } });
    if (investor) {
      return res.status(200).json({
        message: "Fetching Investor Successfully",
        data: investor,
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


export const getCompanyInfo = async(req:Request, res:Response) => {
  try{
      const token:any = req.headers.authorization
          const payload = token.split(" ")[1]
          const company_details:any = jwt.verify(payload, process.env.APP_SECRET!)
      
          if(company_details.id){
              const id = company_details.id
              const company_info:any = await Company.findOne({ where: { id:id}})
      
           
              return res.status(200).json({
                  company:company_info
              })
          }else{
              res.status(400).json({
                  message: "Please LOGIN to get your information"
              })
          }
  }catch(error){
      console.error(error)
      res.status(500).json({
          message: "Internal Server Error"
      })      
  }
}









