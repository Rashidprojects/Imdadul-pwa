import { useEffect, useState } from "react";
import { useUserData } from "../providers/UserDataContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "../providers/FormContext";

export const useUpdatedAmounts = (updatedData) => {
    const { state } = useUserData();

    const installmentSum = updatedData?.installments.reduce((sum, installment) => {
        const receivedAmount = installment.receivedAmount.replace(/,/g, '');
        return sum + (Number(receivedAmount) || 0);
      }, 0);
    
      const extraUsersSum = updatedData?.extraUsers.reduce((sum, extraUser) => {
        const receivedAmount = extraUser.receivedAmount.replace(/,/g, '');
        return sum + (Number(receivedAmount) || 0);
      }, 0);
    
      const totalRecieved = installmentSum + extraUsersSum
    
      const subTotal = 
      (Number(updatedData?.totalAmount.replace(/,/g, '')) || 0) + 
      (Number(extraUsersSum) || 0);



    useEffect(() => {
        console.log('user state updated so work strted from monday.......', state);
        if(state.editingUser) {
            console.log('work started correctly...', updatedData?.totalAmount);
            console.log('Updated installments is ...', updatedData?.installments);
            console.log('Updated sub total amount is ...', subTotal);

        }
    }, [state, subTotal, updatedData])

}

export const useEditUser = () => {
  const { state, updateUser } = useUserData();
  const { dispatch } = useForm();

  const navigate = useNavigate()

  const [formData, setFormData] = useState(null);


  useEffect(() => {
    if (state.editingUser) {
      setFormData(state.editingUser);
      
    }
  }, [state.editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInstallmentChange = (e) => {
    const { name, value } = e.target;
    dispatch({ 
      type: 'SET_INSTALLMENT', 
      payload: { id: formData.id , name, value } 
    });
  };
  

  const handleAddInstallment = () => {
    if ( !formData?.installment.date || !formData?.installment.receivedAmount) { 
      alert('Complete all installment fields.');
      return;
    }
    dispatch({ type: 'ADD_INSTALLMENT' });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData) {
      await updateUser(formData.id, formData);
      alert('User updated successfully!');
      navigate('/')
    }
  };

  return {
    formData, setFormData,
    handlers: {
      handleChange,
      handleSubmit,
      handleInstallmentChange,
      handleAddInstallment
    } 
  }

}