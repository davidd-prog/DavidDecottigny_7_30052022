import { createStore } from "vuex";
const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api/auth/",
});

export default createStore({
  state: {
    status: "",
    user: {
      userId: "",
      token: "",
      firstname: "",
      lastname: "",
      email: "",
      userAdmin: "",
      message: "",
    },
  },
  getters: {},
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    loggedUser: function (state, user) {
      state.user = user;
    },
  },
  actions: {
    registerAction: ({ commit }, { firstname, lastname, email, password }) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/signup", {
            firstname,
            lastname,
            email,
            password,
          })
          .then((response) => {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch((error) => {
            commit("setStatus", "failCreate");
            reject(error);
          });
      });
    },

    connectAction: ({ commit }, { email, password }) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/login", {
            email,
            password,
          })
          .then((response) => {
            commit("setStatus", "loggedin");
            commit("loggedUser", response.data);
            resolve(response);
          })
          .catch((error) => {
            commit("setStatus", "failLogin");
            reject(error);
          });
      });
    },
  },
  modules: {},
});
