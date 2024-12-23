import { NumericFormat } from "react-number-format";
import { useEditForm } from "../../lib/hooks/useEditForm";

const Installment = () => {
    const {
        state,
        handlers: {
            handleInstallmentChange,
            handleAddInstallment
        },
    } = useEditForm();
    

  return (
    <div>
        <div className="w-full flex flex-col">
                <h1 className="pt-7">Add Installments</h1>
                <div className='w-full flex flex-col border border-primary py-5 px-2 sm:px-8 bg-dark rounded-md'>
                <div className='gap-12 my-4'>
                    <div className='w-full flex-col sm:flex-row flex  gap-3 justify-center items-center '>
                        <div className="sm:w-[50%] w-full flex gap-2">
                            <div className='w-[50%]'>
                                <label className='text-[15px] md:text-[20px]'>Receipt no</label>
                                <NumericFormat
                                className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] '
                                name="receiptNo"
                                value={state.installment.receiptNo}
                                onChange={handleInstallmentChange}
                                autoComplete="off"
                                />
                            </div>

                            <div className='w-[50%]'>
                                <label className='text-[15px] md:text-[20px]'>Installment date</label>
                                <input
                                className='w-full border px-1 border-secondary text-secondary rounded-md bg-light py-2 font-medium text-[14px] md:text-[20px] '
                                type="date"
                                name="date"
                                value={state.installment.date}
                                onChange={handleInstallmentChange}
                                autoComplete="off"
                                />
                            </div>
                        </div>
                    
                        <div className='sm:w-[50%] w-full'>
                            <label className='text-[15px] md:text-[20px]'>Received amount</label>
                            <NumericFormat
                            className='w-full border border-secondary text-secondary rounded-md bg-light px-3 py-2 font-medium text-[15px] md:text-[20px] '
                            thousandSeparator={true}
                            name="receivedAmount"
                            value={state.installment.receivedAmount}
                            onChange={handleInstallmentChange}
                            autoComplete="off"
                            />
                        </div>
                    </div>
                </div>


                <div className='flex justify-center items-center pt-3'>
                    <button
                    className='bg-secondary text-light rounded-md text-center p-2 '
                    type="button"
                    onClick={handleAddInstallment}
                    >
                    Add Installment
                    </button>
                </div>
                </div>
            </div>
    </div>
  )
}

export default Installment