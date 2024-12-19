import { NumericFormat } from "react-number-format";
import { useEditForm } from "../../lib/hooks/useEditForm";
import { useUserContext } from "../../lib/providers/UserDataContext";
import Installment from "./Installment";
import InstallmentTable from "./InstallmentTable";
import ExtraUsers from "./ExtraUsers";
import ExtraDataTable from "./ExtraDataTable";

const Form = () => {
    const { state: userState } = useUserContext();    

    const initialData = userState.editingUser

    const {
        state, dispatch,
        handlers: {
          handleFieldChange,
          handleIsInstallment,
          handleIsExtraUser,
          handleSubmit,
        },
      } = useEditForm(initialData);

  return (
    <div className="w-full flex justify-center pt-24 px-8 pb-24 sm:px-0">
      <form className="">
        <div className="flex flex-col sm:flex-row gap-3 mb-5 ">
            <div className="sm:w-[85%]">
                <label className='text-[15px] md:text-[20px]'>
                    Username:
                    <input
                    className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px] focus:border-2 focus:border-primary'
                    type="text"
                    name="username"
                    value={state.username || ""}
                    onChange={handleFieldChange}
                    />
                </label>
            </div>

            <div className="sm:w-[85%] flex gap-3 justify-center">
                <div className="w-[50%]">
                    <label className='text-[15px] md:text-[20px]'>
                        House Number:
                        <input
                        className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px] focus:border-2 focus:border-primary'
                        type="text"
                        name="houseNumber"
                        value={state.houseNumber || ""}
                        onChange={handleFieldChange}
                        />
                    </label>
                </div>
                <div className="w-[50%]">
                    <label className='text-[15px] md:text-[20px]'>
                        Area Code: </label>
                        <select  
                        className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]
                        focus:ring-secondary focus:border-secondary ' 
                        name='areaCode'
                        value={state.areaCode || "" }
                        onChange={(e) => {
                            dispatch({
                                type: 'SET_FIELD',
                                field: 'areaCode',
                                value: e.target.value
                            })
                        }}
                        >
                        <option value="default" className='text-'>Select Area</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="A3">A3</option>
                        <option value="A4">A4</option>
                    </select>
                    
                </div>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 ">
            <div className='sm:w-[85%] '>
                <label className='text-[15px] md:text-[20px]'>Address:</label> <br />
                <input
                className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                type="text"
                name="address"
                value={state.address || ""}
                onChange={handleFieldChange}
                autoComplete="off"
                />
            </div>

            <div className='sm:w-[85%] flex gap-3'>
                <div className='w-[50%] '>
                    <label className='text-[15px] md:text-[20px]'>Enter mobile no</label>
                    
                    <NumericFormat
                    className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                    name="mobile"
                    value={state.mobile || ""}
                    onChange={handleFieldChange}
                    autoComplete="off"
                    />
                </div>
                <div className='w-[50%] '>
                    <label className='text-[15px] md:text-[20px]'> Total amount</label>
                    
                    <NumericFormat
                    className='w-full border border-secondary text-secondary rounded-md bg-dark px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                    thousandSeparator={true}
                    name="totalAmount"
                    value={state.totalAmount || ""}
                    onChange={handleFieldChange}
                    required
                    autoComplete="off"
                    />
                </div>
            </div>
        </div>

        <div className='flex justify-center items-center pt-14 gap-3'>
                    <button
                    className='bg-secondary text-light rounded-md text-center p-2 '
                    type="button"
                    onClick= {handleIsInstallment}
                    >
                    Add installment
                    </button>

                    <button
                    className='bg-secondary text-light rounded-md text-center p-2 '
                    type="button"
                    onClick={handleIsExtraUser}
                    >
                    Add extra user
                    </button>
                </div>

        <Installment />
        <ExtraUsers />

        <InstallmentTable />
        <ExtraDataTable /> 

        <div className='flex justify-center pt-20 gap-4' >
            <button
            type="submit"
            onClick={handleSubmit}
            className='bg-secondary text-dark py-2 px-5 rounded-md text-center text-[20px] '
            >
            Submit user data
            </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
