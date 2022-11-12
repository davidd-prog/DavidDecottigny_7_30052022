import axios from "axios";
import { accountService } from "./account.service";
import router from "../router";

const Axios = axios.create({
  baseURL: "http://localhost:3000/api/",
});

Axios.interceptors.request.use((request) => {
  let token = accountService.getToken();
  // console.log(accountService.getToken());

  if (token) {
    request.headers.Authorization = "Bearer " + token;
  }

  return request;
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("firstname");
      localStorage.removeItem("userid");
      localStorage.removeItem("userAdmin");
      router.push("/login");
    }
  }
);

export default Axios;
