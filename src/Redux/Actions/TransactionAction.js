import {
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_LIST_MY_FAIL,
  TRANSACTION_LIST_MY_REQUEST,
  TRANSACTION_LIST_MY_SUCCESS,
  TRANSACTION_PAY_FAIL,
  TRANSACTION_PAY_REQUEST,
  TRANSACTION_PAY_SUCCESS,
} from "../Constants/TransactionConstants";
import axios from "axios";
import { logout } from "./UserAction";
import { URL } from "../Url";

// CREATE TRANSACTION
export const createTransaction =
  (transaction) => async (dispatch, getState) => {
    try {
      dispatch({ type: TRANSACTION_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          "Access-Control-Allow-Origin": "https://developer.mozilla.org",
          Vary: "Origin",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${URL}/api/transactions`,
        transaction,
        config
      );
      dispatch({ type: TRANSACTION_CREATE_SUCCESS, payload: data });
      //dispatch({ type: CART_CLEAR_ITEMS, payload: data });

      //localStorage.removeItem("transactionItems");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: TRANSACTION_CREATE_FAIL,
        payload: message,
      });
    }
  };

// SINGLE TRANSACTION DETAILS
export const getTransactionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/api/transactions/${id}`, config);
    dispatch({ type: TRANSACTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      //dispatch(logout());
    }
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      payload: message,
    });
  }
};

// TRANSACTION PAY
export const payTransaction =
  (transactionId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: TRANSACTION_PAY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",

          "Access-Control-Allow-Origin": "https://developer.mozilla.org",
          Vary: "Origin",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${URL}/api/transactions/${transactionId}/pay`,
        paymentResult,
        config
      );
      dispatch({ type: TRANSACTION_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: TRANSACTION_PAY_FAIL,
        payload: message,
      });
    }
  };

// USER TRANSACTION
export const listMyTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        "Access-Control-Allow-Origin": "https://developer.mozilla.org",
        Vary: "Origin",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/api/transactions`, config);
    dispatch({ type: TRANSACTION_LIST_MY_SUCCESS, payload: data });
    localStorage.setItem("transactionList", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TRANSACTION_LIST_MY_FAIL,
      payload: message,
    });
  }
};
