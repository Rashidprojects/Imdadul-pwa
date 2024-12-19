import { createContext, useReducer, useContext, useEffect } from 'react';
import { fetchFundData, deleteFundData } from '../services/firestoreService';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const initialState = {
  users: [],
  currentData: [],
  loading: false,
  error: null,
  editingUser: null, // Add the editingUser state here
};

const FETCH_USERS = 'FETCH_USERS';
const CURRENT_DATA = 'CURRENT_DATA'; 
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const DELETE_USER = 'DELETE_USER';
const SET_EDITING_USER = 'SET_EDITING_USER'; // Add action type for editing user

const userReducer = (state, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload, loading: false };
    case CURRENT_DATA:
      return { ...state, currentData: action.payload }
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };      
    case SET_EDITING_USER: // Handle the editing user state
      return { ...state, editingUser: action.payload };
    default:
      return state;
  }
};

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const isOnline = useOnlineStatus()

  const fetchUsers = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const users = await fetchFundData();
      dispatch({ type: FETCH_USERS, payload: users });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.message });
    }
  };

  useEffect(() => {
    if (state.users.length === 0 || isOnline) {
      fetchUsers();  // Fetch data only if `users` is empty (initial load)
    }
  }, [state.users.length, isOnline, ]); 


  const deleteUser = async (id) => {
    try {
      await deleteFundData(id); // Firestore delete method
      
      // Dispatch the delete action to update the state
      dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.message });
    }
  };

  const setEditingUser = (user) => {
    dispatch({ type: SET_EDITING_USER, payload: user }); // Dispatch the action to set the editing user
  };

  return (
    <UserDataContext.Provider
      value={{ state, dispatch, fetchUsers, deleteUser, setEditingUser }} // Add setEditingUser to the context
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserContext = () => useContext(UserDataContext);