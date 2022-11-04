import axios from "axios";
import {
  USER_UPDATE_TRANSFER_FAIL,
  USER_UPDATE_TRANSFER_SUCCESS,
  TRANSFER_ADD_FAIL,
  TRANSFER_ADD_REQUEST,
  TRANSFER_ADD_SUCCESS,
  USER_UPDATE_TRANSFER_REQUEST,
} from "../Constants/TransferConstants";
import { USER_LOGIN_SUCCESS } from "../Constants/UserConstants";
import { URL } from "../Url";
import { logout } from "./UserAction";

// ADD TRANSFER
export const addTransfer =
  (name, address, city, accountNumber, amount, purposeOfPayment) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TRANSFER_ADD_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,

          "Access-Control-Allow-Origin": "https://developer.mozilla.org",
          Vary: "Origin",
        },
      };
      const { data } = await axios.post(
        `${URL}/api/transactions`,
        { name, address, city, amount, accountNumber, purposeOfPayment },
        config
      );
      dispatch({ type: TRANSFER_ADD_SUCCESS, payload: data });
      localStorage.setItem("transactionItems", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: TRANSFER_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// UPDATE TRANSFER
export const updateTransfer = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_TRANSFER_REQUEST });

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

    const { data } = await axios.put(`${URL}/api/users/profile`, user, config);
    dispatch({ type: USER_UPDATE_TRANSFER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_TRANSFER_FAIL,
      payload: message,
    });
  }
};
