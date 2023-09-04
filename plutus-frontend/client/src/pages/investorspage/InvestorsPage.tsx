import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInvestors } from "../../redux/action";

interface RootState {
  investor: RowData[];
}

interface RowData {
  firstName: string;
  lastName: string;
  accountNumber: string;
  email: string;
  investedCapital: string;
  expectedReturn: string;
  createdAt: string;
}

const InvestorsPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch() as unknown as any;
  const investors = useSelector((state: RootState) => state.investor.data);

  // useEffect(() => {
  //   dispatch<GetInvestorsAction>(getInvestors());
  // }, []);

  useEffect(() => {
    dispatch(getInvestors());
  }, [dispatch]);

  return (
    <div className="">
      <h1 className="mt-8 text-center mb-8 font-bold text-2xl">
        Investors Table
      </h1>
      <table className="text-center py-3 px-4 table-auto w-full overflow-x-scroll leading-10 border ">
        <thead className="border-blue-500">
          <tr className="bg-[#4770FF] text-white border border-collapse border-b font-medium dark:border-neutral-500 ">
            <th className="w-auto h-auto border  text-xl">First Name</th>
            <th className="w-auto h-auto  border  sm:leading-[5rem]  text-xl ">
              Last Name
            </th>
            <th className="w-auto h-auto  border  sm:leading-[5rem] text-xl">
              Account Number
            </th>
            <th className="w-auto h-auto  border  sm:leading-[5rem] text-xl">
              Email
            </th>
            <th className="w-auto h-auto  border  sm:leading-[5rem] text-xl">
              Invested Capital
            </th>
            <th className="w-auto h-auto  border  sm:leading-[5rem] text-xl">
              Expected Return
            </th>
            <th className="w-auto h-auto  border  sm:leading-[5rem] text-xl">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {investors?.map((investor) => (
            <tr
              key={investor?.id}
              className="bg-[#EBF3F9] odd:bg-white even:bg-[#B5DCF2]">
              <td className="w-auto border leading-[4rem] ">
                {investor?.firstName}
              </td>
              <td className="w-auto border leading-[4rem]">
                {investor?.lastName}
              </td>
              <td className="w-auto border leading-[4rem]">
                {investor?.accountNumber}
              </td>
              <td className="w-auto border leading-[4rem]">
                {investor?.email}
              </td>
              <td className="w-auto border leading-[4rem]">
                {investor?.investedCapital}
              </td>
              <td className="w-auto border leading-[4rem]">
                {investor?.expectedReturn}
              </td>
              <td className="w-auto border leading-[4rem]">
                {investor?.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestorsPage;
