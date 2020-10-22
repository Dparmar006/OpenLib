import { checkAuthenticationToken } from "../../../auth/helper";
import { API, mediaStorageUrl } from "../../../backend";

export const getAllBooks = () => {
  return fetch(`${API}books/`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const getFileNameFromPath = (str) => {
  return str.replace(/^.*(\\|\/|\:)/, "");
};

export const getNumberOfLikes = (arr) => {
  return arr.length;
};

export const uploadBookHelper = (book) => {
  const formData = new FormData();
  const userId =
    checkAuthenticationToken() && checkAuthenticationToken().user.id;
  const token = checkAuthenticationToken() && checkAuthenticationToken().token;

  for (const name in book) {
    formData.append(name, book[name]);
  }

  formData.set(
    "bookFile",
    "http://127.0.0.1:8000/media/bookFiles/".concat(
      getFileNameFromPath(formData.get("file"))
    )
  );

  return fetch(`${API}books/addBook/${userId}/${token}/`, {
    method: "POST",
    headers: {},
    body: formData,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((error) => console.log(error));
};
