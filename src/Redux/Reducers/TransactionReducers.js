import {
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_RESET,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_LIST_MY_FAIL,
  TRANSACTION_LIST_MY_REQUEST,
  TRANSACTION_LIST_MY_RESET,
  TRANSACTION_LIST_MY_SUCCESS,
  TRANSACTION_PAY_FAIL,
  TRANSACTION_PAY_REQUEST,
  TRANSACTION_PAY_RESET,
  TRANSACTION_PAY_SUCCESS,
} from "../Constants/TransactionConstants";

// CREATE TRANSACTION
export const transactionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { loading: true };
    case TRANSACTION_CREATE_SUCCESS:
      return { loading: false, success: true, transactions: action.payload };
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// TRANSACTION DETAILS
export const transactionDetailsReducer = (
  state = { loading: true, details: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_DETAILS_REQUEST:
      return { ...state, loading: true };
    case TRANSACTION_DETAILS_SUCCESS:
      return { loading: false, details: action.payload };
    case TRANSACTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// TRANSACTION PAY
export const transactionPayReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_PAY_REQUEST:
      return { loading: true };
    case TRANSACTION_PAY_SUCCESS:
      return { loading: false, success: true };
    case TRANSACTION_PAY_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_PAY_RESET:
      return {};
    default:
      return state;
  }
};

// USER TRANSACTION
export const transactionListMyReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_LIST_MY_REQUEST:
      return { loading: true };
    case TRANSACTION_LIST_MY_SUCCESS:
      return { loading: false, transactions: action.payload };
    case TRANSACTION_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_LIST_MY_RESET:
      return { transactions: [] };
    default:
      return state;
  }
};
