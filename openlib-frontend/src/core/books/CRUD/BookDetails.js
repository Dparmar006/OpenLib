import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { checkAuthenticationToken } from "../../../auth/helper";
import { API } from "../../../backend";
import Base from "../../commonComponents/Base";
import {
  getBookDetailHelper,
  getNumberOfLikes,
  likeThisBook,
  unlikeThisBook,
} from "../helper/coreApiCalls";

const BookDetails = () => {
  const [book, setBook] = useState([]);
  const [liked, setLiked] = useState("");
  const [likeButtonInfo, setLikeButtonInfo] = useState({
    msg: "",
    success: "",
  });
  const location = useLocation();
  const bookId = location.state;

  getBookDetailHelper(bookId)
    .then((data) => {
      setBook(data);
    })
    .catch((error) => console.log(error));

  useEffect(() => {
    getBookDetailHelper();
  }, [liked]);

  const isAlreadyLikedHelper = () => {
    const userId =
      checkAuthenticationToken() && checkAuthenticationToken().user.id;
    return fetch(`${API}books/${userId}/${bookId}/checkLike/`, {
      // /1/117/checkLike/
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(liked);
    isAlreadyLikedHelper()
      .then((data) => {
        if (data.like == "true") {
          setLiked("true");
        } else if (data.like == "false") {
          setLiked("false");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const otherDetails = () => {
    return (
      <div className="col-lg-12">
        <div className="blog_right_sidebar">
          <aside className="single_sidebar_widget popular_post_widget">
            <h3 className="widget_title" style={{ color: "#2d2d2d" }}>
              Other details
            </h3>
            <div className="media post_item">
              Edition
              <div className="media-body">
                <h3 style={{ color: "#2d2d2d" }}>{book.edition}</h3>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  };

  const likeButtonHandler = (event) => {
    event.preventDefault();
    likeThisBook(bookId)
      .then((data) => {
        console.log(data);
        if (data.error == "true") {
          setLikeButtonInfo({
            ...likeButtonInfo,
            msg: data.msg,
            success: false,
          });
        } else if (data.success == "true") {
          setLikeButtonInfo({
            ...likeButtonInfo,
            msg: data.msg,
            success: true,
          });
          setLiked("true");
        }
      })
      .catch((error) => console.log(error));
  };
  const unlikeButtonHandler = (event) => {
    event.preventDefault();
    unlikeThisBook(bookId)
      .then((data) => {
        console.log(data);
        if (data.error == "true") {
          setLikeButtonInfo({
            ...likeButtonInfo,
            msg: data.msg,
            success: false,
          });
        } else if (data.success == "true") {
          setLikeButtonInfo({
            ...likeButtonInfo,
            msg: data.msg,
            success: true,
          });
          setLiked("false");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Base
      pageTitle={book.title}
      pageDescription={`${book.stream}   ( ${book.subject} )`}
    >
      <div className="container mt-50">
        <div className="col-xl-7 col-lg-8">
          <div className="top-jobs mb-50">
            <div className="single-top-jobs">
              <div
                className="services-ion"
                // style={{ cursor: "pointer" }}
                // onClick={(event) => likeButtonHandler(event)}
              >
                <div style={{ marginTop: "-10px", fontSize: "20px" }}>
                  {getNumberOfLikes(book.like || "")}
                  <div className="icon" style={{ marginTop: "-60px" }}>
                    <i
                      className="fas fa-thumbs-up"
                      style={{ color: liked == "true" ? "#a83f39" : "grey" }}
                    ></i>
                  </div>
                </div>
              </div>
              <button
                className="genric-btn info-border circle mx-2"
                onClick={(event) => likeButtonHandler(event)}
              >
                <div className="icon">
                  <i className="fa fa-thumbs-up"></i>
                </div>
              </button>
              <button
                className="genric-btn info-border circle"
                onClick={(event) => unlikeButtonHandler(event)}
              >
                <div className="icon">
                  <i className="fa fa-thumbs-down"></i>
                </div>
              </button>
              <div className="services-cap">
                <h5>
                  <h2>
                    {book.title} - by {book.author}
                  </h2>
                </h5>
                <p>{book.description}</p>
              </div>
              {otherDetails()}
              <div className="stickers">
                <a
                  className="genric-btn primary-border small circle"
                  href={book.file}
                >
                  <div className="icon">
                    <i className="fas fa-download"></i>
                  </div>
                </a>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </Base>
  );
};
export default BookDetails;
