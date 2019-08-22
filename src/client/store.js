import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    prices: [],
    dates: []
  },
  getters: {
    GET_PRICES: state => {
      return state.prices;
    },
    GET_DATES: state => {
      return state.dates;
    }
  },
  mutations: {
    ADD_PRICES: (state, payload) => {
      state.prices = payload;
    },
    ADD_DATES: (state, payload) => {
      state.dates = payload;
    },
    RESET_DATA: state => {
      state.prices.length = 0;
      state.dates.length = 0;
    }
  },
  actions: {
    ADD_PRICES: (context, payload) => {
      context.commit("ADD_PRICES", payload);
    },
    ADD_DATES: (context, payload) => {
      context.commit("ADD_DATES", payload);
    },
    RESET_DATA: context => {
      context.commit("RESET_DATA");
    }
  }
});
