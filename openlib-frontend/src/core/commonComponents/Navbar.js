import React from "react";

export default function Navbar() {
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
                    <a href="index.html">
                      <h1>OpenLibrary</h1>
                    </a>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10">
                  <div className="menu-wrapper d-flex align-items-center justify-content-end">
                    {/* <!-- Main-menu --> */}
                    <div className="main-menu d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li>
                            <a href="index.html">Home</a>
                          </li>
                          <li>
                            <a href="about.html">About Us</a>
                          </li>
                          <li>
                            <a href="contactus.html">Contact Us</a>
                          </li>

                          <li>
                            <a href="login.html">Log in</a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    {/* <!-- Header-btn --> */}
                    <div className="header-right-btn d-none d-lg-block ml-65">
                      <a href="register.html" className="border-btn">
                        Sign Up
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- Mobile Menu --> */}
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}
    </header>
  );
}
