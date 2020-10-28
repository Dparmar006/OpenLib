import React, { useState } from "react";
import { mediaStorageUrl } from "../../../backend";
import Base from "../../commonComponents/Base";
import { uploadBookHelper, getFileNameFromPath } from "../helper/coreApiCalls";

const UploadBook = () => {
  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    subject: "",
    description: "",
    edition: "",
    stream: "",
    file: null,

    msg: "",
    error: "",
    success: "",
  });

  const {
    title,
    author,
    subject,
    description,
    edition,
    stream,
    file,

    msg,
    error,
    success,
  } = bookInfo;

  const handleSubmit = (event) => {
    event.preventDefault();
    uploadBookHelper({
      title,
      author,
      subject,
      description,
      edition,
      stream,
      file,
    })
      .then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          setBookInfo({
            ...bookInfo,
            title: "",
            author: "",
            subject: "",
            description: "",
            edition: "",
            stream: "",
            file: null,

            msg: data.msg,
            error: false,
            success: true,
          });
        }
      })
      .catch((error) => console.error(error));
  };
  const handleChange = (name) => (event) => {
    setBookInfo({
      ...bookInfo,
      [name]: event.target.value,
    });
  };
  const handleFileChange = (event) => {
    setBookInfo({
      ...bookInfo,
      file: event.target.files[0] || null,
    });
  };

  return (
    <Base
      pageTitle="Fill details of your book"
      pageDescription={msg.length > 0 ? msg : "Fill details of your book"}
    >
      <div className="container m-10">
        <form action="" encType="multipart/form-data">
          <div className="row">
            <div className="col-lg-3 col-md-4 mt-sm-30">
              <div className="mt-10">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  value={title}
                  className="single-input"
                  onChange={handleChange("title")}
                />
              </div>
              <div className="mt-10">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  value={subject}
                  className="single-input"
                  onChange={handleChange("subject")}
                />
              </div>
              <div className="mt-10">
                <textarea
                  className="single-textarea"
                  placeholder="Description"
                  required
                  name="description"
                  value={description}
                  onChange={handleChange("description")}
                ></textarea>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 mt-sm-30">
              <div className="single-element-widget">
                <div className="mt-10">
                  <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    className="single-input"
                    required
                    onChange={handleChange("author")}
                    value={author}
                  />
                </div>
                <div className="mt-10">
                  <input
                    type="text"
                    name="stream"
                    placeholder="Stream"
                    className="single-input"
                    required
                    onChange={handleChange("stream")}
                    value={stream}
                  />
                </div>
                <div className="mt-10">
                  <input
                    type="number"
                    name="edition"
                    placeholder="Edition"
                    className="single-input"
                    required
                    onChange={handleChange("edition")}
                    value={edition}
                  />
                </div>
                <div className="mt-10">
                  <input
                    type="file"
                    name="file"
                    placeholder="Upload your book"
                    className="single-input"
                    required
                    onChange={(event) => handleFileChange(event)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className="mt-5">
            <button
              type="submit"
              className="genric-btn info radius"
              onClick={handleSubmit}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};

export default UploadBook;
