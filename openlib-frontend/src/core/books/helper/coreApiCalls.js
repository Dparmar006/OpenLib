import { API } from "../../../backend";

export const getAllBooks = () => {
  return fetch(`${API}books/`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getNumberOfLikes = (arr) => {
  return arr.length;
};
