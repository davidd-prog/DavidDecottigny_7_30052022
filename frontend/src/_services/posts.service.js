import Axios from "./caller.service";
import { accountService } from "./account.service";

let token = accountService.getToken();

// Gestion des requêtes à l'API concernant les posts
let getAllPosts = () => {
  return Axios.get("/posts");
};

let createPost = (FormData) => {
  return Axios.post("/posts", FormData, {
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "multipart/form-data",
    },
  });
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
  createPost,
};
