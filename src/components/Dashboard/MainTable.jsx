import { useEffect, useState } from 'react';
import { usePagination } from '../../lib/providers/PaginationContext';
import { useFilteredUsers } from '../../lib/hooks/useFilteredUsers';
import { NumericFormat } from 'react-number-format';
import { ImSearch } from "react-icons/im";
import { MdPersonSearch } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../lib/providers/UserDataContext';

const MainTable = ({ isArea }) => {
  const { state: userState, fetchUsers, setEditingUser } = useUserData();
  const { state, setTotalItems } = usePagination();
  const { currentPage, itemsPerPage } = state;
  const navigate = useNavigate()

  const [isFind, setIsFind] = useState('')

  console.log('is anything have in current data : ', userState.currentData);
  
  

  // Custom hook to manage filtered users and pagination
  const { filteredUsers, setFilteredUsers } = useFilteredUsers(
    userState.users,
    isArea,
    currentPage,
    itemsPerPage,
  )

  // Update total items whenever filteredUsers changes
  useEffect(() => {
    setTotalItems(filteredUsers.length);

  }, [filteredUsers.length]);


  // Fetch users on component mount
  useEffect(() => {
    fetchUsers(); // Fetch user data
  }, []);


  const handleFindUser = () => {
    if (isFind.trim() === '') {
      // Reset to show all filtered users if no input
      fetchUsers();
      return;
    }    

    const foundUser = filteredUsers.find(      
      (user) => user.houseNumber ===  isFind
    );
 
    if (foundUser) {
      setFilteredUsers([foundUser]); // Display only the found user
    } else {
      setFilteredUsers([]); // Clear the list if no match is found
    }
  }


  const handleKeyPress = (event) => {
  if (event.key === 'Enter' && isFind.trim() === '') {
    fetchUsers();  // Trigger fetchUsers() when Enter is pressed and input is empty
  }
};

  return (
    <div className='shadow mx-5'>
      <div className='flex justify-center sm:justify-end items-center bg-primary rounded-t-lg'>

      {/* Find signgle user input field */}
      <div className= {` py-2 sm:pr-4 relative ${isArea !== '' ? 'flex' : 'hidden' } `} >
        <NumericFormat  
          placeholder='Enter House Number to Search'
          onKeyDown={handleKeyPress}
          onChange={(e) => setIsFind(e.target.value)}
          className='border border-light bg-dark rounded-md w-[280px] sm:w-[320px] pl-2 pr-4 py-1 sm:py-2 sm:text-[18px] placeholder:text-primary ' />
          <div 
            onClick={handleFindUser}
            className='absolute right-[10px] sm:right-[24px] bottom-[14px] px-1 sm:px-3 py-1  sm:py-2 rounded-md bg-secondary cursor-pointer z-10'>
            <ImSearch className=' text-light sm:text-[18px]  ' />
          </div>
      </div>

      </div>
      <div className="overflow-auto rounded-b-lg">
        
        {filteredUsers.length === 0 ? (
          <p>No data found.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-primary text-light border-2 border-primary ">
              <tr>
                <th className="w-20 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">No.</th>
                <th className="w-20 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Name</th>
                <th className="w-32 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">House No.</th>
                <th className="w-20 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Area Code</th>
                <th className="w-24 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Address</th>
                <th className="w-24 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Phone</th>
                <th className="w-24 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Total</th>
                <th className="w-24 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Received</th>
                <th className="w-32 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Pending</th>
                <th className="w-32 p-2 text-[18px] sm:text-[22px] font-normal tracking-wide text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="border-2 border-primary">
              {
                userState?.currentData?.map((item, index) => 
              (
                <tr
                  key={item.id}
                  className={`${(index + 1) % 2 === 0 ? 'bg-dark' : 'bg-table1'}`}
                >
                  <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                    {item.username}
                  </td>
                  <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap w-[30] ">
                    {item.houseNumber}
                  </td>
                  <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                    {item.areaCode}
                  </td>
                  <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                    {item.address}
                  </td>
                  <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                    {item.mobile}
                  </td>
                  <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                    {Number(item.subTotal).toLocaleString('en-US')}
                  </td>
                  <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                    {Number(item.totalReceived).toLocaleString('en-US')}
                  </td>
                  <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                    {Number(item.pending).toLocaleString('en-US')}
                  </td>
                  <td className="p-2 text-[18px] sm:text-[22px] text-gray-700 whitespace-nowrap">
                    <div className='flex gap-7 items-center'>
                      <div onClick={() => {
                        setEditingUser(item)
                        navigate('/view-profile')
                      }} >
                        <MdPersonSearch className='text-[29px] cursor-pointer' />
                      </div>
                      <div onClick={() => {
                        setEditingUser(item)
                        navigate('/edit')
                      } }>
                        <FaEdit className='text-[22px] cursor-pointer' />
                      </div>
                    </div>
                    </td>
                </tr>
              ))}
            </tbody> 
          </table>
        )}
      </div>
    </div>
  );
};

export default MainTable;
