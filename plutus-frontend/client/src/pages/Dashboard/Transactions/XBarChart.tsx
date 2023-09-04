/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useEffect} from "react";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from "chart.js";
  
  import { Bar } from "react-chartjs-2";
  import { transaction } from "./TransactionsList";
  import "./style.css"
// import { userDetails } from '../Routes';
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  interface Props {
    userTransactions: any;
    userDetails: any;
  }
  
  export default function XGraph({ userTransactions, userDetails }: Props) {
    // const [userTransactions, setUserTransactions] = useState(transactions);
    const [expenses, setExpenses] = useState<any>();
    useEffect(()=>{
      setExpenses(userTransactions?.filter((transaction: { senderId: string; })=>
         transaction.senderId === userDetails.id 
    ))

      
    }, [userTransactions, userDetails])
    
    const expensesCountObj: Record<string, number> = {};
    const expensesCountKeyArr: string[] = [];
    const expensesCountValueArr: number[] = [];
    
    const toSort: [string, number][] = [];
  
    // const expenses: transaction[] = userTransactions?.filter(
    //   (transaction: { accountNumber: string; }) => userDetails.accountNumber == transaction.accountNumber
    // );
  
    expenses?.forEach((expense: { transfer_purpose: string | number; amount: number; }) => {
      if (!expensesCountObj[expense.transfer_purpose]) {
        expensesCountObj[expense.transfer_purpose] = 0;
      }
      expensesCountObj[expense.transfer_purpose] +=  expense.amount;
    });
  
    for (const key in expensesCountObj) {
      toSort.push([key, expensesCountObj[key]]);
    }

    toSort.sort((a,b)=> b[1]-a[1]);
  
    toSort.forEach(expense=> {
        expensesCountKeyArr.push(expense[0]) 
        expensesCountValueArr.push(expense[1])
    })

    const data = {
      labels: expensesCountKeyArr,
      datasets: [
        {
          label: "Amount",
          data: expensesCountValueArr,
          backgroundColor: "black",
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
        <Bar height="100%" className="pl-10 pr-40" data={data} options={options}></Bar>
      </>
    );
  }
  