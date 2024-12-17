import React from "react";
import { useEditForm } from "../../hooks/useEditForm";
import Form from "./Form";
import Installment from "./Installment";

const EditForm = ({ initialData }) => {
  const {
    state,
    handlers: {
      handleFieldChange,
      handleInstallmentChange,
      handleAddInstallment,
      handleEditInstallment,
      handleRemoveInstallment,
      handleSubmit,
    },
    uiState: { editIndex },
  } = useEditForm(initialData);

  return (
    <div className="edit-form-container">
      <h2>Edit Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Main Form UI */}
        <Form
          state={state}
          onFieldChange={handleFieldChange}
        />

        {/* Installment Management */}
        <div className="installments-section">
          <h3>Installments</h3>
          <Installment
            state={state}
            editIndex={editIndex}
            onInstallmentChange={handleInstallmentChange}
            onAddInstallment={handleAddInstallment}
            onEditInstallment={handleEditInstallment}
            onRemoveInstallment={handleRemoveInstallment}
          />
        </div>

        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditForm;
