import React, { useState } from "react";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import "./../../Styles/components/transactionTabs.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addTransfer } from "../../Redux/Actions/TransferAction";
import { logout, updateUserProfile } from "../../Redux/Actions/UserAction";
import { Link } from "react-router-dom";

const Transactions = (props) => {
  window.scrollTo(0, 0);

  const { loading, error, userInfo } = props;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(Number);
  const [purposeOfPayment, setPurposeOfPayment] = useState("");
  const initialState = "";

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const user = userDetails;
  //const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  //const { loading: updateLoading } = userUpdateProfile;

  const handleLogout = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addTransfer(name, address, city, accountNumber, amount, purposeOfPayment)
    );
    dispatch(updateUserProfile({ id: user._id, amount }));
    setName(initialState);
    setAddress(initialState);
    setCity(initialState);
    setAccountNumber(initialState);
    setAmount(initialState);
    setPurposeOfPayment(initialState);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="mt-4 m-lg-5 m-sm-3">
            <div className="row logout">
              <Link className="btn-logout" to="/" onClick={handleLogout}>
                LOGOUT
              </Link>
              <FontAwesomeIcon
                className="icon"
                icon={faPowerOff}
              ></FontAwesomeIcon>
            </div>
            <form onSubmit={submitHandler}>
              <div className="row align-items-start mb-5 d-flex gx-4">
                <div className="col-lg-6 col-md-12 align-items-start">
                  <div className="widget-inner">
                    <label className="label-1">Source account</label>
                    <div className="acc-container">
                      <p className="title-main">Current account of citizen</p>
                      <p className="acc-num">
                        account number: {userInfo.accountNumber}
                      </p>
                    </div>
                  </div>
                  <div className="custom-table">
                    <div className="accountInfo d-block">
                      <div className="row ">
                        <div className="col-6">
                          <p className="balance">Balance:</p>
                        </div>
                        <div className="col-6">
                          <p className="balance-num">
                            $
                            {userInfo.balance.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-6">
                          <p className="balance">Available balance:</p>
                        </div>
                        <div className="col-6">
                          <p className="balance-num">
                            $
                            {(userInfo.balance + 1000).toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 2,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 align-items-start">
                  <div className="row group ">
                    <div className="group-inner">
                      <label className="label-1">Name</label>
                      <input
                        type="text"
                        data-val="true"
                        placeholder={userInfo.name}
                      />
                    </div>
                  </div>
                  <div className="row group ">
                    <div className="group-inner col-8">
                      <label className="label-1">Address</label>
                      <input
                        type="text"
                        data-val="true"
                        placeholder={userInfo.address}
                      />
                    </div>
                    <div className="group-inner col-4 pl-1">
                      <label className="label-1">City</label>
                      <input
                        type="text"
                        data-val="true"
                        placeholder={userInfo.city}
                      />
                    </div>
                  </div>
                  <div className="row group ">
                    <div className="group-inner">
                      <label className="label-1">Purpose of payment</label>
                      <textarea
                        className="input-acc"
                        type="text"
                        value={purposeOfPayment}
                        onChange={(e) => {
                          setPurposeOfPayment(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-start mb-5 d-flex gx-4">
                <div className="col-lg-6 col-md-12 align-items-start ">
                  <div className="widget-inner">
                    <label className="label-1">Destination account</label>
                    <div className="acc-container">
                      <p className="title-main">Choose a template</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 align-items-start">
                  <div className="row group">
                    <div className="group-inner">
                      <label className="label-1">Name:</label>
                      <input
                        className="input-acc"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row group">
                    <div className="group-inner">
                      <label className="label-1">Address:</label>
                      <input
                        className="input-acc"
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row group">
                    <div className="group-inner">
                      <label className="label-1">City:</label>
                      <input
                        className="input-acc"
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row group">
                    <div className="group-inner">
                      <label className="label-1">Account Number:</label>
                      <input
                        className="input-acc"
                        type="number"
                        name="accountNumber"
                        value={accountNumber}
                        onChange={(e) => {
                          setAccountNumber(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row group">
                    <div className="group-inner">
                      <label className="label-1">Amount:</label>
                      <input
                        className="input-acc"
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <button className="btn-1 col-2 " type="submit">
                  Transfer
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
