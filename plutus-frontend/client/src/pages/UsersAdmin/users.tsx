import React, { useEffect, useState } from 'react';
import { apiDelete, apiGet } from '../../utils/axios';
import Pagination from '../Dashboard/AdminPageTransactions/Pagination';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
  savingsWallet: {
    amount: number;
  };
  accountBalance: number;
}

function UsersAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(10);
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  const search = (userDetails: User[]) => {
    return userDetails.filter(
      (user) =>
        user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.id.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const searchedUsers = search(userDetails);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      await apiDelete(`/user/deleteUser/${id}`);
      const newUserArray = userDetails.filter((list) => list.id !== id);
      setUserDetails(newUserArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await apiGet('/user/get');
      setUserDetails(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className='mr-0 m-3 w-3/12 text-end'>
        <input
          className='w-full h-10 rounded-lg'
          type='search'
          placeholder='Search...'
          onChange={handleChange}
          value={searchInput}
        />
      </div>
      <div className=' w-[100%] overflow-x-scroll'>
        <table className='w-auto overflow-x-auto sm:overflow-x-auto'>
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
            {searchedUsers.map((user) => (
              <tr key={user.id} className='h-20 shadow-sm hover:bg-blue-300 bg-blue-100 ml-5'>
                <td className='text-center w-4'>{user.id}</td>
                <td className='text-center w-4'>{user.firstName}</td>
                <td className='text-center w-4'>{user.lastName}</td>
                <td className='text-center w-4'>{user.email}</td>
                <td className='text-center w-4'>{user.accountNumber}</td>
                <td className='text-center w-4'>{user.savingsWallet.amount}</td>
                <td className='text-center w-4'>{user.accountBalance}</td>
                <td className='text-center w-1'>
                  <button className='border bg-red-400 hover:bg-red-600 w-40 h-10 text-white rounded' onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mx-auto w-10 border-16 py-10'>
          <Pagination totalTransactions={searchedUsers.length} postsPerPage={userPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} filterPageNumber={undefined} />
        </div>
      </div>
    </>
  );
}

export default UsersAdmin;
