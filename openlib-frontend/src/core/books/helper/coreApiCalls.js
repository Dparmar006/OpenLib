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

  const { title, author, subject, description, edition, stream, file } = book;

  formData.append("id", userId);
  formData.append("title", title);
  formData.append("author", author);
  formData.append("subject", subject);
  formData.append("description", description);
  formData.append("edition", edition);
  formData.append("stream", stream);
  formData.append("like", "");

  formData.append("file", file);

  console.log(formData);
  return fetch(`${API}books/uploadBook/`, {
    method: "POST",

    body: formData,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((error) => console.log(error));
};
