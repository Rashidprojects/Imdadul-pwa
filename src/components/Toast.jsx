import { useContext } from 'react';
import { ToastContext } from '../lib/providers/ToastContext';

// Dynamically assign class based on the variant
const getToastClass = (variant) => {
  switch (variant) {
    case 'success':
      return 'bg-success text-white';  // Green background for success
    case 'error':
      return 'bg-red-500 text-white';    // Red background for error
    case 'warning':
      return 'bg-yellow-500 text-black'; // Yellow background for warning
    default:
      return 'bg-green-500 text-white';  // Default to success
  }
};

function Toast() {
  const { state, dispatch } = useContext(ToastContext)
  console.log('Toast state is : ', state);
  

  return (
    <div >
      {state?.length > 0 && state.map((toast, index) => (
        <>
            <div
            key={index}
            className={`fixed sm:right-2 sm:bottom-4 ml-2 mt-2 sm:mt-0 sm:ml-0 p-3 sm:p-4 rounded-md sm:rounded-lg shadow-md w-[300px] sm:w-[400px] font-semibold z-30  sm:text-[20px] ${getToastClass(toast.variant)}`}
            >
            <span>{toast.message}</span>
            
            </div>
            
        </>
      ))}
    </div>
  );
}

export default Toast;

