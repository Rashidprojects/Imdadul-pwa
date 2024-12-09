import { createContext, useContext, useEffect, useReducer } from "react";

// Initial state for the toast messages
const initialState = [];

// Reducer to manage toast actions
const toastReducer = (state, action) => {
  console.log('Reducer Action:', action); // Debugging logs
  console.log('Reducer State Before:', state);

  switch (action.type) {
    case 'SHOW_TOAST':
      return [{ message: action.payload.message, variant: action.payload.variant }];
    case 'REMOVE_TOAST':
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

// Create Toast context
export const ToastContext = createContext();

// Toast Provider to wrap around the application
export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  useEffect(() => {
    if (state?.length > 0) {
        const timeout = setTimeout(() => {
            dispatch({ type: 'REMOVE_TOAST', payload: 0 });
        }, 3000);

        return () => clearTimeout(timeout);
    }
  }, [state])

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to consume ToastContext
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { state, dispatch } = context;

  // Utility to show toast
  const showToast = (message, variant) => {
    dispatch(...state,{ type: 'SHOW_TOAST', payload: { message, variant } });

    // Automatically remove the first toast after 3 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: 0 });
    }, 3000);
  };

  return {
    toasts: state,
    showToast,
    dispatch, // Expose dispatch for direct use cases
  };
};
