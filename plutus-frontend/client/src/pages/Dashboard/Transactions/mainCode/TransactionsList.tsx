/* eslint-disable @typescript-eslint/no-explicit-any */
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
  userTransactions: transaction[];
  userDetails: any;
}

export default function TransactionsList({ userTransactions, userDetails }: Props) {
  return (
    <div>
      <h1>Transactions</h1>
      <input type="text" placeholder="Search" />
      <ul className="list-group">
        <div className="d-flex p-2 justify-content-start">
          <h6 className="p-2">All</h6>
          <h6 className="p-2">Expenses</h6>
          <h6 className="p-2">Income</h6>
        </div>
        <div>
          {userTransactions.map((transaction) => (
            <li
              key={transaction.id}
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
              <div className="d-flex p-2 justify-content-between">
                <div>
                  <h4>{transaction.beneficiary_name}</h4>
                  {transaction.transfer_purpose}
                </div>
                <div>
                  <h4>{transaction.amount}</h4>
                  {userDetails.accountBalance}
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
