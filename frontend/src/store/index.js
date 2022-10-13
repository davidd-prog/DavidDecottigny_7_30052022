import { createStore } from "vuex";
// const axios = require("axios");

export default createStore({
  state: {
    user: {
      userId: "",
      token: "",
      firstname: "",
      lastname: "",
      email: "",
      userAdmin: "",
      message: "",
    },
    posts: [],
    users: [],
  },

  getters: {},

  mutations: {
    // loggedUser: function (state, user) {
    //   state.user = user;
    // },
  },
  actions: {
    // getAllPosts: () => {
    //   // console.log(`Bearer ${token}`);
    //   // console.log(response.user.token);
    //   let userValidToken = localStorage.getItem("userToken");
    //   let userValidId = localStorage.getItem("userId");
    //   // let userValidAdmin = localStorage.getItem("userAdmin");
    //   let validToken = JSON.parse(userValidToken);
    //   let validId = JSON.parse(userValidId);
    //   // let validAdmin = JSON.parse(userValidAdmin);
    //   console.log(validToken, validId);
    //   instance
    //     .get("/posts", {
    //       headers: {
    //         Authorization: "Bearer " + validToken,
    //       },
    //       // headers: {
    //       //   Authorization:
    //       //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI1LCJ1c2VyQWRtaW4iOjAsImlhdCI6MTY2NTM5NTU2OSwiZXhwIjoxNjY1NDgxOTY5fQ.97FtdLNw7W2QDs76CeO9t_p1ZB1CRTsf2nxCW1M6kSk",
    //       //   "Content-Type": "application/json",
    //       // },
    //       // headers: {
    //       //   Authorization:
    //       //     "Bearer " +
    //       //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI1LCJ1c2VyQWRtaW4iOjAsImlhdCI6MTY2NTM5NTU2OSwiZXhwIjoxNjY1NDgxOTY5fQ.97FtdLNw7W2QDs76CeO9t_p1ZB1CRTsf2nxCW1M6kSk",
    //       //   "Content-Type": "application/json",
    //       // },
    //     })
    //     .then((response) => {
    //       // console.log(response);
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },
  modules: {},
});
