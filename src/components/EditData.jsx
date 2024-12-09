import { useState, useEffect } from 'react';
import { useUserData } from '../lib/providers/UserDataContext';
import { NumericFormat } from 'react-number-format';
import { useForm } from '../lib/providers/FormContext';
import { useUpdatedAmounts } from '../lib/hooks/useEditingUser';
import Installment from './UserDataCollectorParts/Installment';

const EditData = () => {
  const { state, updateUser } = useUserData();
  const { state: formState, dispatch } = useForm();

  const [formData, setFormData] = useState(null);


  useUpdatedAmounts(formData)

  // Set form data when editingUser is available
  useEffect(() => {
    if (state.editingUser) {
      setFormData(state.editingUser);
    }
  }, [state.editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData) {
      await updateUser(formData.id, formData);
      alert('User updated successfully!');
    }
  };

  const handleDeleteInstallment = (index) => {
    dispatch({ type: 'REMOVE_INSTALLMENT', index });
    setFormData((prevData) => ({
      ...prevData,
      installments: prevData.installments.filter((_, i) => i !== index)
    }))
  };


  if (formData) {
    console.log('installments [0] : ', formData.installments[0]); 
    console.log('total amount : ', formData.totalAmount);
  }
 

  
  if (!formData) return <p>Loading...</p>;

  return (
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
  );
};

export default EditData;
