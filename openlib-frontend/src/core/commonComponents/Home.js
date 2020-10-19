import React, { useEffect, useState } from "react";
import { getAllBooks } from "../books/helper/coreApiCalls";
import Base from "./Base";

export default function Home() {
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
      <Base></Base>
      <ul>
        {books.map((books, index) => {
          return <li key={index}>{books.file}</li>;
        })}
      </ul>
    </div>
  );
}
