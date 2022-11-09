import Axios from "./caller.service";

let getAllUsers = () => {
  return Axios.get("/auth");
};

let deleteUser = (id) => {
  return Axios.delete("/auth/" + id);
};

export const usersService = {
  getAllUsers,
  deleteUser,
};
