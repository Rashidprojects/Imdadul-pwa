import { useState, useContext } from "react";
import { loginWithEmailAndPassword } from "../services/authService";
import { fetchUserUidByUsername, fetchUserEmailByUid } from "../services/userService";
import { ToastContext } from "../providers/ToastContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/SigninContext";

export const useLogin = (username, password) => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { dispatch } = useContext(ToastContext); // Access dispatch from context

  const handleLogin = async () => {
    try {
      setError(''); // Reset error state

      // Step 1: Fetch the UID based on the username
      const userId = await fetchUserUidByUsername(username);
    

      if (!userId) {
        setError('Username not found');
        dispatch({
          type: 'SHOW_TOAST',
          payload: { message: 'Username not found', variant: 'error' }
        }); // Dispatch error toast for incorrect username
        return;
      }

      // Step 2: Fetch the email using the UID
      const fetchedEmail = await fetchUserEmailByUid(userId);

      if (!fetchedEmail) {
        setError('Error fetching user email');
        dispatch({
          type: 'SHOW_TOAST',
          payload: { message: 'Error fetching user email', variant: 'error' }
        }); // Dispatch error toast for failed email fetch
        return;
      }

      // Step 3: Authenticate the user with the fetched email and provided password
      try {
        await loginWithEmailAndPassword(fetchedEmail, password);
      } catch (err) {
        if (err.message === 'Firebase: Error (auth/invalid-credential).') {
          setError('Incorrect password. Please try again.');
          dispatch({
            type: 'SHOW_TOAST',
            payload: { message: 'Incorrect password. Please try again.', variant: 'error' }
          }); // Dispatch error toast for incorrect password
        } else {
          setError(err.message);
          dispatch({
            type: 'SHOW_TOAST',
            payload: { message: 'An error occurred. Please try again.', variant: 'error' }
          }); // Dispatch generic error toast for any other error
        }
        return;
      }

      login();
      navigate('/');

      dispatch({
        type: 'SHOW_TOAST',
        payload: { message: 'Welcome to the Admin Dashboard!', variant: 'success' }
      }); // Dispatch success toast for successful login

      // Set lastLoginTime in localStorage to current timestamp (in milliseconds)
      const currentTime = Date.now();
      localStorage.setItem("lastLoginTime", currentTime);

      console.log('User logged in successfully');
      
    } catch (err) {
      setError(err.message);
      dispatch({
        type: 'SHOW_TOAST',
        payload: { message: err.message, variant: 'error' }
      }); // Dispatch generic error toast if something goes wrong
      console.error(err); // Log error for debugging
    }
  };

  return { error, handleLogin };
};
