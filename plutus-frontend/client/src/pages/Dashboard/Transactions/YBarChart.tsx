/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
// import { transaction } from "./TransactionsList";
import "./style.css"


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  userTransactions: any;
  userDetails: any;
}

export default function YGraph({ userTransactions, userDetails }: Props) {

  const [expenses, setExpenses] = useState<any>();
  useEffect(()=>{
    setExpenses(userTransactions?.filter((transaction: { senderId: string; })=>{
    return transaction.senderId === userDetails.id 
  }))

    
  }, [userTransactions, userDetails])

  const expensesCountObj: Record<string, number> = {};
  const expensesCountKeyArr: string[] = [];
  const expensesCountValueArr: number[] = [];



  // const expenses: transaction[] = userTransactions?.filter(
  //   (transaction: { amount: number; }) => transaction.amount < 0
  // );

  expenses?.forEach((expense: { transfer_purpose: string | number; }) => {
    if (!expensesCountObj[expense.transfer_purpose]) {
      expensesCountObj[expense.transfer_purpose] = 0;
    }
    expensesCountObj[expense.transfer_purpose]++;
  });

  for (const key in expensesCountObj) {
    expensesCountKeyArr.push(key);
    expensesCountValueArr.push(expensesCountObj[key]);
  }



  const data = {
    labels: expensesCountKeyArr,
    datasets: [
      {
        label: "frequency",
        data: expensesCountValueArr,
        backgroundColor: "#b5dcf2",
        borderColor: "black",
        borderWidth: 1,
        barThickness: 50,
        maxThickness: 50,
        barPercentage: 0.9,
        categoryPercentage: 1
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <Bar height="100%" className="pl-10 pr-40 " data={data} options={options}></Bar>
    </>
  );
}
