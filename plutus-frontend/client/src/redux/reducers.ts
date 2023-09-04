/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { useDispatch  } from 'react-redux';

export interface State {
  user: any[];
  company: any[];
  transactions: any[];
  transfer: any[];
  investment: any[];
  userInvestment: any[];
  beneficiary: any[];
  loading: boolean;
  error: string | null;
  investor: any;
}

const initialState: State = {
  user: [],
  company: [],
  transactions: [],
  investment: [],
  userInvestment: [],
  transfer: [],
  beneficiary: [],
  loading: false,
  error: null,
  investor: [],
};

const dataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchDataStart: (state, _action: PayloadAction<boolean>) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataUser: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      console.log(action);
      state.user = action.payload;
    },
    fetchDataCompany: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      console.log(action);
      state.company = action.payload;
    },
    fetchDataCompanyByUser: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      console.log(action);
      state.company = action.payload;
    },
    fetchDataBeneficiary: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      console.log(action);
      state.beneficiary = action.payload;
    },
    fetchDataInvestment: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      console.log(action);
      state.investment = action.payload;
    },
    fetchDataUserInvestment: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      console.log(action);
      state.userInvestment = action.payload;
    },

    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchInvestors: (state, action: PayloadAction<any>) => {
      state.loading = false;
      console.log(action);
      state.investor = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataUser,
  fetchDataFailure,
  fetchDataCompany,
  fetchDataBeneficiary,
  fetchDataInvestment,
  fetchDataCompanyByUser,
  fetchDataUserInvestment,
  fetchInvestors,
} = dataSlice.actions;

export default dataSlice.reducer;
