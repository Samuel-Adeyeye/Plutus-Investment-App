/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
  formDataPatch,
} from "../utils/axios";
import {
  fetchDataCompany,
  fetchDataFailure,
  fetchDataStart,
  fetchDataUser,
  fetchDataBeneficiary,
  fetchDataInvestment,
  fetchDataUserInvestment,
  fetchInvestors,
} from "./reducers";
import { formDataPut } from "../utils/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginData {
  email: string;
  password: string;
}

interface signUpData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface changePasswordData {
  oldPassword: string;
  newPassword: string;
  confirm_password: string;
}

export const loginUser = createAsyncThunk(
  "loginUser",
  async (formData: LoginData, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));

      //axios call
      const response = await apiPost("/user/login", formData);
      console.log("***", response.data);

      //response check
      localStorage.setItem('token', response.data.user_token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('verify', response.data.verify);
      localStorage.setItem('firstName', response.data.firstName);
      localStorage.setItem('lastName', response.data.lastName);
      localStorage.setItem('companyName', response.data.companyName);

      console.log("res", response.data)

      
      toast.success("Login successful");
   
      //redirect
      if(response.data.role == "admin"){
          setTimeout(() => {
               window.location.href = "/dashboard/admin";
             }, 2000);
      }else if(response.data.role == "user"){
          setTimeout(() => {
               window.location.href = "/dashboard";
             }, 2000);
      }else{
          setTimeout(() => {
               window.location.href = "/dashboard/companyHome";
             }, 2000);
     }
      
    } catch (error: any) {
      //error check
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (formData: signUpData, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiPost("/user/signup", formData);
      toast.success("user created");
      console.log("resp", response);
      localStorage.setItem("token", response.data.user_token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("id", response.data.id);
      dispatch(fetchDataUser(response.data));
      setTimeout(() => {
        window.location.href = "/verify";
      }, 1000);
    } catch (error: any) {
      dispatch(fetchDataFailure(error.response.data.message));
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred";
      toast.error(errorMessage);
    }
  }
);

/**============== Transfer Money =======  **/

