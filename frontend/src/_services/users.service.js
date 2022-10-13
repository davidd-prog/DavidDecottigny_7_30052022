import Axios from "./caller.service";

let getAllUsers = () => {
  return Axios.get("/");
};

export const userService = {
  getAllUsers,
};
