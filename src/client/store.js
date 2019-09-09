import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mainChart: {
      symbol: "",
      prices: [],
      dates: []
    },
    user: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      balance: null,
      portfolio: [],
      watchlist: [],
      transactions: []
    }
  },
  getters: {
    GET_CHART_PRICES: state => {
      return state.mainChart.prices;
    },
    GET_CHART_DATES: state => {
      return state.mainChart.dates;
    },
    GET_CHART_SYMBOL: state => {
      return state.mainChart.symbol;
    },
    IS_LOGGEDIN: state => {
      return state.user.isLoggedIn;
    },
    GET_USER: state => {
      return state.user;
    }
  },
  mutations: {
    ADD_CHART_PRICES: (state, payload) => {
      state.mainChart.prices = payload;
    },
    ADD_CHART_DATES: (state, payload) => {
      state.mainChart.dates = payload;
    },
    ADD_CHART_SYMBOL: (state, payload) => {
      state.mainChart.symbol = payload;
    },
    SET_USER: (state, payload) => {
      for (let i in payload) {
        state.user[i] = payload[i];
      }
      console.log("USER UPDATED IN VUEX: ", state.user);
    },
    SET_LOGGED_STATE: (state, payload) => {
      state.user.isLoggedIn = payload;
    },
    RESET_CHART_DATA: state => {
      state.mainChart.symbol = "";
      state.mainChart.prices.length = 0;
      state.mainChart.dates.length = 0;
    }
  },
  actions: {
    ADD_CHART_PRICES: (context, payload) => {
      context.commit("ADD_CHART_PRICES", payload);
    },
    ADD_CHART_DATES: (context, payload) => {
      context.commit("ADD_CHART_DATES", payload);
    },
    ADD_CHART_SYMBOL: (context, payload) => {
      context.commit("ADD_CHART_SYMBOL", payload);
    },
    SET_USER: (context, payload) => {
      context.commit("SET_USER", payload);
    },
    SET_LOGGED_STATE: (context, payload) => {
      context.commit("SET_LOGGED_STATE", payload);
    },
    RESET_CHART_DATA: context => {
      context.commit("RESET_CHART_DATA");
    }
  }
});
