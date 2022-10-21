import axios from "axios";
import { accountService } from "./account.service";
// require("dotenv").config();
// import { accountService } from "./account.service";

const Axios = axios.create({
  baseURL: "http://localhost:3000/api/",
});

Axios.interceptors.request.use((request) => {
  let token = accountService.getToken();
  console.log(localStorage.getItem("token"));

  if (token) {
    request.headers.Authorization = "Bearer " + token;
  }

  return request;
});

export default Axios;
