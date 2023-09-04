/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BsPersonFillGear } from 'react-icons/bs';
import { BiSolidLockOpen } from 'react-icons/bi';
import { BiSolidBellRing } from 'react-icons/bi';
import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { updateCompany } from '../../../redux/action'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getCompanyInfo } from "../../../redux/action";



const CompanyAccountSettings: React.FC = () => {
  
  const [formData, setFormData] = useState({
    companyName: "",
    email: "", 
    phoneNumber: "", 
    address: "", 
    zipCode: "", 
    city: "", 
    state: "", 
    country: ""
  })

  const [file, setFile] = useState('');

  function handleFileChange(e: any) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}

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
    dispatch(updateCompany(formData))
  }

  const company = useSelector((state:any) => state.company)

  console.log(company)

  useEffect(() => {
    dispatch(getCompanyInfo())
  }, [])

  return (
    <div className="p-4 md:p-8 lg:p-16 ml-[15%]">
      <form>
        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 overflow-x-auto w-10/12">
          <Link to="/dashboard/companyaccountsettings" className="bg-slate-50 hover:bg-blue-500 p-2 rounded-md flex flex-col items-center">
            <div className="flex items-center text-left space-x-2 md:space-x-4">
              <BsPersonFillGear className="h-6 w-6 ml-2 md:ml-4 text-black" />
              <span className="text-black justify-content: flex-start text-sm md:text-base">Company Info</span>
            </div>
          </Link>

          <Link to="/dashboard/companyupdate-profile" className="bg-slate-50 hover:bg-blue-500 p-2 rounded-md flex flex-col items-center">
              <div className="flex items-center text-left space-x-4">
                <BiSolidBellRing className="h-6 w-6 ml-4 text-black" />
                <span className="text-black justify-content: flex-start">Update Profile</span>
              </div>
          </Link>

      
          <Link to="" className="bg-slate-50 hover:bg-blue-500 p-2 rounded-md flex flex-col items-center">
            <div className="flex items-center text-left space-x-4">
                <BsFillCreditCard2FrontFill className="h-6 w-6 ml-4 text-black" />
                <span className="text-black justify-content: flex-start">Choose Plan</span>
              </div>
          </Link>
        {/* Password and Security */}
        <div className="flex flex-col items-center">
          <Link to=""  className="bg-slate-50 hover:bg-blue-500 p-2 rounded-md flex flex-col items-center">
            <div className="flex items-center text-left space-x-4">
              <BiSolidLockOpen className="h-6 w-6 ml-4 text-black" />
              <span className="text-black justify-content: flex-start">Password and Security</span>
            </div>
          </Link >
        </div>
          
          {/* Other Navigation Links */}
          {/* Add other navigation links here */}
        </div>

        {/* Form Section */}
        {location.pathname === "/dashboard/companyaccountsettings" && (
            <>
            <div className="space-y-4 w-8/12">
              {/* Personal Info Fields */}
              {/* <div className="flex items-center space-x-2">
              <label htmlFor="fileInput" className="w-24 ml-2 mb-0 h-24 flex items-center justify-center rounded-full bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 12.293a1 1 0 011.414 0L10 17.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v9a1 1 0 11-2 0V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <input type="file" name="file" id="fileInput" className="hidden" onChange={handleFileChange}/>
            </div> */}
            <input type="file" onChange={handleFileChange} className="w-28 h-10 hidden"  />
            <img src={file} className="w-24 ml-2 mb-0 h-24 flex items-center justify-center rounded-full bg-gray-300"/>

                <label className="flex flex-col">
                  Company Name
                  <input 
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder={company?.companyName}
                    readOnly
                    onChange={handleChange}
                    name={"companyName"}
                    value={formData.companyName}
                    type="text"
                  />
                </label>

                {/* Add other input fields here */}
              

              <label className="flex flex-col">
                Email
                <input 
                // onChange={handleInputChange}
                  className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder={company?.email}
                  readOnly
                  onChange={handleChange}
                  name={"email"}
                  value={formData.email}
                  type="text"
                />
              </label>

              <label className="flex flex-col">
                Phone Number
                <input 
                  className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder={company?.phoneNumber}
                  readOnly
                  onChange={handleChange}
                  name={"phoneNumber"}
                  value={formData.phoneNumber}
                  type="text"
                />
              </label>

              <label className="flex flex-col">
                Street Address
                <input 
                // onChange={handleInputChange}
                  className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder={company?.address}
                  readOnly
                  onChange={handleChange}
                  name={"address"}
                  value={formData.address}
                  type="text"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  ZIP
                  <input 
                //   onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder={company?.zipCode}
                    readOnly
                    onChange={handleChange}
                    name={"zipCode"}
                    value={formData.zipCode}
                    type="text"
                  />
                </label>

                <label className="flex flex-col">
                  City
                  <input 
                //   onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder={company?.city}
                    readOnly
                    onChange={handleChange}
                    name={"city"}
                    value={formData.city}
                    type="text"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  State
                  <input 
                //   onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder={company?.state}
                    readOnly
                    onChange={handleChange}
                    name={"state"}
                    value={formData.state}
                    type="text"
                  />
                </label>

                <label className="flex flex-col">
                  Country
                  <input 
                //   onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder={company?.country}
                    readOnly
                    onChange={handleChange}
                    name={"country"}
                    value={formData.country}
                    type="text"
                  />
                </label>
              </div>

              
                <button
                  className="w-full bg-black text-white py-2 rounded-md"
                type="submit" 
                onClick={handleSubmit}
                >
                  Save
                </button>
            </div>  
          </>
        )}

          {location.pathname === "/dashboard/companyupdate-profile" && (
            <>
            <div className="space-y-4 w-8/12">
              {/* Personal Info Fields */}
              {/* <div className="flex items-center space-x-2">
              <label htmlFor="fileInput" className="w-24 ml-2 mb-0 h-24 flex items-center justify-center rounded-full bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 12.293a1 1 0 011.414 0L10 17.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v9a1 1 0 11-2 0V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <input type="file" name="file" id="fileInput" className="hidden" onChange={handleFileChange}/>
            </div> */}
            <input type="file" onChange={handleFileChange} className="w-28 h-10"  />
            <img src={file} className="w-24 ml-2 mb-0 h-24 flex items-center justify-center rounded-full bg-gray-300"/>

                <label className="flex flex-col">
                  Company Name
                  <input 
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder="Company Name"
                    onChange={handleChange}
                    name={"companyName"}
                    value={formData.companyName}
                    type="text"
                  />
                </label>

                {/* Add other input fields here */}
              

              <label className="flex flex-col">
                Email
                <input 
                // onChange={handleInputChange}
                  className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder="mail@example.com"
                  onChange={handleChange}
                  name={"email"}
                  value={formData.email}
                  type="text"
                />
              </label>

              <label className="flex flex-col">
                Phone Number
                <input 
                  className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder="+000-12345678"
                  onChange={handleChange}
                  name={"phoneNumber"}
                  value={formData.phoneNumber}
                  type="text"
                />
              </label>

              <label className="flex flex-col">
                Street Address
                <input 
                // onChange={handleInputChange}
                  className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                  placeholder="2 MainLand, Lagos"
                  onChange={handleChange}
                  name={"address"}
                  value={formData.address}
                  type="text"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  ZIP
                  <input 
                //   onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder="0000"
                    onChange={handleChange}
                    name={"zipCode"}
                    value={formData.zipCode}
                    type="text"
                  />
                </label>

                <label className="flex flex-col">
                  City
                  <input 
                //   onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder="Lagos"
                    onChange={handleChange}
                    name={"city"}
                    value={formData.city}
                    type="text"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  State
                  <input 
                //   onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder="Abuja"
                    onChange={handleChange}
                    name={"state"}
                    value={formData.state}
                    type="text"
                  />
                </label>

                <label className="flex flex-col">
                  Country
                  <input 
                //   onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border rounded-md focus:outline-none"
                    placeholder="Nigeria"
                    onChange={handleChange}
                    name={"country"}
                    value={formData.country}
                    type="text"
                  />
                </label>
              </div>

              
                <button
                  className="w-full bg-black text-white py-2 rounded-md"
                type="submit" 
                onClick={handleSubmit}
                >
                  Save
                </button>
            </div>  
          </>
        )}

        {/* Other Sections */}
        {/* Add other sections similarly with input fields */}
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

  

//  return (
//     <form onSubmit={handleFormSubmit}>
//       {/* Form input fields */}
//       <button type="submit">Save</button>
//     </form>
//   )


export default CompanyAccountSettings;