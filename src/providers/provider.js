import Vuex from "vuex";
import Vue from "vue";
import client from "../config/ApiClient";

Vue.use(Vuex);

let user = {};

try {
  user = JSON.parse(localStorage.getItem("user"));
} catch (e) {
  console.log(e);
}

const state = {
  token: localStorage.getItem("token"),
  user
};

const mutations = {
  SET_LOGGED_USER(state, { token, user }) {
    state.token = token;
    state.user = user;
    return state;
  },
  UNSET_LOGGED_USER(state) {
    state.token = null;
    state.user = {};
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return state;
  }
};

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      client
        .post("/auth/login", user)
        .then(response => {
          commit("SET_LOGGED_USER", {
            token: response.data.token,
            user: response.data.user
          });
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          resolve(response.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return commit("UNSET_LOGGED_USER");
  }
};

const getters = {
  isLogged(state) {
    return !!state.token;
  },
  getLoggedUser(state) {
    return state.user;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
