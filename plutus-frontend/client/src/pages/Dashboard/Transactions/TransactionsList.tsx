/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState, useEffect } from "react";
import foodIcon from "./logos/foodIcon.svg";
import entertainmentIcon from "./logos/entertainment.svg";
import transferIcon from "./logos/QuickTransferIcon.svg";
import travelIcon from "./logos/travelIcon.svg";
import drinkIcon from "./logos/drinkIcon.svg"
// import { userDetails } from '../Routes';
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

export interface Props {
  userTransactions: any;
  userDetails: any;
}

export default function TransactionsList({ userTransactions, userDetails }: Props) {
  const [transactions, setTransactions] = useState(userTransactions);
  const expensesClick = () => {
    setTransactions(
      userTransactions?.filter(((transaction: { senderId: string; })=>
      transaction.senderId === userDetails.id)
    ));
  };
  const incomeClick = () => {
    setTransactions(
      userTransactions?.filter(((transaction: { accountNumber: string; })=>
      transaction.accountNumber === userDetails.accountNumber)
    ));
  };
  const allClick = () => {
    setTransactions(userTransactions);
  };

  useEffect(()=>{
    setTransactions(userTransactions);
  },[userTransactions])

  return (
    <>
      <h1 className="text-2xl text-left p-2">Transactions</h1>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 active:border-gray-700 "
        onChange={(e) => {
          setTransactions(
            userTransactions?.filter((transaction: { beneficiary_name: string ; }) => {
              if (e.target.value.length == 1) {
                const firstLetter =
                  transaction.beneficiary_name[0].toLowerCase();
                return firstLetter === e.target.value.toLowerCase();
              }
              return transaction.beneficiary_name
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            })
            // .sort((a,b)=> a.beneficiary_name.localeCompare(b.beneficiary_name))
          );
        }}
      />
      <ul className="list-none">
        <div className="flex justify-start">
          <button
            className="hover:border-gray-100 border-transparent border-2 rounded-lg p-2"
            onClick={() => allClick()}
          >
            All
          </button>
          <button
            className="hover:border-gray-100 border-transparent border-2 rounded-lg p-2"
            onClick={() => expensesClick()}
          >
            Expenses
          </button>
          <button
            className="hover:border-gray-100 border-transparent border-2 rounded-lg p-2"
            onClick={() => incomeClick()}
          >
            Income
          </button>
        </div>
        <div>
          {transactions?.map((transaction: {
            accountNumber: any; id: Key | null | undefined; transfer_purpose: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; beneficiary_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; amount: number  
}) => (
            <li
              key={transaction.id}
              className="hover:border-gray-100 border-transparent border-2 rounded-lg"
              // className={
              //   selectedIndex === index
              //     ? "list-group-item active"
              //     : "list-group-item"
              // }
              // onClick={() => {
              //   setSelectedIndex(index);
              //   onSelectItem(item);
              // }}
            >
              <div className="flex p-2 justify-between">
                <div className="flex">
                  {(transaction?.transfer_purpose == "food" && (
                    <img src={foodIcon} alt="" className="w-3/12 mr-2 rounded-full bg-purple-400" />
                  )) ||
                    (transaction?.transfer_purpose == "entertainment" && (
                      <img src={entertainmentIcon} alt="" className="w-3/12 mr-2" />
                    )) ||
                    (transaction?.transfer_purpose == "revenue" && (
                      <img src={transferIcon} alt="" className="w-3/12 mr-2 rounded-full bg-sky-200" />
                    )) ||
                    (transaction?.transfer_purpose == "vacation" && (
                      <img src={travelIcon} alt="" className="w-3/12 mr-2 rounded-full bg-cyan-100" />
                    )) || 
                    (transaction?.transfer_purpose == "drinks" && (
                      <img src={drinkIcon} alt="" className="w-3/12 mr-2 rounded-full bg-orange-200" />))
                    }
                  <div className="text-left">
                    <h4 className="pb-1.5">{transaction?.beneficiary_name}</h4>
                    <p className="text-xs text-slate-400">
                      {transaction?.transfer_purpose}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <h4
                    className={
                      transaction?.accountNumber === userDetails?.accountNumber
                        ? "text-green-600 pb-1.5"
                        : "text-red-600 pb-1.5"
                    }
                  >
                    {transaction?.amount}
                  </h4>
                  <p className="text-xs text-slate-400">{userDetails?.accountBalance}</p>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </>
  );
}
