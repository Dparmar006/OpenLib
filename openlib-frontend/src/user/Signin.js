import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  checkAuthenticationToken,
  saveAuthToken,
  signIn,
} from "../auth/helper";
import Base from "../core/commonComponents/Base";

const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",

    msg: null,
    error: false,
    success: false,
    loading: false,
    didRedirect: false,
  });

  const successMessage = () => {
    return (
      <div>
        <div style={{ display: success ? "block" : "none" }}>
          <p>
            {msg}
            <Link to="/signin" className="genric-btn link m-2">
              click here to SignIn
            </Link>
          </p>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div>
        <div style={{ display: error ? "block" : "none" }}>
          <p>{msg}</p>
        </div>
      </div>
    );
  };
  const loadingMessage = () => {
    return (
      <div>
        <div style={{ display: loading ? "block" : "none" }}>
          <p>Loading, Please wait</p>
        </div>
      </div>
    );
  };
  const {
    email,
    password,
    error,
    success,
    msg,
    loading,
    didRedirect,
  } = userInfo;
  const handleChange = (name) => (event) => {
    setUserInfo({ ...userInfo, [name]: event.target.value });
    console.table(userInfo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setUserInfo({
      ...userInfo,
      error: false,
      loading: true,
    });

    console.log(userInfo, "in signin call");
    signIn({ email, password })
      .then((data) => {
        if (data.token) {
          saveAuthToken(data, () => {
            setUserInfo({
              ...userInfo,
              msg: data.msg,
              didRedirect: true,
              loading: true,
              success: true,
            });
          });
        } else {
          setUserInfo({
            ...userInfo,
            msg: data.msg,
            error: true,
            loading: false,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  //TODO:can check if backendToken === frontendToken
  //FIXME: after signing up, page not loading immediately
  const perfomRedirect = () => {
    if (checkAuthenticationToken()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Base pageTitle="Sign In" pageDescription="Enter your email and password">
      <div className="container mt-5">
        <div className="col-lg-6">
          <blockquote className="generic-blockquote">
            {successMessage()}
            {errorMessage()}
            {loadingMessage()}
          </blockquote>
        </div>
      </div>

      <div className="container m-10">
        <form action="">
          <div className="row">
            <div className="col-lg-3 col-md-4 mt-sm-30">
              <div className="mt-10">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="single-input"
                  value={email}
                  onChange={handleChange("email")}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4 mt-sm-30">
              <div className="single-element-widget">
                <div className="mt-10">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="single-input"
                    required
                    onChange={handleChange("password")}
                    value={password}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className="mt-5">
            <button
              href="#"
              type="submit"
              className="genric-btn info radius"
              onClick={handleSubmit}
            >
              Signin
            </button>
          </div>
        </form>
      </div>
      {perfomRedirect()}
    </Base>
  );
};

export default Signin;
