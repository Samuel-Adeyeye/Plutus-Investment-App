// import React from 'react'
import { Route, Routes } from "react-router-dom";
import Investment from "./Investment/Investment";
import DashboardHome from "./HomeDashBoard/DashboardHome";
import Transfer from "./Transfer/Transfer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Savings from "./Transfer/Savings";
import Invest from "./Transfer/investment";
import AddBeneficiary from "./Transfer/AddBeneficiary";
import AccountSettings from "./accountSettings/accountSetting";
import UsersAdmin from "../AdminPageUser/users";
import Transactions from "./Transactions/Transactions";
import CompanyDashboard from "../companydashboard/CompanyDashboard";
// import AllTransactions from "../AdminPageTransactions/AllTransactions"
import CompanyAccountSettings from "./accountSettings/CompanyAccountSettings"
import Roitransfer from "./Transfer/Roitransfer";


import AllTransactions from "./AdminPageTransactions/AllTransactions";
import CreateCompany from "./Company/CreateCompany";
import CompanyTable from "../companytable/CompanyTable";
import UpdateCompanyProfile from "./updateCompany/UpdateCompany";
import CompanyHome from "./companyHome/CompanyHome";
import InvestorsPage from "../investorspage/InvestorsPage";

export interface transaction {
  id: string;
  accountNumber: number;
  amount: number;
  transfer_purpose: string;
  beneficiary_name: string;
  beneficiary_email: string;
  payer_reference: string;
  information_for_beneficiary: string;
  status: string;
  senderId: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const transactions: transaction[] = [
  {
    id: "1",
    accountNumber: 2636326829,
    amount: -200,
    transfer_purpose: "food",
    beneficiary_name: "tolu stacks",
    beneficiary_email: "tolustacks@gmail.com",
    payer_reference: "suosodnjosbidwu",
    information_for_beneficiary: "subdbybybaybaybs",
    status: "sucessful",
    senderId: "string",
  },

  {
    id: "2",
    accountNumber: 2636326829,
    amount: -200,
    transfer_purpose: "food",
    beneficiary_name: "Victoria Helen",
    beneficiary_email: "tolustacks@gmail.com",
    payer_reference: "suosodnjosbidwu",
    information_for_beneficiary: "subdbybybaybaybs",
    status: "sucessful",
    senderId: "string",
  },

  {
    id: "3",
    accountNumber: 2636326829,
    amount: 200,
    transfer_purpose: "food",
    beneficiary_name: "Tony Bands",
    beneficiary_email: "tolustacks@gmail.com",
    payer_reference: "suosodnjosbidwu",
    information_for_beneficiary: "subdbybybaybaybs",
    status: "sucessful",
    senderId: "string",
  },

  {
    id: "4",
    accountNumber: 2636326829,
    amount: -50,
    transfer_purpose: "drinks",
    beneficiary_name: "Gig Briggs",
    beneficiary_email: "tolustacks@gmail.com",
    payer_reference: "suosodnjosbidwu",
    information_for_beneficiary: "subdbybybaybaybs",
    status: "sucessful",
    senderId: "string",
  },

  {
    id: "5",
    accountNumber: 2636326829,
    amount: -5000,
    transfer_purpose: "vacation",
    beneficiary_name: "Saturn Light",
    beneficiary_email: "tolustacks@gmail.com",
    payer_reference: "suosodnjosbidwu",
    information_for_beneficiary: "subdbybybaybaybs",
    status: "sucessful",
    senderId: "string",
  },

  {
    id: "6",
    accountNumber: 2636326829,
    amount: -2000,
    transfer_purpose: "vacation",
    beneficiary_name: "Gojo Satori",
    beneficiary_email: "tolustacks@gmail.com",
    payer_reference: "suosodnjosbidwu",
    information_for_beneficiary: "subdbybybaybaybs",
    status: "sucessful",
    senderId: "string",
  },

  {
    id: "7",
    accountNumber: 2636326829,
    amount: -200,
    transfer_purpose: "food",
    beneficiary_name: "Jide Uchiha",
    beneficiary_email: "tolustacks@gmail.com",
    payer_reference: "suosodnjosbidwu",
    information_for_beneficiary: "subdbybybaybaybs",
    status: "sucessful",
    senderId: "string",
  },

  {
    id: "8",
    accountNumber: 2636326829,
    amount: -200,
    transfer_purpose: "food",
    beneficiary_name: "Virgo Tune",
    beneficiary_email: "tolustacks@gmail.com",
    payer_reference: "suosodnjosbidwu",
    information_for_beneficiary: "subdbybybaybaybs",
    status: "sucessful",
    senderId: "string",
  },

  {
    id: "9",
    accountNumber: 2636326829,
    amount: -200,
    transfer_purpose: "entertainment",
    beneficiary_name: "tolu stacks",
    beneficiary_email: "tolustacks@gmail.com",
    payer_reference: "suosodnjosbidwu",
    information_for_beneficiary: "subdbybybaybaybs",
    status: "sucessful",
    senderId: "string",
  },

  {
    id: "10",
    accountNumber: 2636326829,
    amount: -200,
    transfer_purpose: "entertainment",
    beneficiary_name: "tolu stacks",
    beneficiary_email: "tolustacks@gmail.com",
    payer_reference: "suosodnjosbidwu",
    information_for_beneficiary: "subdbybybaybaybs",
    status: "sucessful",
    senderId: "string",
  },

  {
    id: "11",
    accountNumber: 2636326829,
    amount: 10200,
    transfer_purpose: "revenue",
    beneficiary_name: "tolu stacks",
    beneficiary_email: "tolustacks@gmail.com",
    payer_reference: "suosodnjosbidwu",
    information_for_beneficiary: "subdbybybaybaybs",
    status: "sucessful",
    senderId: "string",
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const userDetails = {
  fullName: "tolu bands",
  cardNumber: "4444 4444 4444 4444",
  accountBalance: 10000,
  cardexp: "2/28",
};

export const RoutesDashBoard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="lg:ml-[9%]">
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transfer/savings" element={<Savings />} />
          <Route path="/accountsettings" element={<AccountSettings />} />
          <Route path="/notifications" element={<AccountSettings />} />
          <Route path="/password-and-security" element={<AccountSettings />} />
          <Route path="/update-profile" element={<AccountSettings />} />
          <Route
            path="/transactions"
            element={
              <Transactions />
            }
          />
          <Route path="/allTransactions" element={<AllTransactions />} />
          <Route path="/admin" element={<UsersAdmin />} />
          <Route path="/transfer/investment" element={<Invest />} />
          <Route path="/transfer/addbeneficiary" element={<AddBeneficiary />} />
          <Route path="/companyDashboard" element={<CompanyDashboard />} />
          <Route path="/companyaccountsettings" element={<CompanyAccountSettings />} />
          <Route path="/companyupdate-profile" element={<CompanyAccountSettings />} />

          <Route path="/createCompany" element={<CreateCompany />} />
          <Route path="/companies" element={<CompanyTable />} />
          <Route path="/roitransfer" element={<Roitransfer />} />
          <Route path="/updateCompanyProfile" element={<UpdateCompanyProfile />} />
          <Route path="/companyHome" element={<CompanyHome />}/>
          <Route path="/investorTable" element={<InvestorsPage />}/>
        </Routes>
      </div>
    </div>
  );
};
