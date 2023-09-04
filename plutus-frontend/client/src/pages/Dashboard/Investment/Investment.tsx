/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
("use client");

import { TbCurrencyNaira } from "react-icons/tb";
import { FaCoins } from "react-icons/fa";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import TableWithIcons from "./TableWithIcons";
import TrendingStock from "./TrendingStock";
import { getInvestment } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const Investment = () => {
  const dispatch = useDispatch() as unknown as any;
  const investors = useSelector((state: any) => state.investment);
  console.log(investors.totalInvestedCapital);
  console.log(investors.totalInvestments);
  console.log(investors.data);

  useEffect(() => {
    dispatch(getInvestment());
  }, []);

  const ror = "+4.75%";

  const Idata = [
    { name: "2017", value: 3.0 },
    { name: "2018", value: 2.3 },
    { name: "2019", value: 1.9 },
    { name: "2020", value: 3.5 },
    { name: "2021", value: 3.5 },
    { name: "2022", value: 3.1 },
  ];

  const renderInvBarChart = (
    <BarChart width={550} height={230} data={Idata}>
      <XAxis dataKey="name" stroke="#8884d8" angle={-45} textAnchor="end" />
      <YAxis />
      <Tooltip />
      {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 " /> */}
      <Bar dataKey="value" fill="#b5dcf2" barSize={23} />
    </BarChart>
  );

  const Irevenue = [
    { name: "2017", value: 0.8 },
    { name: "2018", value: 1.25 },
    { name: "2019", value: 1.9 },
    { name: "2020", value: 3.7 },
    { name: "2021", value: 3.1 },
    { name: "2022", value: 3.8 },
  ];

  const renderRevBarChart = (
    <BarChart width={550} height={230} data={Irevenue}>
      <XAxis dataKey="name" stroke="#8884d8" angle={-45} textAnchor="end" />
      <YAxis />
      <Tooltip />
      {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
      <Bar dataKey="value" fill="#c6b5f2" barSize={23} />
    </BarChart>
  );

  return (
    <div className=" lg:pl-[40px] md:pl-[55px] w-[auto] sm:w-[auto] md:w-[auto] h-auto px-[5%] md:px-[0%] ml-[15%] md:ml-[0%]">
      <div>
        <h3 className="pl-[5%] text-[23px] mb-[20px] ">Investment</h3>
        <div className=" px-[5%] flex flex-col justify-between my-[5%] md:my-[0%] md:flex-row  ">
          <div className="bg-[#f8f9fa] md:w-[30%] flex justify-center py-[3%] rounded-md">
            <TbCurrencyNaira className="bg-[#b5dcf2] w-[30px] h-[30px] rounded-[50%] flex items-center m-[10px]" />
            <div className="w-[auto]">
              <p className="text-[15px]">Total Invested</p>
              {investors.totalInvestedCapital
                ? investors.totalInvestedCapital
                : 0}
            </div>
          </div>

          <div className="bg-[#f8f9fa] md:w-[30%] flex justify-center py-[3%] rounded-md my-[5%] md:my-[0%]">
            <div className="bg-[#c6b5f2] w-[30px] h-[30px] rounded-[50%] flex items-center m-[10px] ">
              <FaCoins />
            </div>

            <div className="w-[auto]">
              <p className="text-[15px]">No. of investments</p>
              <p className="text-[15px]">
                {investors.totalInvestments ? investors.totalInvestments : 0}
              </p>
            </div>
          </div>
          <div className="bg-[#f8f9fa] md:w-[30%] flex justify-center py-[3%] rounded-md">
            <div className="bg-[#f5bfa6] w-[30px] h-[30px] rounded-[50%] flex items-center m-[10px] ">
              <GiAnticlockwiseRotation />
            </div>

            <div className="w-[auto]">
              <p className="text-[15px]">Rate of return</p>
              <p className="text-[15px]">{ror}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex-row  flex flex-col px-[5%] md:flex-col md:justify-around justify-between w-[100%] overflow-x-scroll">
        <div className="mt-[30px]">
          <p className="text-[23px] mb-[30px] ">Yearly total investment</p>
          <div className="w-[600px] h-[250px] bg-[#ebf3f9] my-[5%] md:my-[0%]">
            {renderInvBarChart}
          </div>
        </div>

        <div className="lg:ml-[60px] mt-[30px]">
          <p className="text-[23px] mb-[30px] ">Yearly total revenue</p>
          <div className="w-[600px]  h-[250px] bg-[#dfd8f2] my-[5%] md:my-[0%]">
            {renderRevBarChart}
          </div>
        </div>
      </div>

      <div className="flex mt-[30px] flex-col md:flex-col lg:flex-row justify-between px-[5%] mb-[60px] w-[100%]">
        <div className=" w-[auto] lg:w-[55%] mt-[20px] sm:w-[auto]">
          <p className="text-[23px] mb-[20px]">My investment</p>

          <TableWithIcons />
        </div>
        <div className="  w-[auto] lg:w-[40%] mt-[20px] sm:w-[auto]">
          <p className="text-[23px] mb-[20px] ">Trending stock</p>

          <TrendingStock />
        </div>
      </div>
    </div>
  );
};

export default Investment;
