import React from "react";

import Base from "./Base";
import Card from "./Card";
import CategoryCard from "./CategoryCard";
import FilterSection from "./FilterSection";

export default function Home() {
  return (
    <div>
      <Base>
        <FilterSection />
        <div className="row no-gutters">
          <CategoryCard
            title="Engineering"
            description="Irure sint non ad exercitation duis cupidatat pariatur aliqua."
            buttonText="Browse Books"
            image="assets/img/icon/services1.svg"
          />
          <CategoryCard
            title="Medical"
            description="Irure sint non ad exercitation duis cupidatat pariatur aliqua."
            buttonText="Browse Books"
            image="assets/img/icon/services2.svg"
          />
          <CategoryCard
            title="Philosophy"
            description="Irure sint non ad exercitation duis cupidatat pariatur aliqua."
            buttonText="Browse Books"
            image="assets/img/icon/services3.svg"
          />
        </div>

        <section className="our-services section-padding40">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-8">
                {/* <!-- Section Tittle --> */}
                <div className="section-tittle text-center mb-80">
                  <h2>Brows From Large Numbers Of Various Collections</h2>
                  <p>Browse the all the books available from API</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Our Services End --> */}
        {/* <!--? About Area Start--> */}
        {/* <!--  */}

        {/* <!-- About Area End--> */}
        {/* <!--? Top Jobs Start */}
        <section className="top-jobs section-padding40 fix">
          <div className="container-fluid p-0">
            <div className="row justify-content-center">
              <div className="col-xl-4 col-lg-7 col-md-9">
                {/* <!-- Section Tittle  */}
                <div className="section-tittle text-center mb-80">
                  <h2>Browse top jobs</h2>
                  <p>
                    the automated proocess has begun automated process starts as
                    soon as your clothes go into the machine. the automated
                    proocess has begun outcome is gleaming clothes. Placeholder
                    text commonly used.
                  </p>
                </div>
              </div>
            </div>
            <div className="top-job-slider">
              {/* <!-- Single -> */}
              <div className="single-top-jobs">
                <div className="services-ion">
                  <img src="assets/img/icon/jon-iocn1.svg" alt="" />
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="#">Design & creatives</a>
                  </h5>
                  <p>
                    the automated proocess has begun automated process starts as
                    soon as your clothes go into.
                  </p>
                  <a href="#" className="btn">
                    Apply Now
                  </a>
                </div>
                {/* <div className="stickers">
                  <span>Remote</span>
                </div> */}
              </div>
              {/* <!-- Single -- */}

              <div className="single-top-jobs">
                <div className="services-ion">
                  <img src="assets/img/icon/jon-iocn5.svg" alt="" />
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="#">Design & creatives</a>
                  </h5>
                  <p>
                    the automated proocess has begun automated process starts as
                    soon as your clothes go into.
                  </p>
                  <a href="#" className="btn">
                    Apply Now
                  </a>
                </div>
                <div className="stickers">
                  <span>Remote</span>
                </div>
              </div>
              {/* <!-- Single  */}
              <div className="single-top-jobs">
                <div className="services-ion">
                  <img src="assets/img/icon/jon-iocn2.svg" alt="" />
                </div>
                <div className="services-cap">
                  <h5>
                    <a href="#">Design & creatives</a>
                  </h5>
                  <p>
                    the automated proocess has begun automated process starts as
                    soon as your clothes go into.
                  </p>
                  <a href="#" className="btn">
                    Apply Now
                  </a>
                </div>
                <div className="stickers">
                  <span>Remote</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Top Jobs End --> */}
        {/* <!--? job Post Start --> */}
        <section className="job-post pt-top section-bg2">
          <div className="container">
            <div className="row">
              <Card
                title="Browse for Books"
                paragraph="Browse Books And Materials Posted By Other Users, And Download It If You Find Them Worthy!"
                buttonName="Browse Book"
              />
              <div className="col-lg-6">
                <div className="single-features single-features2 mb-40 pt-60">
                  <div className="job-post-banner">
                    <img src="assets/img/gallery/job-pos-banner2.png" alt="" />
                  </div>
                  <div className="features-caption">
                    <h3>Browse for Books</h3>
                    <p>
                      Browse Books And Materials Posted By Other Users, And
                      Download It If You Find Them Worthy!
                    </p>
                    <a href="#" className="border-btn">
                      Browse Book
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- job Post End --> */}

        {/* <!--? Want To work 01 */}
        <section className="wantToWork-area">
          <div className="container">
            <div className="wants-wrapper w-padding2">
              <div className="row align-items-center justify-content-between">
                <div className="col-xl-7 col-lg-9 col-md-8">
                  <div className="wantToWork-caption wantToWork-caption2">
                    <h2>Start finding your dream job</h2>
                    <p>
                      the automated proocess has begun automated process starts
                      as soon as your clothes go into the machine. the automated
                      proocess has begun outcome is gleaming clothes placeholder
                      text commonly used.
                    </p>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3">
                  <a href="#" className="btn f-right wantToWork-btn">
                    Brows Books
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Base>
    </div>
  );
}
