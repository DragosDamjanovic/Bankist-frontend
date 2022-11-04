import {
  TRANSFER_ADD_REQUEST,
  TRANSFER_ADD_SUCCESS,
  TRANSFER_ADD_FAIL,
  USER_UPDATE_TRANSFER_FAIL,
  USER_UPDATE_TRANSFER_REQUEST,
  USER_UPDATE_TRANSFER_SUCCESS,
} from "../Constants/TransferConstants";

export const transferReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSFER_ADD_REQUEST:
      return { loading: true };
    case TRANSFER_ADD_SUCCESS:
      return { loading: false, transactions: action.payload };
    case TRANSFER_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE TRANSFER
export const userUpdateTransferReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_TRANSFER_REQUEST:
      return { loading: true };
    case USER_UPDATE_TRANSFER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_TRANSFER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
