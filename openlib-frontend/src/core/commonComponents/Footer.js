import React from "react";

function Footer() {
  return (
    <footer>
      <div
        className="footer-wrappper pl-100 pr-100 section-bg"
        data-background="assets/img/gallery/footer-bg.png"
      >
        {/* <!-- Footer Start--> */}
        <div className="footer-area footer-padding">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3 col-lg-5 col-md-4 col-sm-6">
                <div className="single-footer-caption mb-50">
                  <div className="single-footer-caption mb-30">
                    {/* <!-- logo --> */}
                    <div className="footer-logo mb-25">
                      <a href="index.html">OpenLibrary</a>
                    </div>
                    <div className="footer-tittle">
                      <div className="footer-pera">
                        <p>Join us to our social media platforms!</p>
                      </div>
                    </div>
                    {/* <!-- social --> */}
                    <div className="footer-social">
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="http://www.twitter.com/pistanthrobian">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="http://www.instagram.com/yesss_finally_he">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="http://www.github.com/dparmar006">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-5">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>Top categories</h4>
                    <ul>
                      <li>
                        <a href="#">Engginering</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>For Students</h4>
                    <ul>
                      <li>
                        <a href="#">Technical</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>To Look Out</h4>
                    <ul>
                      <li>
                        <a href="#">Design & creatives</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>Current Affairs</h4>
                    <ul>
                      <li>
                        <a href="#">News & Magazines</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- footer-bottom area --> */}
      <div className="footer-bottom-area">
        <div className="container">
          <div className="footer-border">
            <div className="row d-flex align-items-center">
              {/* <div className="col-xl-12 ">Credits here</div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End--> */}
    </footer>
  );
}

export default Footer;
