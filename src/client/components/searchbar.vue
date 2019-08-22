<template>
  <div class="searchBar">
    <v-select label="searchLabel" :options="companies" v-model="selected"></v-select>
    <div class="periods">
      <a value="1d" class="link" @click="getPrices(selected, '1d', prices, dates)">1d</a>
      <a value="1m" class="link" @click="getPrices(selected, '1m', prices, dates)">1m</a>
      <a value="1y" class="link" @click="getPrices(selected, '1y', prices, dates)">1y</a>
      <a value="5y" class="link" @click="getPrices(selected, '5y', prices, dates)">5y</a>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import api from "../api/api.js";

Vue.component("v-select", vSelect);
export default {
  name: "searchBar",
  data() {
    return {
      companies: [],
      prices: [],
      dates: [],
      selected: "Choose the stock",
      period: "1m"
    };
  },
  mounted() {
    api.getSymbols(this.companies);
    //console.log(this.companies);
  },
  watch: {
    selected: function(val) {
      if (val) {
        this.$store.dispatch("RESET_DATA"); //resetting store data
        this.getPrices(val, this.period, this.prices, this.dates);
      }
    }
  },
  methods: {
    getPrices: function(company, period, pricesArray, datesArray) {
      this.$store.dispatch("RESET_DATA");
      this.prices = [];
      this.dates = [];
      [this.prices, this.dates] = api.getPrices(
        company["symbol"],
        period,
        pricesArray,
        datesArray
      );
      this.$store.dispatch("ADD_PRICES", this.prices);
      this.$store.dispatch("ADD_DATES", this.dates);
    }
  }
};
</script>

<style scoped>
.searchBar {
  width: 1000px;
}
.periods {
  display: flex;
  justify-content: left;
  padding: 5px;
}
.link {
  padding: 2px;
  font-size: 2em;
}
</style>
