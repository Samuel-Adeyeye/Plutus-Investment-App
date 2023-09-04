// import React from "react";
import "./homepage.css";
import Home from "./Home";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <>
      <div className="w-[100%]">
        <div className="overlay"></div>
        <main className="HomeContainer ">
          <FirstPage />
          <Home />
          <SecondPage />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Homepage;
