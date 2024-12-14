import { NumericFormat } from "react-number-format";
import { useEditUser } from "../../lib/hooks/useEditingUser"
import { useForm } from "../../lib/providers/FormContext";
import Installment from "./Installment";

const Form = () => {

  const {
    formData, setFormData,
    handlers: {
      handleChange,
      handleSubmit
    }
  } = useEditUser();

  const { dispatch } = useForm();


  const handleDeleteInstallment = (index) => {
    dispatch({ type: 'REMOVE_INSTALLMENT', index });
    setFormData((prevData) => ({
      ...prevData,
      installments: prevData.installments.filter((_, i) => i !== index)
    }))
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData?.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>House Number:</label>
          <input
            type="text"
            name="houseNumber"
            value={formData?.houseNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Area Code:</label>
          <input
            type="text"
            name="areaCode"
            value={formData?.areaCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData?.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData?.mobile}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Total Amount:</label>
          <NumericFormat
            name="totalAmount"
            value={formData?.totalAmount}
            onChange={handleChange}
          />
        </div>

        <Installment />

        <div>
          <h1>Installment custom edit :- </h1>

          <input type="text"  
            name="date"
            value={formData?.installment?.date} />
        </div>


        {formData && console.log(formData.installments)}  {/* Add this to log the whole array */}
          <h3>Installments:</h3>
          <ul>
          {
              formData && formData?.installments.map((inst, index) => (
                <>
                  <li key={index}>
                      {inst.name} - {inst.date} - {inst.receiptNo} - {inst.receivedAmount}
                  </li>
                  <button
                      type='button'
                      className='bg-primary text-light px-3 py-2 rounded-md font-medium text-[15px] md:text-[18px]'
                      onClick={() => handleDeleteInstallment(index)}
                  >
                      Delete
                  </button>
                </>
              ))
          }
          </ul>


        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default Form