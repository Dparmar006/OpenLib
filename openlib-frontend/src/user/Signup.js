import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../auth/helper";
import Base from "../core/commonComponents/Base";

// NOTE: firstName -> first_name, lastName -> last_name, because django Abstract user model

function Signup() {
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    error: "",
    success: false,
  });

  useEffect(() => {
    setUserInfo(userInfo);
  });
  const {
    first_name,
    last_name,
    phone,
    email,
    gender,
    password,
    confirmPassword,
    error,
    success,
  } = userInfo;

  const handleChange = (name) => (event) => {
    setUserInfo({ ...userInfo, [name]: event.target.value });
    console.log(userInfo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setUserInfo({ ...userInfo, error: false });
    signUp({
      first_name,
      last_name,
      phone,
      email,
      gender,
      password,
      confirmPassword,
    })
      .then((data) => {
        if (data.email == email) {
          setUserInfo({
            ...userInfo,
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            gender: "",
            password: "",
            confirmPassword: "",

            error: "",
            success: true,
          });
        } else {
          setUserInfo({
            ...userInfo,
            error: true,
            success: false,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const successMessage = () => {
    return (
      <div>
        <div style={{ display: success ? "block" : "none" }}>
          <p>
            Account created successfully,
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
        <div className="container mt-5">
          <div className="col-lg-6">
            <blockquote className="generic-blockquote">
              <div style={{ display: error ? "block" : "none" }}>
                <p>
                  Account already exist,
                  <Link to="/signin" className="genric-btn link m-2">
                    click here to SignIn
                  </Link>
                </p>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base pageTitle="Sign Up" pageDescription="Enter your details with email">
      {/* TODO: remove the quoteblock error message blank */}
      {successMessage()}
      {errorMessage()}
      <div className="container m-10">
        <form action="">
          <div className="row">
            <div className="col-lg-3 col-md-4 mt-sm-30">
              <div className="mt-10">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={first_name}
                  onChange={handleChange("first_name")}
                  required
                  className="single-input"
                />
              </div>
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
              <div className="mt-10">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="single-input"
                  required
                  value={password}
                  onChange={handleChange("password")}
                />
              </div>
              <div className="single-element-widget mt-30">
                <h3 className="mb-30">Gender</h3>
                <div className="default-select" id="default-select">
                  <select
                    className="nice-select"
                    onChange={handleChange("gender")}
                    value={gender}
                  >
                    <option value="">Prefer not to say</option>
                    <option value="Other">Other</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 mt-sm-30">
              <div className="single-element-widget">
                <div className="mt-10">
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    required
                    className="single-input"
                    onChange={handleChange("last_name")}
                    value={last_name}
                  />
                </div>
                <div className="mt-10">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number (Optional)"
                    className="single-input"
                    onChange={handleChange("phone")}
                    value={phone}
                  />
                </div>
                <div className="mt-10">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="single-input"
                    required
                    onChange={handleChange("confirmPassword")}
                    value={confirmPassword}
                  />
                </div>
                <div className="single-element-widget mt-30">
                  <h3 className="mb-30">I am a...</h3>
                  <div className="default-select" id="default-select">
                    <select className="nice-select">
                      <option value="student" selected>
                        Student
                      </option>
                      <option value="teacher">Teacher</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className="mt-5">
            <button
              href="#"
              className="genric-btn info radius"
              onClick={handleSubmit}
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
}

export default Signup;
