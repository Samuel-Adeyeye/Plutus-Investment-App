/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, useEffect, useState } from "react";
import { getAllCompanys } from '../../../redux/action'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

export interface Props {
  // userTransactions: any;
  // userDetails: any;
}

export default function CompanyList() {
 
  const dispatch = useDispatch() as unknown as any;

  const companys = useSelector((state: any) => state.company)

  

  const [companies, setCompanies] = useState<any>(null);


  useEffect(() => {
    dispatch(getAllCompanys())
 
  }, [])

  useEffect(() => {
    setCompanies(companys)
  }, [companys])

  
  return (
    <div className="px-[8%] lg:px-[0%]">
      <h1 className="text-2xl text-left p-2">Companies</h1>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 active:border-gray-700 "
        onChange={async (e) => {
          setCompanies(
            companys?.filter((company: { companyName: string ; }) => {
              if (e.target.value.length == 1) {
                const firstLetter =
                  company.companyName[0].toLowerCase();
                return firstLetter === e.target.value.toLowerCase();
              }
              return company.companyName
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            })
            // .sort((a,b)=> a.beneficiary_name.localeCompare(b.beneficiary_name))
          );
        }}
      />
      <ul className="list-none">
        <div className="flex justify-start">
          {/* <button
            className="hover:border-gray-100 border-transparent border-2 rounded-lg p-2"
            onClick={() => allClick()}
          >
            All
          </button> */}
          {/* <button
            className="hover:border-gray-100 border-transparent border-2 rounded-lg p-2"
            onClick={() => expensesClick()}
          >
            Expenses
          </button> */}
          {/* <button
            className="hover:border-gray-100 border-transparent border-2 rounded-lg p-2"
            onClick={() => incomeClick()}
          >
            Income
          </button> */}
        </div>
        <div>
          {companies?.map((company: {
            accountNumber: any; roi: number; id: Key | null | undefined; companyName: string; businessType: string;  
}) => (
            <li
              key={company.id}
              className="hover:border-gray-100 border-transparent border-2 rounded-lg"
            >
              <div className="flex p-2 justify-between">
                <div className="flex">
           
                  <div className="text-left">
                   <Link to="/dashboard/transfer/investment"> <h4 className="pb-1.5">{company.companyName}</h4></Link>
                    <p className="text-xs text-slate-400">
                      {company.businessType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                <Link to="/dashboard/transfer/investment"> <h4
                    // className={
                    //   transaction.accountNumber === userDetails.accountNumber
                    //     ? "text-green-600 pb-1.5"
                    //     : "text-red-600 pb-1.5"
                    // }
                  >
                    {company.accountNumber}
                  </h4></Link>
                  <p className="text-xs text-slate-400">{company.roi}</p>
                </div>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
