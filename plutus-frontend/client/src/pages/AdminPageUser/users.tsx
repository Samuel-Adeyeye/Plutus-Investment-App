import React, { useEffect, useState } from 'react'
import { apiDelete, apiGet } from '../../utils/axios';
import Pagination from '../AdminPageUser/Pagination';

// interface users {
//      id:string,
//      firstname
// }

interface User {
     id: string;
     firstName: string;
     lastName: string;
     email: string;
     accountNumber: string;
     savingsWallet: string;
     accountBalance: number;
     amount: number;
  }
  


function UsersAdmin() {

     const [currentPage, setCurrentPage] = useState(1)
     const [userPerPage] = useState(10)
     const [userDetails, setUserDetails] = useState<User[]>([])
     const [searchInput, setSearchInput] = useState<string>("")


     const search = (userDetails: User[]) => {
          return userDetails.filter((user) => 
          user.email.toLowerCase().includes(searchInput) ||
          user.accountNumber.toLowerCase().includes(searchInput)||
          user.firstName.toLowerCase().includes(searchInput)||
          user.lastName.toLowerCase().includes(searchInput) ) 
     
     } 
     
     const searchedUsers = search(userDetails)


     

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault()
          setSearchInput(e.target.value)
     }

     const handleDelete = async (id: string) => {
          try {
               const response = await apiDelete(`/user/deleteUser/${id}`)

               if(response){
                    const newUserArray = userDetails.filter((list) => list.id !== id)
                    setUserDetails(newUserArray)

               }
          } catch (error) {
               console.error(error)
          }
     }

   

     const getUsers = async () => {
          try {
               const response = await apiGet("/user/get")
               console.log(response.data.data)
          setUserDetails(response.data.data)
          } catch (error) {
               console.error(error)
          }
     }



     useEffect(()=>{
          getUsers()
     }, [userDetails])

  return (
     <>

          <div className='ml-[10%]  md:max-2xl:m-0 mx-auto  mt-4 text-3xl text-center align-center h-10 font-medium'>
          ALL USERS
          </div>

          <div className='ml-[70%] m-3 w-3/12'> 
               <input className=' w-full h-10 rounded-lg ' type='search' placeholder='Search...' onChange={handleChange} value={searchInput} />
          </div>
          <div className='pl-2 overflow-x-scroll'>
               
               <table className='ml-0 w-[92%] shadow-lg '>     
                    <thead className='shadow-lg sticky top-0 bg-blue-500 text-white-50'>
                         <tr>
                              <th className='p-4 w-4'>ID</th>
                              <th className='p-2 w-4'>First Name</th>
                              <th className='p-2 w-4'>Last Name</th>
                              <th className='p-2 w-4'>Email</th>
                              <th className='p-2 w-4'>Account Number</th>
                              <th className='p-2 w-4'>Savings Wallet</th>
                              <th className='p-2 w-4'>Account Balance</th>
                              <th className='p-2 w-4'>Options</th>
                         </tr>
                    </thead>

                    <tbody>
                         {searchedUsers.map((user, i) => {
                              return <tr key={user.id} className='h-20 shadow-sm hover:bg-blue-300 bg-blue-100 ml-5'>
                                        <td className='text-center w-4'>{i+1}</td>
                                        <td className='text-center w-4'>{user.firstName}</td>
                                        <td className='text-center w-4'>{user.lastName}</td>
                                        <td className='text-center w-4'>{user.email}</td>
                                        <td className='text-center w-4'>{user.accountNumber}</td>
                                        <td className='text-center w-4'>{user.savingsWallet.amount}</td>
                                        <td className='text-center w-4'>{user.accountBalance}</td>
                                        <td className='text-center w-1'>
                                             <button className='border bg-red-400 hover:bg-red-600 w-40 h-10 text-white rounded' onClick={() => handleDelete(user.id)}>Delete</button>
                                        </td>
                                   </tr>
                         })}
                    </tbody>
               </table>
               <div className = "mx-auto w-10 border-16 py-10">
                    <Pagination totalTransactions = {userDetails.length} postsPerPage = {userPerPage} setCurrentPage = {setCurrentPage} currentPage = {currentPage} filterPageNumber = {searchedUsers.length}/>
               </div>
               
          </div>
     </>
  )
}

export default UsersAdmin
