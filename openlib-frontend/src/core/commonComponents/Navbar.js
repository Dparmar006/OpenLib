import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { checkAuthenticationToken, signOut } from "../../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { textDecoration: "underline" };
  } else {
    return { "": "" };
  }
};

const Navbar = ({ history, path }) => {
  return (
    <header>
      {/* <!-- Header Start --> */}
      <div className="header-area header-transparent">
        <div className="main-header">
          <div className="header-bottom header-sticky">
            <div className="container-fluid">
              <div className="row align-items-center">
                {/* <!-- Logo --> */}
                <div className="col-xl-2 col-lg-2">
                  <div className="logo">
                    <a href="/">
                      <div className="typography">
                        <h1 style={{ color: "white", fontWeight: "bold" }}>
                          OpenLib
                        </h1>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10">
                  <div className="menu-wrapper d-flex align-items-center justify-content-end">
                    {/* <!-- Main-menu --> */}
                    <div className="main-menu d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          {checkAuthenticationToken() && (
                            <li>
                              <a href="/" style={currentTab(history, "/")}>
                                Home
                              </a>
                            </li>
                          )}
                          {checkAuthenticationToken() && (
                            <li>
                              <a
                                href="/uploadBook"
                                style={currentTab(history, "/uploadBook")}
                              >
                                Upload Book
                              </a>
                            </li>
                          )}

                          {!checkAuthenticationToken() && (
                            <li>
                              <a
                                href="/signin"
                                style={currentTab(history, "/signin")}
                              >
                                Sign In
                              </a>
                            </li>
                          )}
                        </ul>
                      </nav>
                    </div>
                    {/* <!-- Header-btn --> */}
                    <div className="header-right-btn d-none d-lg-block ml-65">
                      {checkAuthenticationToken() === false ? (
                        <a href="/signup" className="border-btn">
                          Sign Up
                        </a>
                      ) : (
                        <a
                          onClick={() => {
                            signOut(<Redirect to="/signin" />);
                          }}
                          style={currentTab(history, "/signin")}
                          href="/signin"
                          className="border-btn"
                        >
                          Sign Out
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                {/* <!-- Mobile Menu --> */}
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}
    </header>
  );
};

export default withRouter(Navbar);
