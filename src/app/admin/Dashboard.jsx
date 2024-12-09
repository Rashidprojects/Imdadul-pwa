import { useNavigate } from "react-router-dom"
import Pagination from "../../components/Pagination"
import { useEffect, useState } from "react"
import CustomSelect from "../../components/Dashboard/CustomSelect"
import { useUserData } from "../../lib/providers/UserDataContext"
import Loading from "../../components/Loading"
import { usePagination } from "../../lib/providers/PaginationContext"
import MainTable from "../../components/Dashboard/MainTable"

const Dashboard = () => {
    const { state: userState } = useUserData();
    const navigate = useNavigate()
    const { state } = usePagination()

    const items = state.itemsPerPage
    const data = userState.currentData.length


    const [isArea, setIsArea] = useState('')
    const [resetSelect, setResetSelect] = useState(false);

    // Callback function to update the selected value
  const handleSelectionChange = (value) => {
    setIsArea(value);
  };

  const handleReset = () => {
    setIsArea("");
    setResetSelect(true); // Trigger reset
    setTimeout(() => setResetSelect(false), 0); // Clear reset after triggering
  };

  console.log('items count : ', items );
  
    
  return (
    <div className={`bg-primary ${items > 5 && data > 7 ? 'h-auto' : 'h-screen' } pt-7 px-2 pb-4`}> 
       <div className={`bg-light ${items > 5 && data > 7 ? 'h-auto' : 'h-[100%]' } rounded-xl  `}>
        <h1 className="text-center text-2xl sm:text-3xl p-5 font-semibold">
            Welcome to Admin Dashboard!.
        </h1>  
            
        <div className="flex justify-center items-center gap-3 ">
            <button className="bg-secondary text-light w-[100px] sm:w-[120px] p-1 sm:p-2 rounded-md sm:text-[20px] font-medium" 
                onClick={handleReset}
            >All Area</button>
            <CustomSelect onSelectionChange={handleSelectionChange} reset={resetSelect} />
        </div>
        
        <div className="flex justify-end pr-5 pt-5 pb-5">
            <button onClick={() => navigate('/add-user')}
                className="bg-light text-secondary border-2 border-secondary w-[140px] sm:w-[160px] p-2 sm:p-2 rounded-md sm:text-[20px] font-semibold">Add new user</button>
        </div>

        {
            useUserData.loading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <div>
                    <MainTable isArea={isArea} />
                    <Pagination />
                    {/* <CheckData isArea = {isArea} /> */}
                </div>
            )
        }

       </div>
    </div>
  )
}

export default Dashboard