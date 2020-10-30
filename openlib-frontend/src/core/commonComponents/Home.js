import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const specialNavbarForHome = () => {
    return (
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
    );
  };

  const searchResultTable = () => {
    return (
      <div
        className="brand-area"
        id="toSearchResults"
        style={{ marginTop: "-200px" }}
      >
        <div className="container">
          <div className="progress-table-wrap">
            <div className="progress-table">
              <div className="table-head shadow-sm">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Author</th>
                      <th scope="col">Likes</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((books, index) => {
                      return (
                        <tr key={books.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{books.title}</td>
                          <td>{books.author}</td>
                          <td>{getNumberOfLikes(books.like)}</td>
                          <td style={{ display: "flex" }}>
                            <a
                              href={books.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-black-50 m-2"
                            >
                              <div className="icon">
                                <i className="fa fa-download"></i>
                              </div>
                            </a>
                            <Link
                              className="like-info m-2"
                              to={{
                                pathname: `/detailedPage`,
                                state: books.id,
                              }}
                            >
                              <div className="icon" style={{ color: "gray" }}>
                                <i className="fa fa-info-circle"></i>
                              </div>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    );
  };
  return (
    <div>
      <Base showDefaultHeroSection="false">
        <div>
          {specialNavbarForHome()}
          {searchResultTable()}
        </div>
        {/* <!--? cards --> */}

        <div className="container mt-50">
          <section className="job-post pt-top section-bg2">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="single-features single-features1 mb-40 pt-60">
                    <div className="job-post-banner">
                      <img
                        src="assets/img/gallery/job-pos-banner1.png"
                        alt=""
                      />
                    </div>
                    <div className="features-caption">
                      <h3>Browse for Books</h3>
                      <p>
                        Browse Books And Materials Posted By Other Users, And
                        Download It If You Find Them Worthy!
                      </p>
                      <a href="#" className="genric-btn info circle">
                        Browse Book
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="single-features single-features2 mb-40 pt-60">
                    <div className="job-post-banner">
                      <img
                        src="assets/img/gallery/job-pos-banner2.png"
                        alt=""
                      />
                    </div>
                    <div className="features-caption">
                      <h3>Upload book</h3>
                      <p>
                        Browse Books And Materials Posted By Other Users, And
                        Download It If You Find Them Worthy!
                      </p>
                      <a href="/uploadBook" className="genric-btn info circle">
                        Browse Book
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* <!-- card End --> */}
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
