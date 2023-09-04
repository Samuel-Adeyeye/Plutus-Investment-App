import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../model/user";
import { transferableAbortSignal } from "util";
import Transfers from "../../model/transfer";
import { getPagination } from "../../utils/pagination";
import Investor, {INVESTOR} from "../../model/investor";

dotenv.config();

export const getUsersByAdmin = async (req: Request, res: Response) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const user_id = decodedToken.id;

    const user_details: any = await User.findOne({ where: { id: user_id } });

    const user_role = user_details.role;
    console.log(user_role);

    if (user_role === "admin") {
      const getAllUsers = await User.findAll();

      return res.status(200).json({
        message: `User Successfully gotten`,
        data: getAllUsers,
      });
    } else {
      return res.status(400).json({
        message: "You are not an admin user",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// const failed_transaction = await Transfers.findAll({ where: { status: trans_status})
export const trackSuccessfulTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const getting_user_role: any = await User.findOne({
      where: { id: decodedToken.id },
    });
    const user_role = getting_user_role.role;

    if (user_role === "admin") {
      const trans_status = "SUCCESSFUL";

      const successfulTransaction = await Transfers.findAll({
        where: { status: trans_status },
      });

      if (!successfulTransaction) {
        return res.status(404).json({
          message: `Failed to fetch Successful Transactions`,
        });
      } else {
        return res.status(200).json({
          message: `Successful Transactions`,
          data: successfulTransaction,
        });
      }
    } else {
      return res.status(400).json({
        message: `You are not an admin`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// export const trackFailedTransaction = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token: any = req.headers.authorization;
//     const token_info = token.split(" ")[1];
//     const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

//     const user_id = decodedToken.id;
//     const trans_statuss = "FAILED";

//     const failedTransaction = await Transfers.findAll({
//       where: { status: trans_statuss },
//     });
//     if (failedTransaction) {
//       return res.status(200).json({
//         message: `Failed Transactions`,
//         data: failedTransaction,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const trackFailedTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const getting_user_role: any = await User.findOne({
      where: { id: decodedToken.id },
    });
    const user_role = getting_user_role.role;

    if (user_role === "admin") {
      const trans_status = "FAILED";

      const failedTransaction = await Transfers.findAll({
        where: { status: trans_status },
      });

      if (!failedTransaction) {
        return res.status(404).json({
          message: `Failed to fetch Failed Transactions`,
        });
      } else {
        return res.status(200).json({
          message: `Failed Transactions`,
          data: failedTransaction,
        });
      }
    } else {
      return res.status(400).json({
        message: `You are not an admin`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let page = 1;
    if (req.query.page) {
      page = parseInt(req.query.page as string);
      if (Number.isNaN(page)) {
        return res.status(400).json({
          message: "Invalid page number",
        });
      }
    }

    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const getUsersAdmin = await User.findAll();
    const totalPages = Math.ceil(getUsersAdmin.length / pageSize);

    if (page > totalPages) {
      page = totalPages;
    }
    const allUsers = getUsersAdmin.slice(offset, page * pageSize);

    return res.status(200).json({
      allUsers,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error("Error executing getUsers:", err);
    return res.status(500).json({
      Error: "Internal Server Error",
    });
  }
};

export const getAllTransactions = async (
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
      if (user_Id) {
        const user_Details: any = await User.findOne({
          where: { id: user_Id },
        });

        const transfer_Details: any = await Transfers.findAll({
          where: { senderId: user_Id },
        });

        const userAccountNumber = user_Details.accountNumber;
        const senderId = user_Id;

        if (userAccountNumber && senderId) {
          const page = Number(req.query.page) || 1;
          const limit = Number(req.query.limit) || 10;

          const { offset, limit: paginationLimit } = getPagination({
            page,
            limit,
          });

          const getAllTransactions: any = await Transfers.findAndCountAll({
            where: { senderId: senderId },
            offset,
            limit: paginationLimit,
          });

          if (getAllTransactions) {
            return res.status(200).json({
              message: `User's transactions`,
              transactions: getAllTransactions.rows,
              totalCount: getAllTransactions.count,
              currentPage: page,
              totalPages: Math.ceil(getAllTransactions.count / limit),
            });
          }
        } else {
          return res.status(400).json({ message: "No such user present" });
        }
      } else {
        return res
          .status(400)
          .json({ message: "Login to get users transactions" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
};


