import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import SignUp from "../signUp/signUp";
import Login from "../login/login";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const FirstPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <nav>
          <div className="md:flex lg:flex-row pt-10 mb-3 lg:flex pl-[10%]">
            <div className="flex">
              <div>
                <h1 className="w-full text-3xl font-bold text-white z-10">
                  Plutus.
                </h1>
                <p className="text-white z-40 font-bold">Online Banking</p>
              </div>

              <div className="md:hidden relative z-[10] pl-[40%]">
                <button className="text-white" onClick={toggleBar}>
                  {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                </button>
              </div>
            </div>
            <div
              className={`pr-[20%] md:pr-[8%]  md:flex lg:flex-row  text-[#4770ff] font-bold md:ml-[40%] ${
                isOpen ? "flex flex-row pt-3" : "hidden md:block"
              }`}
            >
              <Link
                to="/signup"
                className="p-4 mr-10  bg-white w-40 hover:bg-blue-200 hover:scale-110 py-2 px-4 rounded-full z-10 h-[90%] pt-4"
              >
                <button>Signup</button>
              </Link>
              <Link
                to="/login"
                className=" text-white p-4 bg-blue-600 w-40 hover:bg-blue-400 hover:scale-110 py-2 px-4 rounded-full z-10 h-[90%] pt-4"
              >
                <button>Login</button>
              </Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      {/* <div>
        <nav className="bg-blue-600">
          <div className="flex justify-between items-center mx-4 md:mx-10 py-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Plutus.</h1>
              <p className="text-white">Online Banking</p>
            </div>
            <div className="hidden md:flex text-white font-bold space-x-4">
              <button className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-200 rounded-lg">
                Signup
              </button>
              <button className="px-4 py-2 bg-blue-700 hover:bg-blue-500 rounded-lg">
                Login
              </button>
            </div>
            <div className="md:hidden">
              <button className="text-white">☰</button>
            </div>
          </div>
        </nav>
      </div> */}
    </>
  );
};

export default FirstPage;

// import { Link, Route, Routes } from "react-router-dom";
// import SignUp from "../signUp/signUp";
// import Login from "../login/login";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { AiOutlineClose } from "react-icons/ai";
// import { useState } from "react";

// const FirstPage = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleBar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <div>
//         <nav>
//           <div className="md:flex lg:flex-row lg:mx-40 pt-10 mb-3">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h1 className="text-3xl font-bold text-white">
//                   Plutus.
//                 </h1>
//                 <p className="text-white font-bold">Online Banking</p>
//               </div>

//               <div className="md:hidden relative">
//                 <button className="text-white" onClick={toggleBar}>
//                   {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
//                 </button>
//               </div>
//             </div>
//             <div className={`md:flex lg:flex-row space-x-4 ${isOpen ? 'block' : 'hidden md:block lg:block'}`}>
//               <Link
//                 to="/signup"
//                 className="p-4 bg-white w-40 hover:bg-blue-200 hover:scale-110 py-2 px-4 rounded-full z-10"
//               >
//                 Signup
//               </Link>
//               <Link
//                 to="/login"
//                 className="p-4 text-white bg-blue-600 w-40 hover:bg-blue-400 hover:scale-110 py-2 px-4 rounded-full z-10"
//               >
//                 Login
//               </Link>
//             </div>
//           </div>
//         </nav>
//         <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//     </>
//   );
// };

// export default FirstPage;
