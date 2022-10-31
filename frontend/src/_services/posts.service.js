import Axios from "./caller.service";

let getAllPosts = () => {
  return Axios.get("/posts");
};

let deletePost = (id) => {
  return Axios.delete("/posts/" + id);
};

export const postsService = {
  getAllPosts,
  deletePost,
};
