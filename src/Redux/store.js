import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reducers/UserReducers";
import {
  transactionCreateReducer,
  transactionDetailsReducer,
  transactionListMyReducer,
} from "./Reducers/TransactionReducers";
import {
  transferReducer,
  userUpdateTransferReducer,
} from "./Reducers/TransferReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  transactionCreate: transactionCreateReducer,
  transactionDetails: transactionDetailsReducer,
  transactionListMy: transactionListMyReducer,
  userUpdateTransfer: userUpdateTransferReducer,
  transfer: transferReducer,
});

// LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// TRANSFER
const transferFromLocalStorage = localStorage.getItem("transactionList")
  ? JSON.parse(localStorage.getItem("transactionList"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromLocalStorage,
    transferInfo: transferFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
