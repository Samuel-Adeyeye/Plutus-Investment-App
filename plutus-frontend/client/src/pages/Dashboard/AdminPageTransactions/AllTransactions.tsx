import React, {useEffect, useState} from 'react';
import axios from '../../../api/axios';
import { apiDelete, apiGet } from '../../../utils/axios';
import Pagination from './Pagination';
 
function AllTransactions (){
    const [transactionDetails, setTransactionsDetails] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [transactionsPerPage, setTransactionsPerPage] = useState(5)
    const [searchValue, setSearchValue] = useState(""); 
    
    const getTransactions = async() => {
        const response = await apiGet("/transfer/successfultransactions")

        setTransactionsDetails(response.data.data)
    }

    useEffect(() => {
        getTransactions()
    }, [transactionDetails])

    const lastTransactionIndex = currentPage * transactionsPerPage
    const firstPostIndex = lastTransactionIndex - transactionsPerPage
    const currentTransactions = transactionDetails.slice(firstPostIndex, lastTransactionIndex)
    
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
      };
    
      // Filter transactions based on search input
    const filteredTransactions = transactionDetails.filter((val) =>
    val.senderId.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleClick = async(id) => {
        const response = await apiDelete(`/transfer/delete/${id}`)

        if(response){
            const newTransactions = transactionDetails.filter((list) => list.id !== id);
            setTransactionsDetails(newTransactions);
            console.log(transactionDetails)
        }
      }
  

    return (
        <>

        <div className="mt-12 releative w-full flex flex-col shadow-lg mb-6">
            <div className = "flex flex-wrap items-center">
                <div className = "relative w-full px-4 max-w-full flex-grow">
            <p className = " ml-[9%] md:ml-[0%] lg:ml-[0%] text-center text-xl decoration-from-font text-black-700 ">TRANSACTIONS FOR ALL USERS</p>
            </div>
            </div>

            <div className="flex px-6 justify-end">
            <input className=" w-[84%] md:w-[92%] lg:w-[25%] h-10 px-2 italic" placeholder="search for transactions" value={searchValue} onChange={handleSearchChange}/>            
            </div>


            <div className = "block bg-transparent mt-8 w-full overflow-x-auto">
            <table className = " border-2 w-6/12  pt-px ">
                <thead>
                    <tr className = "border border-solid border-l-0 bg-blue-500">
                        <th className = "text-md px-6 py-1">id</th>
                        <th className = "text-md px-6 py-1">accountNumber</th>
                        <th className = "text-md px-6 py-1">amount</th>
                        <th className = "text-md px-6 py-1 ">transfer_purpose</th>
                        <th className = "text-md px-6 py-1">beneficiary_name</th>
                        <th className = "text-md px-6 py-1 ">beneficiary_email</th>
                        <th className = "text-md px-6 py-1">status</th>
                        <th className = "text-md px-6 py-1">senderId</th>
                        <th className = "text-md px-6 py-1 bg-red-600">DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {searchValue.length > 0 ?
                        filteredTransactions.map((val, i) => {
                            return <tr className = "hover:bg-blue-300 cursor-pointer bg-blue-100" key = {val.id}>
                            <td className = "text-sm  py-1 text-center w-80">{i+1}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.accountNumber}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.amount}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.transfer_purpose}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.beneficiary_name}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.beneficiary_email}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.status}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.senderId}</td>
                            <td> <button type = "button" className = "bg-red-400 hover:bg-red-600 text-white" onClick = {() => handleClick(val.id)}>DELETE</button> </td>
                         </tr>
                        })
                        :
                        currentTransactions.map((val, i) => {
                            return <tr className = "hover:bg-blue-300 cursor-pointer bg-blue-100" key = {val.id}>
                            <td className = "text-sm  py-1 text-center w-80">{i+1}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.accountNumber}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.amount}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.transfer_purpose}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.beneficiary_name}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.beneficiary_email}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.status}</td>
                            <td className = "text-sm px-6 py-1 text-center">{val.senderId}</td>
                            <td> <button type = "button" className = "bg-red-400 hover:bg-red-600 text-white" onClick = {() => handleClick(val.id)}>DELETE</button> </td>
                         </tr>
                        })  
                    }
                </tbody>
            </table>
            <div className = "mx-auto w-10 border-16 py-10">
                <Pagination totalTransactions = {transactionDetails.length} postsPerPage = {transactionsPerPage} setCurrentPage = {setCurrentPage} currentPage = {currentPage} filterPageNumber = {filteredTransactions.length}/>
            </div>
            </div>
        </div>
        </>
    )
}

export default AllTransactions