export const transferFunds = createAsyncThunk(
  "transferFunds",
  async (formData: any, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiPost("/transfer/transactions", formData);
      console.log("resp", response);
      toast.success("transfer successful");

      //redirect
      setTimeout(() => {
        window.location.href = "/dashboard/transfer";
      }, 2000);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

export const roiTransfer = createAsyncThunk (
  "roiTransfer", 
  async(accountNumber:any, {dispatch}:any) => {
    try{
     
      dispatch(fetchDataStart(true));
      const response = await apiPost("/transfer/roitransfer", {accountNumber});
      console.log("roi", response)
      toast.success("TRANSFER SUCCESSFUL")

      setTimeout(() => {
        window.location.href = "/dashboard/roitransfer";
      }, 2000);
    }catch(error:any){
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
})

/**============== Transfer Money to Savings Wallet=======  **/
export const savingswallet = createAsyncThunk(
  "saveImages",
  async (formData: any, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiPut(`/transfer/savings`, formData);
      toast.success(response.data.message);

      //redirect
      setTimeout(() => {
        window.location.href = "/dashboard/transfer/savings";
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

/**============== Transfer Money to Investment Company =======  **/

export const transferInvestment = createAsyncThunk(
  "transferInvestment",
  async (formData: any, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiPost("/transfer/investment", formData);
      console.log("resp", response);
      toast.success("transfer successful");

      //redirect
      setTimeout(() => {
        window.location.href = "/dashboard/transfer/investment";
      }, 2000);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

/**============== Get User Info =======  **/

export const getInfo = createAsyncThunk(
  "getInfo",
  async (_, { dispatch }: any) => {
    try {
      //set loader true
      dispatch(fetchDataStart(true));

      //axios call
      const response = await apiGet("/user/info");
      console.log(response.data);

      dispatch(fetchDataUser(response.data.data));
    } catch (error: any) {
      console.log(error);
    }
  }
);

/**============== Get Beneficiary Info =======  **/

export const getBeneficiary = createAsyncThunk(
  "getInfo",
  async (_, { dispatch }: any) => {
    try {
      //set loader true
      dispatch(fetchDataStart(true));

      //axios call
      const response = await apiGet("/beneficiary/get");
      console.log(response.data);

      dispatch(fetchDataBeneficiary(response.data));
    } catch (error: any) {
      console.log(error);
    }
  }
);

/**============== Get Company Info =======  **/

export const getCompanyInfo = createAsyncThunk(
  "getCompanyInfo",
  async (_, { dispatch }: any) => {
    try {
      //set loader true
      dispatch(fetchDataStart(true));

      //axios call
      const response = await apiGet("/company/getCompanyInfo");

      dispatch(fetchDataCompany(response.data.company));
    } catch (error: any) {
      console.log(error);
    }
  }
);

/**============== Get All Companys =======  **/

export const getAllCompanys = createAsyncThunk(
  "getAllCompanys",
  async (_, { dispatch }: any) => {
    try {
      //set loader true
      dispatch(fetchDataStart(true));

      //axios call
      const response = await apiGet('/company/allCompanyInfo');

      dispatch(fetchDataCompany(response.data.data));
    } catch (error: any) {
      console.log(error);
    }
  });


/**============== Create Beneficiary  =======  **/

export const createBeneficiary = createAsyncThunk(
  "createBeneficiary",
  async (formData: any, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiPost("/beneficiary/create", formData);
      console.log("resp", response);
      toast.success("Beneficiary created successfully");

      //redirect
      setTimeout(() => {
        window.location.href = "/dashboard/transfer/addbeneficiary";
      }, 2000);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

/**============== Update Company Info=======  **/
export const updateCompany = createAsyncThunk(
  "updateCompany",
  async (formData: any, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiPatch(`/company/updateProfile`, formData);
      toast.success(response.data.message);

      //redirect
      // setTimeout(() => {
      //   window.location.href = "/dashboard/transfer/savings";
      // }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

export const verifyUser = createAsyncThunk(
  "verifyUser",
  async (otp: string, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiPatch(`/user/verify-user`, { otp });
      console.log(response);
      toast.success("user verified");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
      window.location.href = "/verify";
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (token: string, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiGet(`/user/changePassword/${token}`);
      toast.success(response.data.message);
      // setTimeout(() => {
      //   window.location.href = "/confirm";
      // }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

/**==============Upload Photos=======  **/
export const uploadPhotos = createAsyncThunk(
  "uploadPhotos",
  async (formData: any, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await formDataPatch(
        `/photographer/upload-photos`,
        formData
      );
      toast.success(response.data.message);
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

/**==============Save Photos======= **/
export const saveImages = createAsyncThunk(
  "saveImages",
  async (formData: any, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiPut(`/user/save-image`, formData);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

/**==============Delete Photos======= **/
export const deletePhotos = createAsyncThunk(
  "deletePhotos",
  async ({ eventId, url }: any, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiDelete(
        `/photographer/delete-photos?eventId=${eventId}&url=${url}`
      );
      toast.success(response.data.message);
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

export const getCompanies = createAsyncThunk(
  "getCompanies",
  async (_, { dispatch }: any) => {
    try {
      //set loader true
      dispatch(fetchDataStart(true));

      //axios call
      const response = await apiGet("/company/get-companies");
      console.log(response.data.company);

      dispatch(fetchDataCompany(response.data.data));
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const getCompaniesByUser = createAsyncThunk(
  "getCompanies",
  async (_, { dispatch }: any) => {
    try {
      //set loader true
      dispatch(fetchDataStart(true));

      //axios call
      const response = await apiGet("/company/get-companies");
      console.log(response.data.company);

      dispatch(fetchDataCompany(response.data.company));
    } catch (error: any) {
      console.log(error);
    }
  }
);

/**============== Get Investor Info =======  **/

export const getInvestment = createAsyncThunk(
  "getInvestment",
  async (_, { dispatch }: any) => {
    try {
      //set loader true
      dispatch(fetchDataStart(true));

      //axios call
      const response = await apiGet("/investor/getinvestment");
      console.log(response.data);

      dispatch(fetchDataInvestment(response.data));
    } catch (error: any) {
      console.log(error);
    }
  }
);

/**==============For password change=======  **/

export const emailVerification = createAsyncThunk(
  "changePasswordEmailVerification",
  async (email: string, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiPut(`/user/change-password-email`, { email });
      console.log("response", response);
      if (response) {
        toast.success("OTP sent!!");
      }
    }
    catch (error: any) {
      // window.location.reload()
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

/**==============Delete Company======= **/
export const deleteCompany = createAsyncThunk(
  "deleteCompany",
  async (id: any, { dispatch }) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiDelete(`/company/delete/${id}`);
      toast.success(response.data.message);
      dispatch(fetchDataCompany(response.data));
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

export const otpVerification = createAsyncThunk(
  "changePasswordOtpVerification",
  async (otp: string, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const id = localStorage.getItem("id");

      //axios call
      const response = await apiPut(`/user/change-password-otp/${id}`, {otp});
      console.log(response.data);
      toast.success(response.data.message)

      dispatch(fetchDataCompany(response.data.data));
        if(response){
          setTimeout(() => { 
               window.location.href="/changePasswordConfirm"
          }, 2000);
        }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

//CREATE COMPANY

export const createCompany = createAsyncThunk(
  "createCompany",
  async (formData: any, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiPost("/company/create", formData);
      console.log("resp", response);

      //redirect
      setTimeout(() => {
        window.location.href = "/dashboard/companies";
      }, 1000);
      toast.success("Company created successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

/**==============For password change=======  **/

export const passwordChangeConfirmation = createAsyncThunk(
  "changePasswordConfirmation",
  async (formData: changePasswordData, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const id = localStorage.getItem("id");

      if (id) {
        const response = await apiPut(`/user/change-password/${id}`, formData);

        if (response) {
          toast.success("Verified");
          window.location.href = "/dashboard/accountsettings";
        }
        toast.error("Internal server error");
      } else {
        toast.error("Login and try again");
      }
    } catch (error: any) {
      // window.location.reload()
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

/**============== Get Trending Investments ===========  **/

export const getInvestmentsByUser = createAsyncThunk(
  "getInvestmentsByUser",
  async (_, { dispatch }: any) => {
    try {
      //set loader true
      dispatch(fetchDataStart(true));

      //axios call
      const response = await apiGet("/investor/getInvestmentsByUser");
      console.log(response.data);

      dispatch(fetchDataUserInvestment(response.data));
    } catch (error: any) {
      console.log(error);
    }
  }
);

export const accountSettings = createAsyncThunk(
  "accountSettings",
  async (formData: any, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await apiPatch(`/user/updateAccount`, formData);
      toast.success(response.data.message);
      localStorage.setItem('firstName', formData.firstName);
      localStorage.setItem('lastName', formData.lastName);
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.message));
    }
  }
);

/**============== IMAGE UPDATE=======  **/
export const updateLogo = createAsyncThunk(
  "updateLogo",
  async (fileData: any, { dispatch }: any) => {
    try {
      dispatch(fetchDataStart(true));
      const response = await formDataPut(`/user/profileImage`, fileData);
      localStorage.setItem("image", fileData);

      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  }
);

/********GET INVESTORS****************/

export const getInvestors = createAsyncThunk(
  "getInvestors",
  async (_, { dispatch }: any) => {
    try {
      //set loader true
      dispatch(fetchInvestors(true));

      //axios call
      const response = await apiGet("/investor/get");
      console.log(response.data);

      dispatch(fetchInvestors(response.data));
    } catch (error: any) {
      console.log(error);
    }
  }
);


//================= Get Notifications==================//
export const getUserNotifications = createAsyncThunk(
     "getUserNotifications",
     async (_, { dispatch }: any) => {
       try {

         dispatch(fetchDataStart(true));
         const response = await apiGet("/user/notifications");
         console.log(response.data);
   
         dispatch(fetchDataUserInvestment(response.data));
       } catch (error: any) {
         console.log(error);
       }
     }
   );
