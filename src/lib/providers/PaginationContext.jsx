import { createContext, useReducer, useContext, useEffect } from 'react';

// Initial state for pagination
const initialState = {
  currentPage: 1,
  itemsPerPage: 5,
  totalItems: 0,
};

// Actions
const SET_PAGE = 'SET_PAGE';
const SET_ITEMS_PER_PAGE = 'SET_ITEMS_PER_PAGE';
const SET_TOTAL_ITEMS = 'SET_TOTAL_ITEMS';

// Reducer function to update state
const paginationReducer = (state, action) => {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_ITEMS_PER_PAGE:
      return { ...state, itemsPerPage: action.payload, currentPage: 1 }; // reset to first page
    case SET_TOTAL_ITEMS:
      return { ...state, totalItems: action.payload };
    default:
      return state;
  }
};

// Create context
const PaginationContext = createContext();

// Custom hook to use the Pagination context
export const usePagination = () => {
  return useContext(PaginationContext);
};

// Helper to load state from localStorage
const loadState = () => {
  const storedState = localStorage.getItem('paginationState');
  return storedState ? JSON.parse(storedState) : initialState;
};

// Provider component
export const PaginationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paginationReducer, loadState());

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('paginationState', JSON.stringify(state));
  }, [state]);

  const setPage = (page) => {
    dispatch({ type: SET_PAGE, payload: page });
  };

  const setItemsPerPage = (items) => {
    dispatch({ type: SET_ITEMS_PER_PAGE, payload: items });
  };

  const setTotalItems = (total) => {
    dispatch({ type: SET_TOTAL_ITEMS, payload: total });
  };

  return (
    <PaginationContext.Provider value={{ state, setPage, setItemsPerPage, setTotalItems }}>
      {children}
    </PaginationContext.Provider>
  );
};
