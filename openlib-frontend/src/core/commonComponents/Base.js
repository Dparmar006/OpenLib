import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Base = ({
  className = "our-services",
  children,
  pageTitle = "Welcome to OpenLib",
  showDefaultHeroSection = "true",
  pageDescription = "Find your dream book !",
}) => {
  return (
    <div>
      <div>
        <div id="preloader-active">
          <div className="preloader d-flex align-items-center justify-content-center">
            <div className="preloader-inner position-relative">
              <div className="preloader-circle"></div>
              <div className="preloader-img pere-text">
                <img src="assets/img/logo/loder.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
      {showDefaultHeroSection === "true" ? (
        <div className="slider-area2">
          <div className="single-slider slider-height3 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-9">
                  <div className="hero__caption hero__caption2">
                    <h1>{pageTitle}</h1>
                    <p>{pageDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <div className="container mt-10"> TODO: Add container around children*/}
      <div className={className}>{children}</div>
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default Base;
