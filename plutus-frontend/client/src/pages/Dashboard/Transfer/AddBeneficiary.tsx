/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { createBeneficiary } from "../../../redux/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getBeneficiary } from "../../../redux/action";
import profile from "./assets/profile.png"




const AddBeneficiary = () => {

const [formData, setFormData] = useState({
    beneficiaryName:"",
    accountNumber:"",  
 })

 const dispatch = useDispatch() as unknown as any

 const handleChange = (e: any) => {
   const { name, value } = e.target; 
       setFormData({
           ...formData,
           [name]: value,
         });   
 };

 const handleSubmit = async(e:any) => {
    e.preventDefault()
    console.log(formData)
    dispatch(createBeneficiary(formData))
  }

  const beneficiaries = useSelector((state:any) => state.beneficiary)

  console.log(beneficiaries[0])

  useEffect(() => {
    dispatch(getBeneficiary())
  }, [])

  return (
    <div className=" flex flex-col items-center ml-[6%]  h-[100vh] 
    lg:w-[500px] w-[270px] rounded-lg md:w-[500px]">AddBeneficiary

<form action="" onSubmit={handleSubmit} className="flex flex-col mt-7">
            
            <p className="text-sm">Beneficiary</p>

            <input
          className="mt-6 w-full"
            type="text"
            name={"beneficiaryName"}
            onChange={handleChange}
            value={formData.beneficiaryName}
            required
            placeholder="Beneficiary Name *"
          />
            
          <input 
            className="mt-6 w-full"
            type="text"
            name={"accountNumber"}
            onChange={handleChange}
            value={formData.accountNumber}
            required
            placeholder="IBAN *"
          />

             <button type="submit" className=" block bg-gray-950 mt-8 text-white text-xs 
          h-[50px] rounded-md" >
            {" "}
            Continue
          </button>          
        </form> 

<p className="mt-10">All Beneficiaries</p>
        <div className="flex">
               {beneficiaries?.map((e:any)=> (<li key = {e.accountNumber} className="list-none">
                
                <div className="mt-3  ">
                <img className="w-[38px] h-[38px]" src={profile} alt="icon" />
                <p className="text-xs mt-2">{e.beneficiaryName}</p>
                <p className="text-xs mt-2">{e.accountNumber}</p> 
 
                </div>
               </li>))  }
            </div>


    </div>
  )
}

export default AddBeneficiary