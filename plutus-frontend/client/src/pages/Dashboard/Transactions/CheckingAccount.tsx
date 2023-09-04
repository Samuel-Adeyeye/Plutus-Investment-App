import { useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
    userDetails: any;
    userTransactions: any;
}
export default function CheckingAccount({userDetails, userTransactions}: Props) {
  const [income, setIncome] = useState<any>();
  const [expenses, setExpenses] = useState<any>();
  useEffect(()=>{
   
    let expenseAmount = 0;
    let incomeAmount = 0;
    userTransactions?.forEach((transaction: { accountNumber: any; amount: number; })=>{
      if(transaction.accountNumber !== userDetails.accountNumber){
        expenseAmount += transaction.amount
      }else {
        incomeAmount += transaction.amount;
      }

    })
    setIncome(incomeAmount);
    setExpenses(expenseAmount)
    console.log("aaaa", expenseAmount);
    
  }, [userTransactions, userDetails])
  return (
    
    <div className="text-left lg:w-[25rem] p-5 checkingaccount-black sm:max-lg:w-screen">
      <div className="flex p-2 justify-between">
      <h6 className="text-white">Checking Account</h6>
      <h6 className="text-blue-300 text-center">^2.36%</h6>
      </div>

      <div className="flex-col p-2">
        <h6 className="text-white text-xs pb-1">Balance</h6>
        <h2 className="text-blue-300">NGN <span className="pl-2">{userDetails?.accountBalance || 0}</span></h2>
        <h6 className="text-white text-xs pb-2">Available</h6>
        <h4 className="text-blue-300">NGN <span className="pl-2">{userDetails?.accountBalance || ''}</span></h4>
      </div>

      <div className="flex p-2 justify-between">
        <div>
        <h6 className="text-white text-xs">Income</h6>
        <h5 className="text-white">NGN {income || '0'}</h5>     
        </div>
        <div>
        <h6 className="text-white text-xs text-center">Expenses</h6>
        <h5 className="text-white text-center ">NGN {expenses || ''}</h5>     
        </div>
        
      </div>
    </div>
  )
}
