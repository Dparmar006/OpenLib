const { API } = require("../../backend");

export const signUp = (user) => {
  return fetch(`${API}books/user/`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// SIGNIN

export const signIn = (user) => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
    console.log(name, user[name], "Foor loop in sign in");
  }

  for (var key of formData.keys()) {
    console.log("KEY :", key);
  }

  return fetch(`${API}books/login/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// AKA authentication
export const saveAuthToken = (data, nextFun) => {
  if (typeof window !== undefined) {
    localStorage.setItem("ol-jwt", JSON.stringify(data));
    console.table(localStorage.getItem("ol-jwt"), ": Token saved object");
    nextFun();
  }
};

export const checkAuthenticationToken = () => {
  if (typeof window === undefined) {
    return false;
  }

  if (localStorage.getItem("ol-jwt")) {
    return JSON.parse(localStorage.getItem("ol-jwt"));
  } else {
    return false;
  }
};
