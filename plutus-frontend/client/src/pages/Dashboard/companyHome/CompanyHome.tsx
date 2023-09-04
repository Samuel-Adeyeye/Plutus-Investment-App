/* eslint-disable @typescript-eslint/no-explicit-any */
import ProgressBar from "./ProgressBar";
import {
  BsFillArrowUpCircleFill,
  BsFillCaretUpFill,
  BsCaretDownFill,
  BsFillBarChartFill,
} from "react-icons/bs";
import { FaGreaterThan, FaLessThan, FaPlane } from "react-icons/fa";
import "../../../App.css";
import Add from "../../../assets/Add new.svg";
import Karen from "../../../assets/Karen Potter.jpeg";
// import Leonard from "../../../assets/Leonard Smith.jpeg"
// import Maria from "../../../assets/Maria Purple.jpeg"
// import Oscar from "../../../assets/Oscar Wild.jpeg"
// import TransactionsHome from '../TransactionsHome';
import TransactionChart from "../TransactionChart";
// import TransactionsList from '../Transactions/TransactionsList';


// import TransactionsList from '../Transactions/mainCode/TransactionsList';
// import { transactions } from '../Routes';
import { getInfo } from "../../../redux/action";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBeneficiary } from "../../../redux/action";
// import { AxiosResponse } from 'axios';
// import { apiGet } from '../../../utils/axios';
// import { Colors } from 'chart.js';

const DashboardHome = () => {
  const dispatch = useDispatch() as unknown as any;

  const users = useSelector((state: any) => state.user);

  console.log(users.account_name);

  useEffect(() => {
    dispatch(getInfo());
  }, []);


  useEffect(() => {
    dispatch(getBeneficiary());
  }, []);

  return (
  
      <div className="flex lg:flex-row flex-col w-[100%] gap-20 h-full ml-[15%]  md:ml-[7%] lg:ml-[5%] lg:pr-[10%] mt-[3%] mb-[20%]">
        <div className="flex flex-col w-[100%]  px-[5%] md:p-5">
          <div className="flex md:flex-row flex-col mb-5 gap-5">
            {/* Total Balance Card */}

            <div className="content  h-48 p-4 mr-30">
              <div className="flex items-center justify-between">
                <span className="font-semibold sm:text-sm">Total Balance</span>
                <div>
                  <BsFillArrowUpCircleFill className="ml-28 mt-2 text-teal-500" />
                  <span className="ml-28 text-teal-500">2.36%</span>
                </div>
                <div className="flex flex-column justify-end ">
                  <div className="rounded-full ml-20 mt-1 text-teal-500"></div>
                </div>
              </div>
              <h1 className="font-semibold ml-0 text-3xl leading-9 p-2">
                NGN {users.account_balance}.00
              </h1>
              <div className="flex justify-between items-center gap-10 ml-1">
                <div>
                  <div className="flex items-center justify-center">
                    <BsFillCaretUpFill />
                    <p className="text-xs font-normal mr-24">Income</p>
                  </div>
                  <h1 className="font-semibold">NGN 0.00</h1>
                </div>
                <div className="w-0 h-14 border border-red-500"></div>
                <div>
                  <div className="flex items-center justify-start">
                    <BsCaretDownFill />
                    <p className="text-xs font-normal mr-20">Expenses</p>
                  </div>
                  <h1 className="font-semibold">NGN 0.00</h1>
                </div>
              </div>
            </div>

            <div className="content lg:w-1/2 h-48 p-4 my-[5%] md:my-[0%]">
              <div className="flex flex-column justify-between">
                <h3 className="font-semibold sm:text-sm">Total savings</h3>
                <div className="flex flex-column justify-end ">
                  <div className="ml-11 mt-1 text-teal-500">
                    <BsFillArrowUpCircleFill />
                  </div>
                  <span className="mr-10 text-teal-500">2.36%</span>
                </div>
              </div>
              <h1 className="text-3xl ml-[-4%] mt-1 font-semibold leading-9 p-4">
                NGN {users.savings_wallet}.00
              </h1>
              <div className="flex flex-row  text-teal-500 p-6">
                <BsFillBarChartFill />
              </div>
            </div>
          </div>

          {/* <div className="h-96 mb-3">
            <img style={{ width: '100%', height: '95%' }} src={graph} alt="graph" />
          </div> */}

          <div className="p-2 md:h-96 md:mb-2 mb-[5%]">
            <TransactionChart />
          

            
            </div>
          </div>
        </div>
     
  
  );
};

export default DashboardHome;
