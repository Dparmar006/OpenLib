import React, { useEffect, useState } from "react";
import { getAllBooks, getNumberOfLikes } from "../books/helper/coreApiCalls";

const Base = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);

  const loadAllBooks = () => {
    getAllBooks()
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setBooks(data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadAllBooks();
  });

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
        {/* <!-- Preloader Start --> */}
        <header>
          {/* <!-- Header Start --> */}
          <div className="header-area header-transparent">
            <div className="main-header">
              <div className="header-bottom header-sticky">
                <div className="container-fluid">
                  <div className="row align-items-center">
                    {/* <!-- Logo --> */}
                    <div className="col-xl-2 col-lg-2">
                      <div className="logo">
                        <a href="index.html">
                          <h1>OpenLibrary</h1>
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-10 col-lg-10">
                      <div className="menu-wrapper d-flex align-items-center justify-content-end">
                        {/* <!-- Main-menu --> */}
                        <div className="main-menu d-none d-lg-block">
                          <nav>
                            <ul id="navigation">
                              <li>
                                <a href="index.html">Home</a>
                              </li>
                              <li>
                                <a href="about.html">About Us</a>
                              </li>
                              <li>
                                <a href="contactus.html">Contact Us</a>
                              </li>

                              <li>
                                <a href="login.html">Log in</a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                        {/* <!-- Header-btn --> */}
                        <div className="header-right-btn d-none d-lg-block ml-65">
                          <a href="register.html" className="border-btn">
                            Sign Up
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Mobile Menu --> */}
                    <div className="col-12">
                      <div className="mobile_menu d-block d-lg-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Header End --> */}
        </header>
        {/* <!-- header end --> */}
        <div>
          {/* <!-- Hero Area Start--> */}
          <div className="slider-area">
            <div className="single-slider slider-height d-flex align-items-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-8 col-lg-9">
                    {/* <!-- Hero Caption --> */}
                    <div className="hero__caption">
                      <h1>Find your dream book.</h1>
                      <p>Filter your books by category.</p>
                    </div>
                  </div>
                  <div className="col-xl-11 col-lg-12">
                    {/* <!--Hero form --> */}
                    <form action="#" className="search-box">
                      <div className="input-form">
                        <input
                          type="text"
                          name="keywords"
                          placeholder="Search books"
                        />
                        {/* <!-- icon --> */}
                        <div className="icon">
                          <i className="fa fa-book"></i>
                        </div>
                      </div>
                      <div className="input-form2">
                        <input type="text" name="topics" placeholder="Topics" />
                        {/* <!-- icon --> */}
                        <div className="icon">
                          <i className="fa fa-check-circle"></i>
                        </div>
                      </div>
                      <div className="select-form">
                        <div className="select-itms">
                          <select name="select" id="select1">
                            <option value="">Subject</option>
                            <option value="">Java</option>
                            <option value="">Python</option>
                            <option value="">Philosophy</option>
                          </select>
                        </div>
                      </div>
                      <div className="search-form">
                        <a href="#">
                          <i className="fas fa-search"></i> Search
                        </a>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-12">
                    <div className="popular-search text-center pt-30">
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
          <div className="brand-area">
            <div className="container">
              <div className="section-top-border">
                <h3 className="mb-30">Search result...</h3>
                <div className="progress-table-wrap">
                  <div className="progress-table">
                    <div className="table-head">
                      <div className="serial">#</div>
                      <div className="country">Book Title</div>
                      <div className="country">Author</div>
                      <div className="visit">Likes</div>
                      <div className="visit">Download</div>
                      <div className="percentage">Percentages</div>
                    </div>
                    {/* SINGLE ROW OF RESULT */}
                    {books.map((books, index) => {
                      return (
                        <div className="table-row">
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
                              className="text-black-50"
                            >
                              {/* <i className="fab fa-download"></i> */}
                              Download
                            </a>
                          </div>
                          <div className="percentage">
                            <div className="progress">
                              <div
                                className="progress-bar color-1"
                                role="progressbar"
                                style={{ width: "80%" }}
                                aria-valuenow="80"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
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
        {/* <!-- Brand Area End --> */}
        {/* <!-- Our Services Start --> */}
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

              <div className="row no-gutters">
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="single-services">
                    <div className="services-ion">
                      <img src="assets/img/icon/services1.svg" alt="" />
                    </div>
                    <div className="services-cap">
                      <h5>
                        <a href="#">Engineering</a>
                      </h5>
                      <p>
                        All the reference books related to engineering.
                        including the study books.Get some assignments and notes
                        from users.
                      </p>
                      <a href="#" className="more-btn">
                        Browse Books
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="single-services">
                    <div className="services-ion">
                      <img src="assets/img/icon/services2.svg" alt="" />
                    </div>
                    <div className="services-cap">
                      <h5>
                        <a href="#"> Programming</a>
                      </h5>
                      <p>
                        The various books for all the programming languages such
                        as Python,Dart,etc.. Find the materails and start
                        programming!
                      </p>
                      <a href="#" className="more-btn">
                        Browse Books
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="single-services">
                    <div className="services-ion">
                      <img src="assets/img/icon/services3.svg" alt="" />
                    </div>
                    <div className="services-cap">
                      <h5>
                        <a href="#">Design & creatives</a>
                      </h5>
                      <p>
                        Explore & learn something creative, make arts &
                        desigens. Start surrounding yourself around the arts &
                        desgining stuffs!
                      </p>
                      <a href="#" className="more-btn">
                        Brows Books
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="single-services">
                    <div className="services-ion">
                      <img src="assets/img/icon//services4.svg" alt="" />
                    </div>
                    <div className="services-cap">
                      <h5>
                        <a href="#">Story Tellers</a>
                      </h5>
                      <p>
                        Give some break to yourself,Explore some stories that
                        inspires you,make you laugh,teach you something and many
                        more!
                      </p>
                      <a href="#" className="more-btn">
                        Brows Books
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="single-services">
                    <div className="services-ion">
                      <img src="assets/img/icon/services5.svg" alt="" />
                    </div>
                    <div className="services-cap">
                      <h5>
                        <a href="#">Market Analysis</a>
                      </h5>
                      <p>
                        Tune in your self into share market. Get knowledge from
                        other users's posts and learn about market!
                      </p>
                      <a href="#" className="more-btn">
                        Brows Books
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="single-services">
                    <div className="services-ion">
                      <img src="assets/img/icon/services6.svg" alt="" />
                    </div>
                    <div className="services-cap">
                      <h5>
                        <a href="#">Biography</a>
                      </h5>
                      <p>
                        Get in touch with some of The GOAT's & knew some untold
                        stories about their life and Get Inspired!
                      </p>
                      <a href="#" className="more-btn">
                        Brows Books
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Our Services End --> */}
        {/* <!--? About Area Start--> */}
        {/* <!--  */}
        <section className="about-area fix">
          {/* <!--Right Contents   */}
          <div className="about-img">
            <div className="info-man text-center">
              <div className="head-cap">
                <h3>89027+</h3>
              </div>
              <p>Talented waiting for hire</p>
            </div>
          </div>
          {/* <!-- left Contents --> */}
          {/* <!--  */}
          <div className="about-details">
            <div className="right-caption">
              {/* <!-- Section Tittle  */}
              <div className="section-tittle mb-20">
                <h2>Want to hire perfect person?</h2>
              </div>
              <div className="about-more">
                <p className="mb-45 pera-bottom">
                  the automated proocess has begun automated process starts as
                  soon as your clothes go into the machine. the automated
                  proocess has begun outcome is gleaming clothes. Placeholder
                  text commonly used. In publishing and graphic design, Lorem
                  ipsum is a placeholder text commonly used to demonstrate the
                  visual form of a document or a typeface without relying.
                </p>
                <a href="#" className="btn">
                  Browse Talents
                </a>
              </div>
            </div>
            {/* -->
   <!--     */}
          </div>
        </section>
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
              {/* <!-- Single  */}
              <div className="single-top-jobs">
                <div className="services-ion">
                  <img src="assets/img/icon/jon-iocn3.svg" alt="" />
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
                  <img src="assets/img/icon/jon-iocn4.svg" alt="" />
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
              {/* <!-- Single */}
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
              <div className="col-lg-6">
                <div className="single-features mb-40 pt-60">
                  <div className="job-post-banner">
                    <img src="assets/img/gallery/job-pos-banner1.png" alt="" />
                  </div>
                  <div className="features-caption">
                    <h3>Post a Book</h3>
                    <p>
                      Post Your Books and Materials So That Other Users Can
                      Reach Out To Your Posted Stuff!
                    </p>
                    <a href="#" className="border-btn">
                      Post a Book
                    </a>
                  </div>
                </div>
              </div>
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
        {/* <!--? Testimonial Area Start */}
        <section className="about-area2 testimonial-area fix">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-9 col-sm-9">
                <div className="about-caption">
                  {/* <!-- Testimonial Start  */}
                  <div className="h1-testimonial-active dot-style">
                    {/* <!-- Single Testimonial  */}
                    <div className="single-testimonial">
                      <div className="testimonial-caption">
                        <img
                          src="assets/img/icon/quotes-sign.png"
                          alt=""
                          className="quotes-sign"
                        />
                        <p>
                          Brook presents your services with flexible, convenient
                          and cdpose layouts. You can select your favorite
                          layouts & elements for cular ts with unlimited
                          ustomization possibilities. Pixel-perfect
                          replica;ition of thei designers ijtls intended csents
                          your se.
                        </p>
                      </div>
                      {/* <!-- founder */}
                      <div className="testimonial-founder d-flex align-items-center">
                        <div className="founder-img">
                          <img
                            src="assets/img/icon/Homepage_testi.png"
                            alt=""
                          />
                        </div>
                        <div className="founder-text">
                          <span>Robart Brown</span>
                          <p>Creative designer at Colorlib</p>
                        </div>
                      </div>
                      {/* </div> --> */}
                      {/* <!-- Single Testimonial */}
                      <div className="single-testimonial">
                        <div className="testimonial-caption">
                          <img
                            src="assets/img/icon/quotes-sign.png"
                            alt=""
                            className="quotes-sign"
                          />
                          <p>
                            Brook presents your services with flexible,
                            convenient and cdpose layouts. You can select your
                            favorite layouts & elements for cular ts with
                            unlimited ustomization possibilities. Pixel-perfect
                            replica;ition of thei designers ijtls intended
                            csents your se.
                          </p>
                        </div>
                        {/* <!-- founder  */}
                        <div className="testimonial-founder d-flex align-items-center">
                          <div className="founder-img">
                            <img
                              src="assets/img/icon/Homepage_testi.png"
                              alt=""
                            />
                          </div>
                          <div className="founder-text">
                            <span>Robart Brown</span>
                            <p>Creative designer at Colorlib</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Testimonial End */}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- about-img  */}
            <div className="about-img2 pt-20">
              <img src="assets/img/gallery/testimonail.png" alt="" />
            </div>
          </div>
        </section>
        {/* <!--? Testimonial Area End --> */}
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
      </div>

      {/* <!-- Want To work End --> */}

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
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#">
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
                        <li>
                          <a href="#">Programing</a>
                        </li>
                        <li>
                          <a href="#">Design & creatives</a>
                        </li>
                        <li>
                          <a href="#">Market Analysis</a>
                        </li>
                        <li>
                          <a href="#">Biography</a>
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
                        <li>
                          <a href="#">Physics Theories</a>
                        </li>
                        <li>
                          <a href="#">Accounting</a>
                        </li>
                        <li>
                          <a href="#">Programing</a>
                        </li>
                        <li>
                          <a href="#">Architecture</a>
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
                        <li>
                          <a href="#">Story Tellers</a>
                        </li>
                        <li>
                          <a href="#">Space Research</a>
                        </li>
                        <li>
                          <a href="#">Motivation</a>
                        </li>
                        <li>
                          <a href="#">Managment Skiils</a>
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
                        <li>
                          <a href="#">Geographical Happenings</a>
                        </li>
                        <li>
                          <a href="#">Economics Affairs</a>
                        </li>
                        <li>
                          <a href="#">Global Events</a>
                        </li>
                        <li>
                          <a href="#">Political Affiars</a>
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
                <div className="col-xl-12 ">Credits here</div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Footer End--> */}
      </footer>
    </div>
  );
};

export default Base;
