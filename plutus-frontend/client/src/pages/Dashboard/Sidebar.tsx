import { BsSave } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { BiTransfer } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { PiUserListFill } from "react-icons/pi";
import { ImOffice } from "react-icons/im"
// import { FaMoneyBillTransfer } from "react-icons/fa"

import { MdOutlineDashboard, MdLogout, MdTableChart } from "react-icons/md";

import React, { useState } from "react";
import "./dashboard.css";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: AiFillHome },
    { name: "Transfer", link: "/dashboard/transfer", icon: MdOutlineDashboard },
    { name: "Transactions", link: "/dashboard/transactions", icon: BiTransfer },

    { name: "Investment", link: "/dashboard/investment", icon: BsSave },
    {
      name: "Settings",
      link: "/dashboard/accountsettings",
      icon: FiSettings,
      margin: true,
    },
    { name: "Log out", link: "/", icon: MdLogout },
  ];

  const adminmenus = [
    
    {name: "Users", link:'/dashboard/admin', icon: PiUserListFill},
    {name: "companies", link:'/dashboard/companies', icon: ImOffice},
    {name: "Transactions", link:'/dashboard/allTransactions', icon: BiTransfer},
    {
     name: "Update",
     link: "/dashboard/updateCompanyProfile",
     icon: FiSettings,
     margin: true,
   },
    { name: "Log out", link: "/", icon: MdLogout },
  
  ];
  const companymenus = [
    { name: "Home", link: "/dashboard/companyHome", icon: AiFillHome },
    { name: "Transfer", link: "/dashboard/roitransfer", icon: BiTransfer },
    {
      name: "Investor Table",
      link: "/dashboard/investorTable",
      icon: MdTableChart,
    },
    { name: "Log out", link: "/", icon: MdLogout },
    {
      name: "Settings",
      link: "/dashboard/companyaccountsettings",
      icon: FiSettings,
      margin: true,
    },
  ];
  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role");


  const LogOut = (name: string) => {
    if (name === "Log out") {
      localStorage.clear();   
    }
  };

  return (
    // <section className='flex gap-6'>
    <div className={`md:${open ? 'w-48': 'w-20'} ${open ? 'w-20': 'w-20'} duration-500 fixed lg:h-[100vh] h-[200vh] z-[5] bg-[#f7fafc]  text-gray-500 px-4 shadow-xl} `}>
        <div className='py-3 flex justify-end'>
          <HiMenuAlt3 size={26} className='cursor-pointer float-right shadow' onClick={()=>setOpen(!open)}/>
        </div>
        <div>
          <h1 className='text-center text-gray-500'>Plutus</h1>
        </div>
        <div className='decoration mt-4 flex-col gap-4 relative'>
          {(role === "user" ? menus : role === "admin" ? adminmenus : companymenus)?.map((menu, i)=>(

             <Link to={menu?.link} key={i} className={` group flex items-center text-sm text-left font-medium p-2 hover:text-black rounded-md w-30 m-0`} onClick={() => LogOut(menu?.name)}>

              
              <div className='w-16'>
                {React.createElement(menu?.icon, {size: '20'})}
              </div>
              <h2 
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre hidden md:block duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden m-0"
              } `}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-500 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}>
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
    // </section>
  );
};

export default Sidebar;

///////////////

// import { Link } from 'react-router-dom'
// import {HiMenuAlt3 } from 'react-icons/hi'
// import {BiTransfer} from 'react-icons/bi'
// import { IoIosCard } from 'react-icons/io';
// import {AiFillHome} from 'react-icons/ai'
// import {BsSave} from 'react-icons/bs'
// import {FiSettings} from 'react-icons/fi'
// import {MdOutlineDashboard, MdLogout} from 'react-icons/md'
// import React, { useState } from 'react'
// import "./dashboard.css"

// const sidebar = () => {
//   const menus = [
//     {name: "Dashboard", link:'/dashboard', icon: AiFillHome},
//     {name: "Transfer", link:'/dashboard', icon: MdOutlineDashboard},
//     {name: "Transactions", link:'/dashboard', icon: BiTransfer},
//     {name: "Accounts and Cards", link:'/dashboard', icon: IoIosCard},
//     {name: "Investment", link:'/dashboard', icon: BsSave},
//     {name: "Settings", link:'/dashboard', icon: FiSettings, margin: true},
//     {name: "Log out", link:'/dashboard', icon: MdLogout}
//   ];
//   const [open, setOpen] = useState(true);
//   return (
//     <section className="flex gap-6">
//       <div
//         className={`bg-[#0e0e0e] min-h-screen ${
//           open ? "w-72" : "w-16"
//         } duration-500 text-gray-100 px-4`}
//       >
//         <div className="py-3 flex justify-end">
//           <HiMenuAlt3
//             size={26}
//             className="cursor-pointer"
//             onClick={() => setOpen(!open)}
//           />
//         </div>
//         <div className=" decoration mt-4 flex flex-col gap-4 relative ">
//           {menus?.map((menu, i) => (
//             <Link
//               to={menu?.link}
//               key={i}
//               className={` ${
//                 menu?.margin && "mt-5"
//               } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
//             >
//               <div>{React.createElement(menu?.icon, { size: "20" })}</div>
//               <h2
//                 style={{
//                   transitionDelay: `${i + 3}00ms`,
//                 }}
//                 className={`whitespace-pre duration-500 ${
//                   !open && "opacity-0 translate-x-28 overflow-hidden"
//                 }`}
//               >
//                 {menu?.name}
//               </h2>
//               <h2
//                 className={`${
//                   open && "hidden"
//                 } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
//               >
//                 {menu?.name}
//               </h2>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default sidebar;

// const Sidebar = ({ role }: any) => {
//   const [open, setOpen] = useState(true);

//   const renderSidebar = () => {
//     if (role === 'user') {
//       return <UserSidebar />;
//     } else if (role === 'admin') {
//       return <AdminSidebar />;
//     } else if (role === 'company') {
//       return <CompanySidebar />;
//     }
//   };

//   return (
//     <div className={`${open ? 'w-72' : 'w-16'} duration-500 min-h-screen bg-[#f7fafc] relative text-gray-500 px-4`}>
//       <div className='py-3 flex justify-end'>
//         <HiMenuAlt3 size={26} className='cursor-pointer float-right' onClick={() => setOpen(!open)} />
//       </div>
//       <div>
//         <h1 className='text-center text-black'>Plutus</h1>
//       </div>
//       <div className='decoration mt-4 flex-col gap-4 relative'>
//         {renderSidebar()}
//       </div>
//     </div>
//   );
//  };

// const UserSidebar = () => {
//   const userMenus = [
//     { name: "Home", link: '/dashboard/home', icon: AiFillHome },
//     { name: "Transfer", link: '/dashboard/transfer', icon: MdOutlineDashboard },
//     { name: "Transactions", link: '/dashboard/transactions', icon: BiTransfer },
//     { name: "Accounts and Cards", link: '/dashboard/accountsandcards', icon: IoIosCard },
//     { name: "Investment", link: '/dashboard/investment', icon: FiSettings },
//     { name: "Settings", link: '/dashboard/settings', icon: FiSettings, margin: true },
//     { name: "Log out", link: '/dashboard/logout', icon: MdLogout }
//   ];

//   return (
//     <div>
//       {userMenus.map((menu, i) => (
//         <Link to={menu.link} key={i} className={`${menu.margin && "mt-96"} group flex items-center text-sm text-left font-medium p-2 hover:text-black rounded-md`}>
//           <div>
//             {React.createElement(menu.icon, { size: '20' })}
//           </div>
//           <h2 style={{ transitionDelay: `${i + 3}00ms` }} className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflown-hidden m-0'}`}>{menu.name}</h2>
//           <h2 className={`${open() && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}>
//             {menu.name}
//           </h2>
//         </Link>
//       ))}
//     </div>
//   );
// };

// }

// export default Sidebar;
