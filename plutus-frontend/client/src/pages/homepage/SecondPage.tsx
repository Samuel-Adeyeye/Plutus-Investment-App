// import React from "react";
import pics from "./images/pic.svg";
import num from "./images/num.svg";
import world from "./images/world.svg";
import About from "./About";

const SecondPage = () => {
  return (
    <section className="bg-[white] px-5 md:px-10 mt-12 w-[100%]">
      <div className="bg-white transform -translate-y-20 rounded-lg shadow-lg pt-[2%] pb-[6%] px-[2%]">
        <div className="flex flex-col md:flex-row justify-between bg-[#d6f0ff] rounded-lg shadow-lg p-5 text-center ">
          <div className="md:ml-5 mt-5">
            <h1 className="text-3xl font-bold">Easy payments with one tap</h1>
            <p className="text-xs mt-3">
              Send and request money easily with anyone. No extra fees
            </p>
            <button className="bg-white hover:bg-blue-200 hover:scale-110 text-black rounded-full text-xs w-40 mt-10 h-10">
              <p>Explore Products</p>
            </button>
          </div>
          <img src={pics} className="h-40 w-40 mr-[0%] lg:mr-20" />
        </div>

        <div className="flex flex-col md:flex-row justify-end mt-5 gap-5">
          <div className="text-center bg-[#d4ffe5] rounded-lg shadow-lg p-5 flex flex-wrap justify-center">
            <h1 className="text-2xl font-bold">
              Get cash back and reward for every payment you do!
            </h1>
            <p>Hundreds of deals and reward waiting for you</p>
            <div className="text-center bg-white p3 w-40 h-30 rounded-lg shadow-lg pt-8 pb-2 transform translate-y-20">
              <img src={num} className="h-10 w10" />
              <p className="text-xs">+10 points cashback</p>
            </div>
          </div>

          <div className="text-center bg-[#d4ffe5] rounded-lg shadow-lg p-5 flex flex-wrap justify-center mt-[30%] md:mt-0">
            <h1 className="text-2xl font-bold">
              Rewards await you as you invest on deals
            </h1>
            <p>Supporting 100+ investments, no hidden fees.</p>
            <div className="flex flex-wrap items-center justify-center bg-white p3 w-40 rounded-lg shadow-lg pt-8 pb-2 transform translate-y-20">
              <img src={world} className="h-10 w-10" />
              <p className="text-xs">Worldwide support</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <About />
      </div>
    </section>
  );
};

export default SecondPage;
