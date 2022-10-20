import Axios from "./caller.service";

let getAllUsers = () => {
  return Axios.get("/auth");
};

export const usersService = {
  getAllUsers,
};
