import { NumericFormat } from "react-number-format";
import { useEditForm } from "../../lib/hooks/useEditForm";

const ExtraUsers = () => {
    const {
        state, dispatch,
        handlers: {
            handleExtraUserChange,
            handleAddExtraUser
        }

    } = useEditForm();



  return (
    <div>
        <h1 className="pt-7">Add Extra User</h1>
        <div className={`flex-col justify-center items-center ${state.isExtraUser ? 'flex' : 'hidden' } `}>
            <div className='w-full flex flex-col border border-primary py-5 px-2 sm:px-8 bg-dark rounded-md'>
                <div className='w-full flex flex-col gap-3 sm:flex-row  '>
                    <div className='w-full sm:w-[50%] gap-3 flex '>
                        <div className='w-[50%]'>
                            <label className='text-[15px] md:text-[20px]'>Enter user name</label>
                            <input
                            className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                            type="text"
                            name="name"
                            value={state.extraUser.name}
                            autoComplete="off"
                            onChange={(e) => {
                            dispatch({
                                type: 'SET_EXTRAUSER',
                                name: 'name',
                                value: e.target.value,
                            });
                            }}
                            />
                        </div>

                        <div className='w-[50%]'>
                            <label className='text-[15px] md:text-[20px]'>Enter Date</label>
                            <input
                            className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                            type="date"
                            name="date"
                            value={state.extraUser.date}
                            onChange={handleExtraUserChange}
                            autoComplete="off"
                            />
                        </div>
                    </div>
                    
                    <div className='w-full sm:w-[50%] gap-3 flex '>
                        <div className='w-[50%] '>
                            <label className='text-[15px] md:text-[20px]'>Relation</label>
                            <input
                            className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                            type='text'
                            name="relation"
                            value={state.extraUser.relation}
                            onChange={handleExtraUserChange}
                            autoComplete="off"
                            />   
                        </div>
                        <div className='w-[50%]'>
                            <label className='text-[15px] md:text-[20px]'>Received amount</label>
                            <NumericFormat
                            className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] placeholder:text-primary placeholder:text-[13px] placeholder:sm:text-[16px]'
                            thousandSeparator={true}
                            name="receivedAmount"
                            value={state.extraUser.receivedAmount}
                            onChange={handleExtraUserChange}
                            autoComplete="off"
                            />   
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center pt-3'>
                <button
                className='bg-secondary text-light rounded-md text-center p-2 '
                type="button"
                onClick={handleAddExtraUser}
                >
                Add Extra User
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ExtraUsers