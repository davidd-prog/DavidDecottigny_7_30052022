import Axios from "./caller.service";

// Organisation des requêtes à l'API concernant la gestions des users
let getAllUsers = () => {
  return Axios.get("/auth");
};

let updateUser = (user) => {
  return Axios.put("/auth/" + user.id, user);
};

let deleteUser = (id) => {
  return Axios.delete("/auth/" + id);
};

export const usersService = {
  getAllUsers,
  updateUser,
  deleteUser,
};
