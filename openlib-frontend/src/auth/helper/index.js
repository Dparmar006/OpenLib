const { API } = require("../../backend");

export const signUp = (user) => {
  var formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
    console.log(name, user[name], "form dataaa");
  }
  return fetch(`${API}books/user/createUser/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

// SIGNIN

export const signIn = (user) => {
  var formData = new FormData();

  // for (const name in user) {
  //   formData.append(name, user[name]);
  //   console.table(formData, "form dataaa");
  // }
  const { email, password } = user;
  formData.set("email", email);
  formData.set("password", password);

  for (var key of formData.values()) {
    console.log("KEY :", key);
  }
  console.log(formData.getAll("email"));
  return fetch(`${API}books/login/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("signin data :", console.table(response));
      return response.json();
    })
    .catch((error) => console.log(error));
};

// AKA authentication
export const saveAuthToken = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("ol-jwt", JSON.stringify(data));
    console.table(localStorage.getItem("ol-jwt"), ": Token saved object");
    next();
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

export const signOut = (nextFun) => {
  const userId =
    checkAuthenticationToken() && checkAuthenticationToken().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("ol-jwt");

    return fetch(`${API}books/logout/${userId}/`, {
      method: "POST",
    })
      .then((response) => {
        nextFun();
      })
      .catch((error) => console.log(error));
  }
};
