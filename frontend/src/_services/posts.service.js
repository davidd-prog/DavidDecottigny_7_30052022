import Axios from "./caller.service";

let getAllPosts = () => {
  return Axios.get("/posts");
};

let deletePost = (id) => {
  return Axios.delete("/posts/" + id);
};

let likePost = (id) => {
  return Axios.post("/posts/" + id + "/like");
};

export const postsService = {
  getAllPosts,
  deletePost,
  likePost,
};
