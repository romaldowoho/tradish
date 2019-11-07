import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      balance: null,
      holdings: [],
      watchlist: [],
      transactions: []
    },
    totalEquity: null
  },
  getters: {
    IS_LOGGEDIN: state => {
      return state.user.isLoggedIn;
    },
    GET_USER: state => {
      return state.user;
    },
    GET_TOTAL_EQUITY: state => {
      return state.totalEquity;
    }
  },
  mutations: {
    SET_USER: (state, payload) => {
      for (let i in payload) {
        state.user[i] = payload[i];
      }
      console.log("USER UPDATED IN VUEX: ", state.user);
    },
    SET_TOTAL_EQUITY: (state, payload) => {
      state.totalEquity = payload;
    },
    SET_LOGGED_STATE: (state, payload) => {
      state.user.isLoggedIn = payload;
    }
  },
  actions: {
    SET_USER: (context, payload) => {
      context.commit("SET_USER", payload);
    },
    SET_TOTAL_EQUITY: (context, payload) => {
      context.commit("SET_TOTAL_EQUITY", payload);
    },
    SET_LOGGED_STATE: (context, payload) => {
      context.commit("SET_LOGGED_STATE", payload);
    }
  }
});
