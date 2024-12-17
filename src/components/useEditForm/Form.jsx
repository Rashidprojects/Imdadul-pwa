import { useEditForm } from "../../lib/hooks/useEditForm";
import { useUserContext } from "../../lib/providers/UserDataContext";
import Installment from "./Installment";

const Form = () => {
    const { state: userState } = useUserContext();

    const initialData = userState.editingUser

    const {
        state,
        handlers: {
          handleFieldChange,
          handleSubmit,
        },
      } = useEditForm(initialData);
  return (
    <div className="form-section">
      <form>
        <label>
            Username:
            <input
            type="text"
            name="username"
            value={state.username || ""}
            onChange={handleFieldChange}
            />
        </label>

        <label>
            House Number:
            <input
            type="text"
            name="houseNumber"
            value={state.houseNumber || ""}
            onChange={handleFieldChange}
            />
        </label>

        <label>
            Area Code:
            <input
            type="text"
            name="areaCode"
            value={state.areaCode || ""}
            onChange={handleFieldChange}
            />
        </label>

        <label>
            Total Amount:
            <input
            type="text"
            name="totalAmount"
            value={state.totalAmount || ""}
            onChange={handleFieldChange}
            />
        </label>

        <Installment />

        <button type="submit" onClick={handleSubmit}>Sbmit Data</button>
      </form>
    </div>
  );
};

export default Form;
