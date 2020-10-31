import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { checkAuthenticationToken } from "../../../auth/helper";
import Base from "../../commonComponents/Base";
import { getBookDetailHelper, getNumberOfLikes } from "../helper/coreApiCalls";

const BookDetails = () => {
  const [book, setBook] = useState([]);
  const [liked, setLiked] = useState(false);

  var location = useLocation();
  const bookId = location.state;

  const haveUserLikedThisBook = () => {
    const userId =
      checkAuthenticationToken() && checkAuthenticationToken().user.id;
    for (const liker in book.like) {
      console.log(liker);
      if (liker.endsWith("/" + userId + "/")) {
        return true;
      }
    }
  };
  useEffect(() => {
    if (haveUserLikedThisBook()) {
      setLiked(true);
    }
  }, []);
  getBookDetailHelper(bookId)
    .then((data) => {
      setBook(data);
    })
    .catch((error) => console.log(error));

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
  return (
    <Base
      pageTitle={book.title}
      pageDescription={`${book.stream}   ( ${book.subject} )`}
    >
      <div className="container mt-50">
        <div className="col-xl-7 col-lg-8">
          <div className="top-jobs mb-50">
            <div className="single-top-jobs">
              <div className="services-ion">
                <div>
                  {getNumberOfLikes(book.like || "")}
                  <div className="icon" style={{ marginTop: "-60px" }}>
                    <i
                      className="fas fa-heart"
                      style={{ color: "#a83f39" }}
                    ></i>
                  </div>
                </div>

                {/* <img src="assets/img/icon/jon-iocn1.svg" alt="" /> */}
              </div>

              <div className="services-cap">
                <h5>
                  <a href="#">
                    {liked} {book.title} - by {book.author}
                  </a>
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

            {/* other */}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default BookDetails;
