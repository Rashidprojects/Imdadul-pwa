import { useEffect } from "react";
import { useUserData } from "../providers/UserDataContext";

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
    }, [state])

}