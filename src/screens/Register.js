import React, { useEffect, useState } from "react";
import Slider from "../components/homeComponents/Slider";
import "../Styles/pages/register.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";
import { register } from "../Redux/Actions/UserAction";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, address, city));
  };

  return (
    <>
      <div className="register-page">
        <div className="main-content m-0">
          <Slider />
          <div className="register-content m-0">
            <div className="register-bg">
              <div className="register-box">
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}
                <div className="register-box-1">
                  <img className="logo" src="img/logo.png" alt="4545" />
                  <h2>
                    Welcome to your bank.
                    <br />
                    <strong>Menage your money the easy way.</strong>
                  </h2>
                  <form className="register-form" onSubmit={submitHandler}>
                    <div className="group">
                      <div className="group-inner">
                        <label className="label-1">Name</label>
                        <input
                          className="input-2 input-icon icon-user-1"
                          type="name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="group">
                      <div className="group-inner">
                        <label className="label-1">Email</label>
                        <input
                          className="input-2 input-icon icon-user-1"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="group">
                      <div className="group-inner">
                        <label className="label-1">Password</label>
                        <input
                          className="input-2 input-icon icon-lock-1"
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="group">
                      <div className="group-inner">
                        <label className="label-1">Address</label>
                        <input
                          className="input-2 input-icon icon-user-1"
                          type="text"
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="group">
                      <div className="group-inner">
                        <label className="label-1">City</label>
                        <input
                          className="input-2 input-icon icon-user-1"
                          type="text"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="group-submit">
                      <div className="group-inner">
                        <button
                          type="submit"
                          className="btn-1 color-1 register-submit-btn"
                        >
                          Register{" "}
                          <FontAwesomeIcon
                            className="right-arrow"
                            icon={faChevronRight}
                          ></FontAwesomeIcon>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="register-down">
                <div className="col-left">
                  <Link className="register-btn" to="/">
                    Create Account
                  </Link>
                  <a className="help-link" href="/">
                    Bankist Online Banking
                  </a>
                  <a className="help-link" href="/">
                    General rules
                  </a>
                </div>
                <div className="col-right">
                  <a className="mail" href="mailto:dragos.damjanovic@gmail.com">
                    dragos.damjanovic@gmail.com
                  </a>
                  <p>Dragoš Damjanović @Copyright. All Rights Reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
