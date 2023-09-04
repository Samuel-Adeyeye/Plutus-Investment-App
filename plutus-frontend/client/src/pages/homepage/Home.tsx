// import React from "react";
import { AiFillApple } from "react-icons/ai";
import { BiLogoPlayStore } from "react-icons/bi";

const Home = () => {
  return (
    <div className="text-white w-full">
      <div className="max-w-[800px] mt-[-150px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white z-10 hover:none">
          Simple and Safe Banking
        </h1>
        <p className="text-white z-10 mt-5">
          Approved by millions of Users Worldwide
        </p>

        <div className="z-10 flex flex-col lg:flex-row mt-20 h-10 w-[50%] items-center lg:ml-[25%] ml-[25%] ">
          <button className="bg-white hover:bg-blue-200 hover:scale-110 text-black flex pt-3 mr-5 rounded-lg h-15 text-xs ml-5 mb-3 md:mt-3">
            <AiFillApple size={30} />
            <div className="mr-5 w-44 mb-3 text-start">
              <p>Download on</p>
              <p className="font-bold">App Store</p>
            </div>
          </button>

          <button className="bg-white hover:bg-blue-200 hover:scale-110 text-black flex pt-3 rounded-lg text-xs">
            <BiLogoPlayStore size={30} />
            <div className="mr-5 w-44 mb-3 text-start">
              <p>Get on</p>
              <p className="font-bold">Google Play</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
