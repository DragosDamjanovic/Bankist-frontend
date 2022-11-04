import React from "react";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
//import { Link } from "react-router-dom";
import moment from "moment";
import "./../../Styles/components/homeTabs.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronRight,
  faChevronRight,
  faArrowDownLong,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../Redux/Actions/UserAction";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const HomeTabs = (props) => {
  window.scrollTo(0, 0);

  const { loading, error, transactions, userInfo } = props;

  const latestTransactions = transactions; //.slice(0, 5);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="mt-4 m-lg-5 m-md-5 m-sm-5">
            <div className="row logout">
              <Link className="btn-logout" to="/" onClick={handleLogout}>
                LOGOUT
              </Link>
              <FontAwesomeIcon
                className="icon"
                icon={faPowerOff}
              ></FontAwesomeIcon>
            </div>
            <div className="row align-items-start mb-5">
              <div className="col-lg-5 col-md-12 col-sm-12 mb-md-3 mb-sm-4 account">
                <p className="acc-title">Citizen current account</p>
                <p className="acc-num">
                  account number: {userInfo.accountNumber}
                </p>
              </div>
              <div className="col-lg-6 col-md-8 col-sm-8 balance">
                <div className="balance-widget">
                  <p className="available-balance">
                    <span>available balance:</span>
                    <br />$
                    {(userInfo.balance + 1000).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <p className="current-balance">
                    <span>Balance:</span>
                    <br />$
                    {userInfo.balance.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
              <div className="col-lg-1 col-md-4 col-sm-4 details">
                <a href="/">
                  <FontAwesomeIcon
                    className="btn-details"
                    icon={faCircleChevronRight}
                  ></FontAwesomeIcon>
                </a>
              </div>
            </div>
            <div className="costum-table">
              <div className="table-header row">
                <div className="col-lg-2 col-sm-3">
                  <p className="sorter-date">
                    Date
                    <FontAwesomeIcon
                      className="icon"
                      icon={faCircleChevronRight}
                    ></FontAwesomeIcon>
                  </p>
                </div>
                <div className="col-lg-8 col-sm-6">
                  <p>Description</p>
                </div>
                <div className="col-lg-2 col-sm-3">
                  <p className="sorter-date">
                    Amount
                    <FontAwesomeIcon
                      className="icon"
                      icon={faCircleChevronRight}
                    ></FontAwesomeIcon>
                  </p>
                </div>
              </div>
              {transactions.length === 0 ? (
                <div className="row alert alert-info text-center">
                  No transactions
                </div>
              ) : (
                <>
                  {latestTransactions.map((transaction, index) => (
                    <div className="table-row row" key={transaction._id}>
                      <div className="col-lg-2 col-sm-3 data">
                        <FontAwesomeIcon
                          className="move-down"
                          icon={faArrowDownLong}
                        ></FontAwesomeIcon>
                        <p>
                          {moment(transaction.createdAt).format("MM.DD.YYYY")}
                        </p>
                      </div>
                      <div className="col-lg-7 col-sm-6 data">
                        <p>{transaction.purposeOfPayment}</p>
                      </div>
                      <div className="col-lg-2 col-sm-2 data amount">
                        <p>${transaction.amount}</p>
                        <div
                          className="btn"
                          type="button"
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          <FontAwesomeIcon
                            className="btn-row-details"
                            icon={faChevronRight}
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <button
              id="v-pills-list-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-list"
              type="button"
              role="tab"
              aria-controls="v-pills-list"
              aria-selected="false"
            >
              All transactions
            </button>

            {/*Modal*/}
            <div
              className="modal right fade"
              id="myModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <p className="modal-title" id="myModalLabel">
                      Transaction details
                    </p>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="costum-table">
                      <div className="row">
                        <div className="col-6">Transaction ID:</div>
                        <div className="col-6">64564646545645</div>
                      </div>
                      <div className="row">
                        <div className="col-6"></div>
                        <div className="col-6"></div>
                      </div>
                      <div className="row">
                        <div className="col-6"></div>
                        <div className="col-6"></div>
                      </div>
                      <div className="row">
                        <div className="col-6"></div>
                        <div className="col-6"></div>
                      </div>
                      <div className="row">
                        <div className="col-6"></div>
                        <div className="col-6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeTabs;
