import Axios from "./caller.service";

let registerAction = (credentials) => {
  return Axios.post("/auth/signup", credentials);
};

let connectAction = (credentials) => {
  return Axios.post("/auth/login", credentials);
};

let getToken = () => {
  return localStorage.getItem("token");
};

let getUserId = () => {
  return localStorage.getItem("userid");
};

let getUserFirstname = () => {
  return localStorage.getItem("firstname");
};

let saveToken = (token) => {
  localStorage.setItem("token", token);
};

let saveUserId = (userId) => {
  localStorage.setItem("userid", userId);
};

let saveUserFirstname = (firstname) => {
  localStorage.setItem("firstname", firstname);
};

let islogged = () => {
  let token = localStorage.getItem("token");
  return !!token;
};

export const accountService = {
  connectAction,
  getToken,
  getUserId,
  getUserFirstname,
  saveUserId,
  saveUserFirstname,
  saveToken,
  islogged,
  registerAction,
};
