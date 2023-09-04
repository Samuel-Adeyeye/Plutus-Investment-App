/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
// import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import share from "./assets/share.svg";
import transaction from "./assets/transaction.svg";
import profile from "./assets/profile.png"
import icons from "./assets/icons8.png"
import { savingswallet } from "../../../redux/action";
import { useDispatch } from "react-redux";
import { getInfo } from "../../../redux/action";
import { useSelector } from "react-redux";
import { getBeneficiary } from "../../../redux/action";



const Savings = () => {
 const [formData, setFormData] = useState({
    amount:""
  })

  // const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch() as unknown as any

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if(name === "amount"){
        setFormData({
            ...formData,
            [name]: +value 
          });
          console.log(formData)
    }else{
        setFormData({
            ...formData,
            [name]: value,
          });
    }
    
  };
//   console.log(formData);

  const handleSubmit = async(e:any) => {
    e.preventDefault()
    console.log(formData)
    dispatch(savingswallet(formData))
  }

  const users = useSelector((state:any) => state.user)

  console.log(users.account_name)

  useEffect(() => {
    dispatch(getInfo())
  }, [])

  const beneficiaries = useSelector((state:any) => state.beneficiary)

  console.log(beneficiaries[0])

  console.log(users.account_name)

  useEffect(() => {
    dispatch(getBeneficiary())
  }, [])

  return (
    <div className="flex">
    <div className=" flex flex-col items-center ml-[6%]  h-[100vh] 
    lg:w-[340px] w-[270px] h-[340px] rounded-lg md:w-[300px]">
      <h3 className="mb-5 font-bold text-lg">Select Payer</h3>
     <div className="relative">
      <button
        // onClick={() => setIsOpen((prev) => !prev)}
        className="bg-slate-900 p-4 w-full items-center flex 
        justify-between font-bold text-white tracking-wider 
        border-4 border-transparent active:border-white duration-300 
        active:text-white"
      >
        Checking Account
        {/* {!isOpen ? (
          <AiOutlineCaretDown className="h-3" />
        ) : (
          <AiOutlineCaretUp className="h-3" />
        )} */}
      </button>
      {/* {isOpen && (
        <div className="bg-gray-200 absolute top-20 flex flex-col items-start  p-2 w-full">
          <div
            className=" hover:bg-slate-500 cursor-pointer rounded-r-lg hover:border-l-white border-l-4
                border-l-transparent"
          >
            <h3 className="font-bold text-gray">
              <Link to="/dashboard/transfer">Checking Account</Link>
            </h3>
          </div>
          <div
            className=" hover:bg-slate-500 cursor-pointer rounded-r-lg hover:border-l-white border-l-4
                border-l-transparent"
          >
            <h3 className="font-bold text-gray">
              <Link to="/dashboard/transfer/savings">Savings Wallet</Link>
            </h3>
          </div>
        </div>
      )} */}
      </div>
      <div className="bg-slate-900 mt-7">
        <div className="m-5">
          <h3 className="text-white font-bold">Checking Account</h3>
          <p className="text-white text-xs mt-7">Balance</p>
          <h1 className="text-teal-200 text-3xl mt-3">NGN {users.account_balance}.00</h1>
        </div>
        <div className="border-solid hidden lg:block border-2 border-gray-600 w-[300px] m-5 mt-7"></div>
        <div className="m-5">
          <p className="text-white text-xs  mt-7">IBAN</p>
          <h3 className="text-white mt-2">{users.account_number}</h3>
          <p className="text-white text-xs  mt-5">Account Owner</p>
          <h3 className="text-white mt-2">{users.account_name}</h3>
        </div>
        <div className="bg-purple-300 flex h-[50px] items-center justify-center">
          <img className="w-[20px] h-[20px] ml-24" src={share} alt="share" />
          <span className="text-sm ml-2">Share IBAN</span>
        </div>
        <div className="bg-red-200 flex h-[50px] items-center justify-center">
          <img
            className="w-[20px] h-[20px] ml-20"
            src={transaction}
            alt="share"
          />
          <span className="text-sm ml-3">Request Payment</span>
        </div>
        
      </div>
      <div className="bg-slate-200 mt-7">
        <div className="flex w-full justify-between items-center mt-7">
        <h3 className="ml-7 font-bold text-sm">Saved Beneficiares</h3>
        <Link to="/dashboard/transfer/addbeneficiary" className="ml-20 lg:ml-28 md:ml-28 text-xs">View all</Link>
        </div>
        <div className="flex mb-5" >
            <div className="mt-3 items-center" >
                <Link to="/dashboard/transfer/addbeneficiary"><img className="w-[38px] h-[38px] ml-6" src={icons} alt="icon" /></Link>
                <Link to="/dashboard/transfer/addbeneficiary" className="text-xs mt-2 ml-4">Add New</Link>
            </div>

            <div className="flex">
               {beneficiaries?.map((e:any)=> (<li key = {e.accountNumber} className="list-none">
                
                <div className="mt-3  ">
                <img className="w-[38px] h-[38px]" src={profile} alt="icon" />
                <p className="text-xs mt-2">{e.beneficiaryName}</p> 
                </div>
               </li>))}
            </div>
      
        </div>
        
        </div>
        <div className="mt-10 lg:hidden md:hidden">
      <h3 className="mb-5 font-bold text-lg">Transfer to</h3>
      <Link to="/dashboard/transfer/savings" className="text-sm">Savings Wallet</Link><br />
      <Link to="/dashboard/transfer/investment" className="text-sm ml-5">Investment</Link><br />
        <Link to="/dashboard/transfer" className="text-sm ml-5">Other account</Link>
        <div className="border-solid border-2 border-gray-100 mt-7"></div>


   
        <form action="" onSubmit={handleSubmit} className="flex flex-col mt-7">
            
            <p className="text-sm">Savings Wallet</p>
            
          <input
          className="mt-6 w-full"
            type="text"
            name={"amount"}
            onChange={handleChange}
            value={formData.amount}
            required
            placeholder="Amount *"
          />

          <button type="submit" className=" block bg-gray-950 mt-8 text-white text-xs 
          h-[50px] rounded-md" >
            {" "}
            Continue
          </button>
          
        </form> 

        


    </div>
    </div>
    <div className="ml-10 lg:w-[680px] md:w-[200px] hidden lg:block md:block">
      <h3 className="mb-5 font-bold text-lg">Transfer to</h3>
      <Link to="/dashboard/transfer/savings" className="text-sm">Savings</Link>
      <Link to="/dashboard/transfer/investment" className="text-sm ml-5">Investment</Link>
        <Link to="/dashboard/transfer" className="text-sm ml-5">Other account</Link>
        <div className="border-solid border-2 border-gray-100 mt-3"></div>

        <form action="" onSubmit={handleSubmit} className="flex flex-col mt-7">
            
              <p className="text-sm">Savings Wallet</p>
              
            <input
            className="mt-6 w-full"
              type="number"
              name={"amount"}
              onChange={handleChange}
              value={formData.amount}
              required
              placeholder="Amount *"
            />
    
          
            <button type="submit" className=" block bg-gray-950 mt-8 text-white text-xs 
            h-[50px] rounded-md" >
              {" "}
              Send
            </button>
            
        </form>



      

    </div>
  
    </div>
  );
};

export default Savings;
