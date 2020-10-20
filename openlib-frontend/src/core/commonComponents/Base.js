import React from "react";
import CategoryCard from "./CategoryCard";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Base = ({ className = "our-services", children }) => {
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
      <div className={className}>{children}</div>
      <Footer />
    </div>
  );
};

export default Base;
