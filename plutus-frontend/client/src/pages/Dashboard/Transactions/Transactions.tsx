/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import TransactionsList from "./TransactionsList";
// import { transaction } from "./TransactionsList";
// import SpendingYGraph from "./SpendingYGraph";
// import SpendingXGraph from "./SpendingXGraph"
import YBarChart from "./YBarChart"
import CheckingAccount from "./CheckingAccount";
import MasterCard from "./MasterCard";
import { apiGet } from '../../../utils/axios';
// import axios from 'axios';
import "./style.css"
import XBarChart from "./XBarChart";
import { AxiosResponse } from 'axios';
// import { transactions } from '../Routes';

// interface Props {
//   userTransactions: transaction[];
//   userDetails: any;
// }

export default function Transactions() {
  const [userTransactions, setUserTransactions] = useState<AxiosResponse>();
  const [userDetails, setUserDetails]= useState<AxiosResponse>()

  //  const tstn = await apiGet('/getAllTransactions')
  //  setTransactions(tstn);

 
  useEffect(()=>{
    async function getTransactions (){
      const {data} =  await apiGet('/transactions/getAllTransactions')
      setUserTransactions(data.transactions);
    }

    getTransactions();

    async function getUserDetails (){
      const {data} = await apiGet('/transactions/getUserDetails')
      setUserDetails(data.user_Details);
    }

    getUserDetails();

  },[])


  return (
    <div className="pr-[7%] lg:pr-[2%]">
    <h6 className="bg-slate-900 ml-0 mb-5 mt-5 p-2  w-fit text-white">Checking Account</h6>
    <div className='flex flex-col lg:flex-row justify-between'>
      <div className="ml-0 h-full">
        <div className='flex  flex-col lg:flex-row justify-between h-3/5'>
          <CheckingAccount userDetails={userDetails} userTransactions={userTransactions}/>
          <MasterCard userDetails={userDetails}/>
        </div >
        <h1 className="pt-10">Spending Overview</h1>
        <div className="sm:max-lg:w-screen flex flex-col pt-10" >
        <div className="chart-blue sm:max-lg:w-screen">
          <YBarChart userTransactions={userTransactions} userDetails={userDetails}></YBarChart>
        </div>
        <div className="sm:max-lg:w-screen chart-purple mt-10 mb-5">
          <XBarChart userTransactions={userTransactions} userDetails={userDetails}></XBarChart>
        </div>
        </div>
      </div>
    <div className="lg:w-2/5 pl-5  ml-[14%] lg:ml-[0%] lg:mr-[0%]">
    <TransactionsList userTransactions={userTransactions} userDetails={userDetails}/>
    </div>
    </div>
    </div>
  );
}
