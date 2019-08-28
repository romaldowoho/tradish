<template>
  <div class="searchBar">
    <v-select label="searchLabel" :options="companies" v-model="selected"></v-select>
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
      selected: "Search",
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
        company.symbol,
        period,
        pricesArray,
        datesArray
      );
      this.$store.dispatch("ADD_PRICES", this.prices);
      this.$store.dispatch("ADD_DATES", this.dates);
      this.$store.dispatch("ADD_SYMBOL", this.selected.symbol);
    }
  }
};
</script>

<style scoped>
.searchBar {
  width: 1000px;
}
.link {
  padding: 2px;
  font-size: 2em;
}
</style>
