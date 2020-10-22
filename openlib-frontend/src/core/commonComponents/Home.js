import React, { useEffect, useState } from "react";
import { getAllBooks, getNumberOfLikes } from "../books/helper/coreApiCalls";

import Base from "./Base";
import Card from "./Card";
import CategoryCard from "./CategoryCard";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState({
    title: "",
    description: "",
    subject: "",
  });

  useEffect(() => {
    loadFilteredBooks(filter);
  });

  const loadFilteredBooks = ({ title, description, subject }) => {
    getAllBooks()
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          var filteredResult = data.filter((data) => {
            return (
              data.title.toLowerCase().includes(title.toLowerCase()) &&
              data.description
                .toLowerCase()
                .includes(description.toLowerCase()) &&
              data.subject.toLowerCase().includes(subject.toLowerCase())
            );
          });
          setBooks(filteredResult);
        }
      })
      .catch((error) => console.log(error));
  };

  const onSubmitHnadle = (event) => {
    event.preventDefault();
    loadFilteredBooks(filter);
  };

  const handleChange = (name) => (event) => {
    setFilter({ ...filter, [name]: event.target.value });
  };
  return (
    <div>
      <Base showDefaultHeroSection="false">
        <div>
          {/* <!-- Hero Area Start--> */}
          <div className="slider-area">
            <div className="single-slider slider-height d-flex align-items-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-11 col-lg-12">
                    {/* <!--Hero form --> */}
                    <form action="#" className="search-box">
                      <div className="input-form">
                        <input
                          type="text"
                          name="title"
                          placeholder="Title is..."
                          onChange={handleChange("title")}
                        />
                        {/* <!-- icon --> */}
                        <div className="icon">
                          <i className="fa fa-book"></i>
                        </div>
                      </div>
                      <div className="input-form2">
                        <input
                          type="text"
                          name="topics"
                          placeholder="Topics"
                          onChange={handleChange("description")}
                        />
                        {/* <!-- icon --> */}
                        <div className="icon">
                          <i className="fa fa-check-circle"></i>
                        </div>
                      </div>

                      <div className="input-form2">
                        <select
                          name="subject"
                          id="subject"
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "0px",
                          }}
                          onChange={handleChange("subject")}
                          className="nice-select"
                        >
                          <option value="">All books</option>
                          {books.map((data, index) => (
                            <option
                              key={index}
                              value={data.subject}
                              className="list-group-item"
                            >
                              {data.subject}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="search-form">
                        <a
                          href="#toSearchResults"
                          //onClick={(event) => onSubmitHnadle(event)}
                          className="genric-btn info input-form"
                        >
                          <i className="fas fa-search"></i> Search
                        </a>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-12">
                    <div className="popular-search text-center ">
                      <ul>
                        <li>
                          <p>Popular search:</p>
                        </li>
                        <li>
                          <a href="#">#User experience designer</a>
                        </li>
                        <li>
                          <a href="#">#Marketing</a>
                        </li>
                        <li>
                          <a href="#">#Programmer</a>
                        </li>
                        <li>
                          <a href="#">#Finance</a>
                        </li>
                        <li>
                          <a href="#">#UI designer</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!--Hero Area End--> */}
          {/* <!--? Brand Area Start  */}
          <div
            className="brand-area"
            id="toSearchResults"
            style={{ marginTop: "-200px" }}
          >
            <div className="container">
              <h3 className="mb-30 text-white">Search results...</h3>
              <div className="progress-table-wrap">
                <div className="progress-table">
                  <div className="table-head shadow-sm">
                    <div className="serial">#</div>
                    <div className="country">Book Title</div>
                    <div className="country">Author</div>
                    <div className="visit">Likes</div>
                    <div className="visit">Download</div>
                  </div>
                  {/* SINGLE ROW OF RESULT */}
                  {books.map((books, index) => {
                    return (
                      <div className="table-row" key={index}>
                        <div className="serial">{index + 1}</div>
                        <div className="country">{books.title}</div>
                        <div className="country">{books.author}</div>
                        <div className="visit">
                          {getNumberOfLikes(books.like)}
                        </div>
                        <div className="country">
                          <a
                            href={books.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black-50"
                          >
                            <div className="icon">
                              <i className="fa fa-download"></i>
                            </div>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-50">
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
                {/* <div className="stickers">
                  <span>Remote</span>
                </div> */}
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
                {/* <div className="stickers">
                  <span>Remote</span>
                </div> */}
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
