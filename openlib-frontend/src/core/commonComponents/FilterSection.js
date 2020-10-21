import React, { useEffect, useState } from "react";
import { getAllBooks, getNumberOfLikes } from "../books/helper/coreApiCalls";

function FilterSection() {
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
                        onChange={handleChange("subject")}
                        className="nice-select"
                      >
                        <option value="">All books</option>
                        {books.map((data, index) => (
                          <option key={index} value={data.subject}>
                            {data.subject}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="search-form">
                      <a
                        href="#toSearchResults"
                        onClick={(event) => onSubmitHnadle(event)}
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
    </div>
  );
}

export default FilterSection;
