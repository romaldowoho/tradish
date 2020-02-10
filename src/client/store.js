import Vue from "vue";
import Vuex from "vuex";
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
    chart_data: {
      month_data: {
        values: [],
        dates: []
      },
      year_data: {
        values: [],
        dates: []
      },
      five_year_data: {
        values: [],
        dates: []
      }
    },
    totalEquity: null
  },
  getters: {
    GET_USER: state => {
      return state.user;
    },
    GET_TOTAL_EQUITY: state => {
      return state.totalEquity;
    },
    GET_CHART_DATA: state => {
      return state.chart_data;
    }
  },
  mutations: {
    SET_USER: (state, payload) => {
      for (let i in payload) {
        state.user[i] = payload[i];
      }
    },
    SET_TOTAL_EQUITY: (state, payload) => {
      state.totalEquity = payload;
    },
    SET_CHART_DATA: (state, payload) => {
      state.chart_data = payload;
    }
  },
  actions: {
    SET_USER: (context, payload) => {
      context.commit("SET_USER", payload);
    },
    SET_TOTAL_EQUITY: (context, payload) => {
      context.commit("SET_TOTAL_EQUITY", payload);
    },
    SET_CHART_DATA: (context, payload) => {
      context.commit("SET_CHART_DATA", payload);
    }
  }
});
