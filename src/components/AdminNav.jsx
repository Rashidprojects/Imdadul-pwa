import { IoIosArrowForward } from "react-icons/io";
import { useAuth } from "../lib/providers/SigninContext";
import { useNavigate } from "react-router-dom";

const AdminNav = ({ currentSection }) => {

    const { handleLogout } = useAuth()
    const navigate = useNavigate()
  return (
    <div className="mb-4 border-b border-light">
      <div className="flex">
        {/* Icon Section */}
        <div className="w-[100px] flex justify-center items-start border-r border-light">
          <div className="pt-4 pb-4">
            <span className="text-light text-3xl">
              <i className="fa-solid fa-mosque"></i>
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex justify-between items-center w-full pl-2">
          <div className="flex justify-center items-center text-[14px] sm:text-[18px] font-medium">
            <button className="text-light"
                onClick={() => navigate('/')}
            >
                Dashboard
            </button>

            {/* Render current section dynamically */}
            {currentSection && (
              <div className="flex justify-center items-center relative">
                <IoIosArrowForward className="text-table1 text-[14px] top-1 " />
                <p className="text-dark text-[10px] sm:text-[14px]">{currentSection}</p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <div className="mr-2 bg-red-600 text-light px-3 py-1 rounded-md sm:rounded-lg text-[14px] sm:text-[20px] font-medium">
            <button onClick={() => { handleLogout(); navigate('/admin-portal') }}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
