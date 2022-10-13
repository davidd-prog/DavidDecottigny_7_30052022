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

let saveToken = (token) => {
  localStorage.setItem("token", token);
};

let saveUserId = (userId) => {
  localStorage.setItem("userid", userId);
};

let islogged = () => {
  let token = localStorage.getItem("token");
  return !!token;
};

export const accountService = {
  connectAction,
  getToken,
  getUserId,
  saveUserId,
  saveToken,
  islogged,
  registerAction,
};
