import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { roiTransfer } from "../../../redux/action"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Roitransfer() {
    const [accountNumber, setAccountNumber] = useState("")

        const dispatch = useDispatch() as unknown as any

        const handleChange = (e: any) => {
            
                setAccountNumber(e.target.value)
          };
          console.log(accountNumber)

          const handleSubmit = async(e:any) => {
            e.preventDefault()
            dispatch(roiTransfer(accountNumber))
          }

  return (
    <>
    <section className = "lg:pl-4 md:pl-28 sm:pl-32 min-[375px]:pl-28 max-[374px]:pl-28">
    <div className = "text-center mt-8 text-2xl"> Return On Investment</div>
    <div className='lg:flex md:flex-wrap sm:flex-wrap'>
    <div className = "lg:w-1/2 md:w-full sm:w-full min-[375px]:w-full text-justify leading-7">
        <p className = "text-red-800"><strong>Investor Return on Investment (ROI) Policy</strong></p>
        <p>Welcome to <span className = "text-blue-800">Plutus!</span></p>
        <p className = "text-sm"><span className = "text-blue-800"><strong>Our Commitment to Transparency and Accountability</strong></span><br/> At <span className = "text-blue-800">Plutus</span>, we take pride in our dedication to transparency, open communication, and accountability. As part of this commitment, we want to outline our policy for providing Return on Investment (ROI) information to our valued investors. 
        <br/><span className = "text-blue-800"><strong>Timely and Accurate ROI Updates</strong></span><br/> We understand that staying informed about your investment's performance is crucial. To ensure that you have access to the latest information, we provide regular updates on the status of your investment and its corresponding ROI. These updates will be delivered as per the terms outlined in your investment agreement.
        <br/><span className = "text-blue-800"><strong>Secure and Confidential Delivery </strong></span><br/>Your trust is paramount to us, and we treat your investment information with the utmost care. Our ROI updates are delivered through secure and confidential channels to ensure your data's privacy. Whether it's via email, our secure online portal, or other designated communication methods, you can trust that your investment details are handled with diligence.
        <br/><span className = "text-blue-800"><strong>Respecting Your Privacy</strong></span><br/>Your financial information is treated with the highest level of privacy and confidentiality. We adhere to industry best practices to safeguard your data against unauthorized access, ensuring that your investment-related information remains secure.
        <br/><span className = "text-blue-800"><strong>Contact Us</strong></span><br/>Should you have any inquiries, concerns, or requests related to your ROI updates, our investor relations team is here to help. Feel free to reach out to us at <span className = "text-red-800">customerservice@plutus.com.</span> We value your partnership and are committed to providing the support you need. At <span className = "text-blue-800">Plutus</span>, we believe that open and transparent communication is the foundation of a successful investor relationship. Our ROI policy underscores our dedication to keeping you informed and confident in your investment journey.
        <br/>Thank you for choosing <span className = "text-blue-800">Plutus</span> as your investment partner. We look forward to achieving mutual success together.
        </p>
    </div>
    <div className = "lg:w-1/2 md:w-full sm:w-full min-[375px]:items-center min-[375px]:w-full mt-32">
    <form action="" onSubmit = {handleSubmit} className="md:pl-[60px] min-[375px]:pl-[5px] sm:pl-20 w-1/2">
          <input 
            className="mt-6 w-96 min-[375px]:w-[300px] max-[374px]:w-52 md:w-[600px] sm:w-[500px] xl:w-[500px] italic"
            type="text"
            name="accountNumber"
            value={accountNumber}
            required
            placeholder="Type account number"
            onChange = {handleChange}
          />

          <button type="submit" className=" block bg-gray-950 mt-8 text-white text-xs 
          h-[50px] rounded-md w-96 min-[375px]:w-[300px] max-[374px]:w-52 md:w-[600px] sm:w-[500px] xl:w-[500px]" >
            {" "}
            Transfer
          </button>
          
    </form> 
    <p className="lg:pl-32 xl:pl-[60px] sm:pl-3.5 py-16 w-auto pr-4 text-red-800 text-justify"><strong>Notice:</strong><br/> Any transfer made to investor means you are confirming that all terms and conditions have been met; the duraion of investment has elapsed and the investor is eligible for this transfer.</p>
    </div>
    </div>
    </section>
    </>
  )
}

export default Roitransfer

