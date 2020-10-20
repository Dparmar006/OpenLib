import React from "react";

function Card({ title, paragraph, buttonName }) {
  return (
    <div>
      <div className="col-lg-6">
        <div className="single-features single-features1 mb-40 pt-60">
          <div className="job-post-banner">
            <img src="assets/img/gallery/job-pos-banner1.png" alt="" />
          </div>
          <div className="features-caption">
            <h3>{title}</h3>
            <p>{paragraph}</p>
            <a href="#" className="border-btn">
              {buttonName}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
