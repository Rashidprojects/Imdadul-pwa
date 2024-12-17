import { useEffect, useState } from "react";
import { useForm } from "../providers/FormContext";
import { updateFundData } from "../services/firestoreService"; // Assume this is the function to update data in Firestore
import { saveToIndexedDB } from "../utils/indexedDb"; // For offline data handling
import { useNavigate } from "react-router-dom";

export const useEditForm = (initialData) => {
  const { state, dispatch } = useForm();

  console.log("Initial Data ID:", initialData?.id);


  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  // Set initial data for the form when editing
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        dispatch({ type: "SET_FIELD", field: key, value: initialData[key] });
      });
    }
  }, [initialData, dispatch]);

  const installmentSum = state.installments.reduce((sum, installment) => {
    const receivedAmount = installment.receivedAmount.replace(/,/g, "");
    return sum + (Number(receivedAmount) || 0);
  }, 0);

  const extraUsersSum = state.extraUsers.reduce((sum, extraUser) => {
    const receivedAmount = extraUser.receivedAmount.replace(/,/g, "");
    return sum + (Number(receivedAmount) || 0);
  }, 0);

  const totalReceived = installmentSum + extraUsersSum;

  const subTotal =
    (Number(state.totalAmount.replace(/,/g, "")) || 0) +
    (Number(extraUsersSum) || 0);

  const pending = state.totalAmount.replace(/,/g, "") - installmentSum;

  // Update calculated fields
  useEffect(() => {
    dispatch({ type: "SET_FIELD", field: "totalReceived", value: totalReceived });
    dispatch({ type: "SET_FIELD", field: "pending", value: pending });
    dispatch({ type: "SET_FIELD", field: "subTotal", value: subTotal });
  }, [totalReceived, pending, subTotal, dispatch]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleInstallmentChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_INSTALLMENT", name, value });
  };

  const handleAddInstallment = () => {
    if (!state.installment.date || !state.installment.receivedAmount) {
      alert("Complete all installment fields.");
      return;
    }
    dispatch({ type: "ADD_INSTALLMENT" });
    setEditIndex(null);
  };

  const handleEditInstallment = (index) => {
    setEditIndex(index);
    dispatch({ type: "EDIT_INSTALLMENT", index });
  };

  const handleRemoveInstallment = (index) => {
    dispatch({ type: "REMOVE_INSTALLMENT", index });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sync input fields to ensure state has the latest form values
    const form = e.target.closest('form');
    const formData = new FormData(form);
    const updatedFields = {};
    formData.forEach((value, name) => {
    updatedFields[name] = value;
    });

    Object.keys(updatedFields).forEach((key) => {
    dispatch({ type: "SET_FIELD", field: key, value: updatedFields[key] });
    });


    if (!state.username || !state.houseNumber || !state.areaCode) {
        alert("Please fill out all the user fields.");
        return;
    }
    dispatch({ type: "SET_LOADING", value: true });

    try {
        const updatedState = { ...state, id: initialData?.id };

        console.log("Submitting Updated State:", updatedState);


        if (navigator.onLine) {
            await updateFundData(initialData?.id, updatedState); // Update data in Firestore
            console.log("Data updated in Firestore");
        } else {
            await saveToIndexedDB("fundCollectionData", updatedState);
            console.log("Data saved to IndexedDB for offline sync.");
        }

        dispatch({ type: "RESET_FORM" });
    } catch (error) {
        dispatch({ type: "SET_ERROR", value: error.message });
    } finally {
        dispatch({ type: "SET_LOADING", value: false });
        navigate("/");
    }
 };


  return {
    state,
    dispatch,
    handlers: {
      handleFieldChange,
      handleInstallmentChange,
      handleAddInstallment,
      handleEditInstallment,
      handleRemoveInstallment,
      handleSubmit,
    },
    uiState: { editIndex },
  };
};