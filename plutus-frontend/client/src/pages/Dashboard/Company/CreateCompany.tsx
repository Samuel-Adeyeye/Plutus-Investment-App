/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCompany } from "../../../redux/action";
import LoadingSpinner from "../../../components/spinner";
// import { Link } from "react-router-dom";
// import CompanyTable from "../../companytable/CompanyTable";

interface RegisterComponent {
  companyName: string;
  company_description: string;
  email: string;
  password: string;
  businessType: string;
  roi: string;
  investment_category: string;
  investment_description: string;
  duration: string;
  min_investment_amount: string;
  max_investment_amount: string;
}
const CreateCompany = () => {
  const [formData, setFormData] = useState<RegisterComponent>({
    companyName: "",
    company_description: "",
    email: "",
    password: "",
    businessType: "",
    roi: "",
    investment_category: "",
    investment_description: "",
    duration: "",
    min_investment_amount: "",
    max_investment_amount: "",
  });

  const [cPassword, setCPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const handleChange = (e: unknown) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  const dispatch = useDispatch() as unknown as any;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== cPassword) {
      toast.error("Invalid Password");
    } else {
      dispatch(createCompany(formData));
      setIsLoading(true)


    setTimeout(() => {
     setIsLoading(false)
   }, 7000);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="text-center bg-[#000000A5] fixed left-[0%] top-[0%] w-[100%] z-[25] flex justify-center items-start py-5">
      <div className="bg-[#fff] w-[60%] rounded-3xl overscroll-auto h-full overflow-visible">
        <div>
          <h1 className="text-blue-500 text-4xl mt-10 font-bold">
            Company Registration
          </h1>
          <p className="mt-5 text-2xl font-bold">
            Input Company details below;
          </p>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-5 pl-[15%]">
            <input
              type="text"
              name={"companyName"}
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Company Name"
              className="w-[40%] rounded-lg mt-5 text-lg"
            />{" "}
            <input
              type="text"
              name={"company_description"}
              value={formData.company_description}
              onChange={handleChange}
              required
              placeholder="Company Description"
              className="w-[40%] rounded-lg mt-5 text-lg"
            />{" "}
            <input
              type="text"
              name={"email"}
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-[40%] rounded-lg mt-5 text-lg"
            />{" "}
            <input
              type="text"
              name={"businessType"}
              value={formData.businessType}
              onChange={handleChange}
              required
              placeholder="Business Type"
              className="w-[40%] rounded-lg mt-5 text-lg"
            />{" "}
            <input
              type="password"
              name={"password"}
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-[40%] rounded-lg mt-5 text-lg"
            />{" "}
            <input
              type="password"
              name={"cPassword"}
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              required
              placeholder="Confirm Password"
              className="w-[40%] rounded-lg mt-5 text-lg"
            />{" "}
            <input
              type="text"
              name={"roi"}
              value={formData.roi}
              onChange={handleChange}
              required
              placeholder="ROI"
              className="w-[20%] rounded-lg mt-5 text-lg"
            />
            <input
              type="text"
              name={"investment_category"}
              value={formData.investment_category}
              onChange={handleChange}
              required
              placeholder="Investment Category"
              className="w-[40%] rounded-lg mt-5 text-lg ml-[20%]"
            />{" "}
            <input
              type="text"
              name={"investment_description"}
              value={formData.investment_description}
              onChange={handleChange}
              required
              placeholder="Investment Description"
              className="w-[40%] rounded-lg mt-5 text-lg"
            />{" "}
            {/* <input
              type="text"
              name={"duration"}
              value={formData.duration}
              onChange={handleChange}
              required
              placeholder="Duration"
              className="w-[40%] rounded-lg mt-5 text-lg"
            />{" "} */}
            <select
              name={"duration"}
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-[40%] rounded-lg mt-5 text-lg"
            >
              <option value="">Select duration</option>
              <option value="6-months">6 months</option>
              <option value="1-year">1 year</option>
              <option value="2-years">2 years</option>
            </select>
            <input
              type="text"
              name={"min_investment_amount"}
              value={formData.min_investment_amount}
              onChange={handleChange}
              required
              placeholder="Minimum Investment Amount"
              className="w-[40%] rounded-lg mt-5 text-lg"
            />{" "}
            <input
              type="text"
              name={"max_investment_amount"}
              value={formData.max_investment_amount}
              onChange={handleChange}
              required
              placeholder="Maximum Investment Amount"
              className="w-[40%] rounded-lg mt-5 text-lg"
            />{" "}
          </div>
          <div className="pb-5">
            <button
              type="submit"
              className="w-[40%] rounded-full mt-5 bg-black h-[6vh] text-white hover:bg-blue-500 text-lg mr-5"
            >
              {isLoading ? <LoadingSpinner /> :"Register"}
            </button>
            <button
              onClick={closeModal}
              type="submit"
              className="w-[20%] rounded-full mt-5 bg-red-700 h-[6vh] text-white hover:bg-blue-500 text-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
