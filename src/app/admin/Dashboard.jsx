import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import CustomSelect from "../../components/Dashboard/CustomSelect";
import Loading from "../../components/Loading";
import { usePagination } from "../../lib/providers/PaginationContext";
import MainTable from "../../components/Dashboard/MainTable";
import { useUserContext } from "../../lib/providers/UserDataContext";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useAmountSummary } from "@/lib/hooks/useFilteredUsers";

const Dashboard = () => {
    const { state: userState } = useUserContext();
    const navigate = useNavigate();
    // const { state } = usePagination();

    // const items = state.itemsPerPage;

    const [isArea, setIsArea] = useState("");
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

    const { total, pending, received } = useAmountSummary(userState.filteredData) // Default values if loading

    return (
        <div
            className='bg-primary h-screen pt-5 '
        >
            <div
                className='bg-light mx-1 sm:mx-4 h-[98%] overflow-y-auto rounded-lg '
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <h1 className="text-center text-2xl sm:text-3xl p-5 font-semibold">
                    Welcome to Admin Dashboard!.
                </h1>

                <div className="flex justify-center items-center gap-3 ">
                    <button
                        className="bg-secondary text-light w-[100px] sm:w-[120px] p-1 sm:p-2 rounded-md sm:text-[20px] font-medium"
                        onClick={handleReset}
                    >
                        All Area
                    </button>
                    <CustomSelect
                        onSelectionChange={handleSelectionChange}
                        reset={resetSelect}
                    />
                </div>

                <div className="flex flex-col sm:flex-row justify-center pt-5 gap-3">
                    <div className="flex justify-center">
                        <div className="bg-blue-500 p-4 sm:p-7 rounded-lg text-white">
                            <p className="pb-2">Total Amount</p>
                            <div>
                                <p className="flex items-center gap-2 text-3xl sm:text-5xl"><RiMoneyRupeeCircleFill /> {total.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center">
                        <div className="bg-green-500 rounded-lg p-4 sm:p-7 text-white ">
                            <p className="pb-1 pt-3">Recieved Amount</p>
                            <p className="flex items-center gap-1 text-2xl sm:text-3xl"><RiMoneyRupeeCircleFill /> {received.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="bg-yellow-500 rounded-lg p-4 sm:p-7 text-white">
                            <p className="pb-1 pt-3">Pending Amount</p>
                            <p className="flex items-center gap-1 text-2xl sm:text-3xl"><RiMoneyRupeeCircleFill /> {pending.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                    
                </div>

                <div className="flex justify-end pr-5 pt-5 pb-5">
                    <button
                        onClick={() => navigate("/add-user")}
                        className="bg-light text-secondary border-2 border-secondary w-[140px] sm:w-[160px] p-2 sm:p-2 rounded-md sm:text-[20px] font-semibold"
                    >
                        Add new user
                    </button>
                </div>

                {userState.loading ? (
                    <div>
                        <Loading />
                    </div>
                ) : (
                    <div>
                        <MainTable isArea={isArea} />
                        <Pagination />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
