/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'
import TransactionsList from "./TransactionsList";
import { transaction } from "./TransactionsList";
import SpendingYGraph from "./SpendingYGraph";
import CheckingAccount from "./CheckingAccount";
import MasterCard from "./MasterCard";

interface Props {
  userTransactions: transaction[];
  userDetails: any;
}
export default function Transactions({ userTransactions, userDetails }: Props) {
  return (
    <div>
      <div>
        <div>
          <CheckingAccount userDetails={userDetails} />
          <MasterCard userDetails={userDetails} />
        </div>
        <SpendingYGraph userTransactions={userTransactions} />
      </div>
      <TransactionsList
        userTransactions={userTransactions}
        userDetails={userDetails}
      />
    </div>
  );
}
