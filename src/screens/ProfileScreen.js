import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import { listMyTransactions } from "../Redux/Actions/TransactionAction";
import { getUserDetails } from "../Redux/Actions/UserAction";
//import { moment } from "moment";
import "../Styles/pages/profile.scss";
import TransactionList from "../components/profileComponents/TransactionList";
import Transactions from "../components/profileComponents/Transactions";
import HomeTabs from "../components/profileComponents/HomeTabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCoins,
  faWallet,
  faMoneyBillTransfer,
  faMemory,
  faGear,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const ProfileScreen = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const transactionListMy = useSelector((state) => state.transactionListMy);
  const { loading, error, transactions } = transactionListMy;

  const toggleOpen = () => {
    const el = document.getElementById("mySidenav");

    if (el.className === "sidenav") {
      el.className += " responsive";
    } else {
      el.className = "sidenav";
    }
  };

  const toggleClose = () => {
    const el = document.getElementById("mySidenav");

    if (el.className === "sidenav responsive") {
      el.className = "sidenav";
    } else {
      el.className = "sidenav";
    }
  };

  useEffect(() => {
    dispatch(listMyTransactions());
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  return (
    <>
      <div className="cont">
        <div className="sidenav" id="mySidenav">
          <div className="logo-card pb-md-3">
            <img src="./img/logo.png" alt="logo" />
          </div>
          <div className="menu-button" onClick={toggleOpen}>
            <FontAwesomeIcon className="xmark" icon={faXmark}></FontAwesomeIcon>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="author-card">
            <img src="./../../img/user-1.jpg" alt="userprofileimage" />
            <p className="login-name-tag">
              <span>Welcome,</span>
              <br />
              {userInfo.name}
            </p>

            <div
              className="login-settings nav-pills"
              id="v-pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-profile"
              type="button"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="false"
            >
              <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            </div>
          </div>
          <div className="wizard pt-3">
            <ul className="navigation">
              <div className="costomScrollbar">
                <div
                  className="nav align-items-start flex-column col-12 nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                  onClick={toggleClose}
                >
                  <li
                    className="nav-link"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <div className="circle">
                      <FontAwesomeIcon
                        className="icons house"
                        icon={faHouse}
                      ></FontAwesomeIcon>
                    </div>
                    <p>Home</p>
                  </li>
                  <li
                    className="nav-link"
                    id="v-pills-list-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-list"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-list"
                    aria-selected="false"
                  >
                    <div className="circle">
                      <FontAwesomeIcon
                        className="icons coins"
                        icon={faCoins}
                      ></FontAwesomeIcon>
                    </div>

                    <p>Transaction List</p>
                  </li>
                  <li
                    className="nav-link"
                    id="v-pills-transactions-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-transactions"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-transactions"
                    aria-selected="false"
                  >
                    <div className="circle">
                      <FontAwesomeIcon
                        className="icons wallet"
                        icon={faWallet}
                      ></FontAwesomeIcon>
                    </div>

                    <p>Paying</p>
                  </li>
                  <li
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <div className="circle">
                      <FontAwesomeIcon
                        className="icons mony"
                        icon={faMoneyBillTransfer}
                      ></FontAwesomeIcon>
                    </div>

                    <p>Internal Transfers</p>
                  </li>
                  <li
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <div className="circle">
                      <FontAwesomeIcon
                        className="icons memory"
                        icon={faMemory}
                      ></FontAwesomeIcon>
                    </div>
                    <p>Online Requests</p>
                  </li>
                </div>
                <div className="scrollbar">
                  <div className="dragger-container">
                    <div className="dragger-vertical">
                      <div className="dragger-bar"></div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>

        {/* panels */}
        <div
          className="tab-content"
          id="v-pills-tabContent"
          onClick={toggleClose}
        >
          <div
            className="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <HomeTabs
              userInfo={userInfo}
              transactions={transactions}
              loading={loading}
              error={error}
            />
          </div>
          <div
            className="tab-pane fade show"
            id="v-pills-list"
            role="tabpanel"
            aria-labelledby="v-pills-list-tab"
          >
            <TransactionList
              userInfo={userInfo}
              transactions={transactions}
              loading={loading}
              error={error}
            />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-transactions"
            role="tabpanel"
            aria-labelledby="v-pills-transactions-tab"
          >
            <Transactions loading={loading} error={error} userInfo={userInfo} />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <ProfileTabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
