import { createContext, useReducer, useContext } from 'react';

const initialState = {
  username: '',
  houseNumber: '',
  areaCode: 'default',
  address: '',
  mobile: '',
  totalAmount: '',
  totalReceived: '',
  pending: '',
  installments: [],
  installment: { name: '', date: '', receiptNo: '', receivedAmount: '' },
  extraUsers: [],
  extraUser: { name: '', date: '', relation: '', receivedAmount: '' },
  subTotal: '',
  isInstallment: false,
  isExtraUser: false,
  isLoading: false,
  error: null,
};

const SET_FIELD = 'SET_FIELD';
const SET_INSTALLMENT = 'SET_INSTALLMENT';
const ADD_INSTALLMENT = 'ADD_INSTALLMENT';
const EDIT_INSTALLMENT = 'EDIT_INSTALLMENT';
const REMOVE_INSTALLMENT = 'REMOVE_INSTALLMENT';
const SET_EXTRAUSER = 'SET_EXTRAUSER';
const ADD_EXTRAUSER = 'ADD_EXTRAUSER';
const EDIT_EXTRAUSER = 'EDIT_EXTRAUSER';
const REMOVE_EXTRAUSER = 'REMOVE_EXTRAUSER';
const SET_IS_INSTALLMENT = 'SET_IS_INSTALLMENT';
const SET_IS_EXTRAUSER = 'SET_IS_EXTRAUSER';
const RESET_FORM = 'RESET_FORM';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

const formContextReducer = (state, action) => {
  switch (action.type) {
    case SET_FIELD:
      return { ...state, [action.field]: action.value };
    case SET_INSTALLMENT:
      return { ...state, installment: { ...state.installment, [action.name]: action.value } };
    case ADD_INSTALLMENT:
      return {
        ...state,
        installments: [...state.installments, state.installment],
        installment: { name: '', date: '', receiptNo: '', receivedAmount: '' },
      };
    case EDIT_INSTALLMENT:
      return {
        ...state,
        installment: state.installments[action.index],
        installments: state.installments.filter((_, i) => i !== action.index),
      };
    case REMOVE_INSTALLMENT:
      return {
        ...state,
        installments: state.installments.filter((_, i) => i !== action.index )
      };
    case SET_EXTRAUSER:
      return { ...state, extraUser: { ...state.extraUser, [action.name]: action.value } };
    case ADD_EXTRAUSER:
      return {
        ...state,
        extraUsers: [...state.extraUsers, state.extraUser],
        extraUser: { name: '', date: '', relation: '', receivedAmount: '' },
      };
    case EDIT_EXTRAUSER:
      return {
        ...state,
        extraUser: state.extraUsers[action.index],
        extraUsers: state.extraUsers.filter((_, i) => i !== action.index),
      };
    case REMOVE_EXTRAUSER:
      return {
        ...state,
        extraUsers: state.extraUsers.filter((_, i) => i !== action.index ),
      }
    case SET_IS_INSTALLMENT:
      return { ...state, isInstallment: action.value };
    case SET_IS_EXTRAUSER:
      return { ...state, isExtraUser: action.value };
    case RESET_FORM:
      return initialState;
    case SET_LOADING:
      return { ...state, isLoading: action.value };
    case SET_ERROR:
      return { ...state, error: action.value };
    default:
      return state;
  }
};

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formContextReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
