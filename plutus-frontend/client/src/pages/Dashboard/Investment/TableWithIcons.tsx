/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { getInvestment } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const InvestmentTable: React.FC = () => {
  const dispatch = useDispatch() as unknown as any;
  const investors = useSelector((state: any) => state.investment);

  useEffect(() => {
    dispatch(getInvestment());
  }, []);
  const result = investors.data;
  console.log("daniel", investors);
  console.log("bina", result);

  return (
    <div>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-justify">
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Investment Value</th>
            <th className="px-4 py-2">Rate Of Return</th>
          </tr>
        </thead>
        <tbody>
          {result ? (
            result.length > 0 ? (
              result.map((item: any, index: number) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      {/* <img
              src={item.logoUrl}
              alt={`${item.company} Logo`}
              className="w-8 h-8 mr-2"
            /> */}
                      {item?.companyName}
                    </div>
                  </td>

                  <td className="px-4 py-2">
                    ${item?.investedCapital?.toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      item?.returnOnInvestment < 0
                        ? "text-red-500"
                        : item?.returnOnInvestment > 0
                        ? "text-green-500"
                        : "text-black"
                    }`}
                  >
                    {item?.returnOnInvestment?.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Company Found</td>
              </tr>
            )
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentTable;
