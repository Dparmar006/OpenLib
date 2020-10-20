import React from "react";

export default function CategoryCard({
  title,
  description,
  image,
  buttonText,
}) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div className="single-services">
        <div className="services-ion">
          <img src={image} alt="" />
        </div>
        <div className="services-cap">
          <h5>
            <a href="#">{title}</a>
          </h5>
          <p>{description}</p>
          <a href="#" className="more-btn">
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}
