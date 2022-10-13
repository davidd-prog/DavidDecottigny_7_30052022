import Axios from "./caller.service";

let getAllPosts = () => {
  return Axios.get("/posts");
};

export const postsService = {
  getAllPosts,
};
