import ChangePass from "./pages/changePass/ChangePass";
import ChangePass2 from "./pages/changePass/ChangePass2";
import Error404 from "./pages/error404/Error404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/verify/Verify";
import "./App.css";
import SignUp from "./pages/signUp/signUp";
import Login from "./pages/login/login";
// import { RoutesDashBoard } from './pages/Dashboard/Routes';
import Loggin from "./pages/onboarding/Loggin";
import Signupp from "./pages/onboarding/Signupp";
import Homepage from "./pages/homepage/Homepage";
// import Transactions from './pages/AdminPageTransactions/AllTransactions'
// import Transactions from './pages/Transactions/Transactions';
import DashboardHome from "./pages/Dashboard/HomeDashBoard/DashboardHome";
// import CompanyTable from './pages/companytable/CompanyTable';
// import { AuthProvider } from "./pages/auth/Protectedroute";
// import Dashboard from "./pages/Dashboard/Dashboard";
import { RoutesDashBoard } from "./pages/Dashboard/Routes";
import ProtectedRoute from "./pages/auth/Protectedroute";
import {useState, useEffect} from "react"

function App() {    
     const [isSignedIn, setIsSignedIn] = useState(false)
     const verify = localStorage.getItem("verify")
     console.log( typeof isSignedIn)

  const signin = () => {
     if(verify === "true"){
          setIsSignedIn(true)
     }else setIsSignedIn(false)
  }

  useEffect (()=>{
     signin()
  },[])




// import Privaterouter from './pages/auth/Privaterouter';
// import React from 'react';


  return (
    <>
      {/* <AuthProvider> */}
      <BrowserRouter>
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
        />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/changePassword" element={<ChangePass />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loggin" element={<Loggin />} />

          <Route path="/signupp" element={<Signupp />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/changePasswordConfirm" element={<ChangePass2 />} />
          {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
          {/* <Route path="/transactions" element={<Transactions/>}/> */}

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                {/* {" "} */}
                <RoutesDashBoard />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboardhome" element={<DashboardHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}



export default App;



