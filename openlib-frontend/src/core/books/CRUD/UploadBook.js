import React, { useState } from "react";
import { mediaStorageUrl } from "../../../backend";
import Base from "../../commonComponents/Base";
import { uploadBookHelper, getFileNameFromPath } from "../helper/coreApiCalls";

const UploadBook = () => {
  const [bookInfo, setBookInfo] = useState({
    title: "Testbook",
    author: "Author test",
    subject: "Subject test",
    description: "desc test",
    edition: "4",
    stream: "IT",
    file: null,

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

    error,
    success,
  } = bookInfo;

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(bookInfo, "b4");
    uploadBookHelper({
      title,
      author,
      subject,
      description,
      edition,
      stream,
      file,
    })
      .then((response) => {
        if (response.error) {
          console.log(response);
        } else {
          setBookInfo({
            ...bookInfo,
            success: true,
            error: false,
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
    console.log("====================================");
    console.table(bookInfo);
    console.log("====================================");
  };
  const handleFileChange = (event) => {
    setBookInfo({
      ...bookInfo,
      file: event.target.value || null,
    });
    console.log("====================================");
    console.table(bookInfo);
    console.log("====================================");
  };

  return (
    <Base>
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
                    value={file || null}
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
