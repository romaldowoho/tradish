<template>
  <div class="searchBar">
    <Card :bordered="false" :padding="0">
      <v-select class="selector" label="searchLabel" :options="companies" v-model="selected"></v-select>
    </Card>
  </div>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import IEX from "../api/IEX";
import { setTimeout } from "timers";

Vue.component("v-select", vSelect);
export default {
  name: "searchBar",
  data() {
    return {
      companies: [],
      selected: "Search"
    };
  },
  beforeMount() {
    this.companies = IEX.getSymbols();
  },
  watch: {
    selected: function(val) {
      if (val && val !== "Search") {
        this.selected = "Search";
        this.$router.push(`/stocks/${val.symbol}`, () => {}, err => {});
      }
    }
  }
};
</script>

<style scoped>
.searchBar {
  width: 1000px;
}
.selector .vs__search::placeholder,
.selector .vs__dropdown-toggle,
.selector .vs__dropdown-menu {
  border: none;
  color: red;
}
</style>
