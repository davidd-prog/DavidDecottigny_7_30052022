import Axios from "./caller.service";

let registerAction = (credentials) => {
  return Axios.post("/auth/signup", credentials);
};

let connectAction = (credentials) => {
  return Axios.post("/auth/login", credentials);
};

let logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("firstname");
  localStorage.removeItem("userid");
  localStorage.removeItem("userAdmin");
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

let getUserIsAdmin = () => {
  return localStorage.getItem("userAdmin");
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

let saveUserIsAdmin = (userAdmin) => {
  localStorage.setItem("userAdmin", userAdmin);
};

let islogged = () => {
  let token = localStorage.getItem("token");
  return !!token;
};

export const accountService = {
  connectAction,
  logOut,
  getToken,
  getUserId,
  getUserFirstname,
  getUserIsAdmin,
  saveUserId,
  saveUserFirstname,
  saveUserIsAdmin,
  saveToken,
  islogged,
  registerAction,
};
