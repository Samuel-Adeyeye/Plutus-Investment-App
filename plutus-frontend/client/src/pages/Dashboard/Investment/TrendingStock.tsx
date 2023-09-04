/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvestmentsByUser } from "../../../redux/action";

const TrendingStock: React.FC = () => {
  const dispatch = useDispatch() as any;
  const investment = useSelector((state: any) => state.userInvestment);

  useEffect(() => {
    dispatch(getInvestmentsByUser());
  }, []);

  const userInvestments = investment.data;
  console.log("user", userInvestments);

  return (
    <div className="bg-black p-4 rounded-md">
      <table className="w-full">
        <thead>
          <tr className="text-white text-justify ">
            <th className="p-2">Company</th>
            <th className="p-2">Rate of return</th>
          </tr>
        </thead>
        <tbody>
          {userInvestments?.map((investment: any) => (
            <tr key={investment.companyName}>
              <td className="p-2 text-white">{investment.companyName}</td>
              <td
                className={`p-2 ${
                  investment.rateOfReturn > 0
                    ? "text-green-500"
                    : investment.rateOfReturn < 0
                    ? "text-red-500"
                    : "text-white"
                }`}
              >
                {investment.rateOfReturn}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrendingStock;
