import { NumericFormat } from "react-number-format";
import { useEditForm } from "../../lib/hooks/useEditForm";

const Installment = () => {

    const {
        state,
        handlers: {
          handleInstallmentChange,
          handleAddInstallment,
          handleEditInstallment,
          handleRemoveInstallment,
        },
        uiState: { editIndex },
      } = useEditForm();
  return (
    <div className="installment-section">
      <div className="installment-inputs">
        <label> Date: </label>
          <input
            type="date"
            name="date"
            value={state.installment.date || ""}
            onChange={handleInstallmentChange}
          />

        <label >Receipt no</label>
            <NumericFormat
            name="receiptNo"
            value={state.installment.receiptNo}
            onChange={handleInstallmentChange}
            autoComplete="off"
            />

        <label> Received Amount: </label>
          <input
            type="text"
            name="receivedAmount"
            value={state.installment.receivedAmount || ""}
            onChange={handleInstallmentChange}
          />

        <button type="button" onClick={handleAddInstallment}>
          {editIndex !== null ? "Update Installment" : "Add Installment"}
        </button>
      </div>

      <div className="installments-list">
        {state.installments.map((inst, index) => (
          <div key={index} className="installment-item">
            <span>{`Date: ${inst.date}, Amount: ${inst.receivedAmount}`}</span>
            <button type="button" onClick={() => handleEditInstallment(index)}>
              Edit
            </button>
            <button type="button" onClick={() => handleRemoveInstallment(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Installment;
