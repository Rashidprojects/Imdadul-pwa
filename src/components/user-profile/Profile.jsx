import { useEffect, useState } from "react";
import AdminNav from "../AdminNav";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../lib/providers/UserDataContext";
import { filterAndSortInstallments } from "../../lib/utils/installments";
import DeleteUserDialog from "../ui/alert-dialog/AlertDialog";

const ProfileView = () => {
    const [isUser, setIsUser] = useState(null)


    const { state, deleteUser } = useUserContext(); 
    const navigate = useNavigate()   
    const sortedinstallments = filterAndSortInstallments(isUser?.installments || [])

    console.log('final past + future install : ', sortedinstallments);
    

    useEffect(() => {
        if (state.editingUser) {
            setIsUser(state.editingUser)
        }
    },[state.editingUser])

  return (
    <div className="bg-primary">
          {/* <span className="border-r border-primary absolute h-[100%] left-[500px] "></span> */}
          <AdminNav currentSection="Add User" />


        <div className={` bg-primary px-3 py-5 ${isUser?.installments.length > 3 || isUser?.extraUsers.length > 3 ? 'h-auto' : 'h-auto' } w-full flex justify-center `}>

            <div className=" bg-light rounded-md p-8 w-full sm:w-[60%] sm:px-40 ">
                
                <div className="w-full">
                    <div className="flex justify-start ">
                        <h2 className="text-[26px]  sm:text-4xl font-semibold text-green-950">
                            {isUser?.username}
                        </h2>
                    </div>
                    <div className="pt-1 ">
                        <p className="text-[22px] font-medium break-words w-[300px] ">{isUser?.address}</p>
                    </div>
                    <div className="flex sm:gap-16 mb-5 sm:mb-8 flex-col sm:flex-row ">
                        <p className="text-[18px] font-semibold mt-2"> area : <span className="text-[20px] text-secondary">{isUser?.areaCode}</span></p>
                        <p className="text-[18px] font-semibold mt-2">house no : <span className="text-[20px] text-secondary">{isUser?.houseNumber}</span></p>
                        <p className="text-[18px] font-semibold mt-2">mobile : <span className="text-[20px] text-secondary">{isUser?.mobile}</span></p>
                        <p className="text-[18px] font-semibold mt-2">amount : <span className="text-[20px] text-secondary">{isUser?.totalAmount}</span></p>

                    </div>
                    <div className="flex justify-center gap-3 sm:gap-9">
                        <div className="bg-red-300 px-4 sm:px-14 py-1 sm:py-3 rounded-lg">
                            <h1 className="sm:text-2xl text-red-700">Total Amount</h1>
                            <p className=" text-[24px] font-bold text-red-700">{isUser?.subTotal}</p>
                        </div>
                        <div className="bg-green-300 px-4 sm:px-8 py-1 sm:py-3 rounded-lg">
                            <h1 className="sm:text-2xl text-green-700">Received Amount</h1>
                            <p className="text-[24px] font-bold text-green-700">{isUser?.totalReceived}</p>
                        </div>
                        <div className="bg-yellow-200 px-4 sm:px-8 py-1 sm:py-3 rounded-lg">
                            <h1 className="sm:text-2xl text-yellow-700">Pending Amount</h1>
                            <p className="text-[24px] font-bold text-yellow-700">{isUser?.pending}</p>
                        </div>
                    </div>

                    <div className="mt-16 flex  flex-wrap justify-start flex-col items-center overflow-auto w-full ">
                        { isUser?.installments.length > 0 &&
                         <div className="pb-10 overflow-auto w-[400px] sm:w-full">
                          <p className="font-semibold">Installments</p>
                          {
                            isUser && sortedinstallments?.map((inst, index) => (
                            <>
                              <div key={index} className="flex list-none gap-5 sm:gap-28 bg-dark border border-primary px-4 sm:px-8 py-3 rounded-md text-[18px] sm:text-[20px] my-2 sm:font-semibold w-full overflow-auto">
                                <li > Installment {index + 1}</li>
                                <li>{inst?.date}</li>
                                <li>{inst?.receiptNo}</li>
                                <li>{inst?.receivedAmount}</li>
                              </div>
                            </>
                            ))
                          }
                        </div>
                        }

                        { isUser?.extraUsers.length > 0 &&
                         <div className="overflow-auto w-[400px] sm:w-full">
                          <p className="font-semibold">Extra Users</p>
                          {
                            isUser && isUser.extraUsers.map((inst, index) => (
                            <>
                              <div key={index} className="flex list-none gap-5 sm:gap-28 bg-dark border border-primary px-4 sm:px-8 py-3 rounded-md text-[18px] sm:text-[20px] my-2 sm:font-semibold w-full overflow-auto">
                                <li > {inst.name}</li>
                                <li>{inst.relation}</li>
                                <li>{inst.date}</li>
                                <li>{inst.receivedAmount}</li>
                              </div>

                            </>
                            ))
                          }
                        </div>
                        }
                        
                    </div>


                </div>
                <div>

                    {/* <div className={`items-center flex justify-center ${isUser?.installments.length > 3 || isUser?.extraUsers.length > 3 ? 'mt-20' : 'mt-20 sm:mt-60' } `}>
                        <button onClick={() => { deleteUser(isUser?.id)
                            navigate('/user-dashboard') }
                        }
                        className="bg-red-500 text-white px-14 py-3 rounded-md font-semibold">Delete user</button>
                    </div> */}


                    <DeleteUserDialog
                      onConfirm={() => {
                        deleteUser(isUser?.id);
                        navigate("/user-dashboard");
                      }}
                    />

                </div>
            </div>
            
        </div>
        
    </div>
  )
}

export default ProfileView