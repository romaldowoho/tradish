<template>
  <div class="searchBar">
    <Card :bordered="false" :padding="0">
      <v-select
        class="selector"
        label="searchLabel"
        placeholder="Search"
        :filterable="true"
        :options="companies"
        v-model="selected"
      ></v-select>
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
      selected: ""
    };
  },
  beforeMount() {
    this.companies = IEX.getSymbols();
  },
  watch: {
    selected: function(val) {
      if (val && val !== "Search") {
        this.selected = "Search";
        this.$router.push(
          `/stocks/${val.symbol}`,
          () => {},
          err => {}
        );
      }
    }
  }
};
</script>

<style>
.searchBar {
  width: 500px;
}
.selector .vs__search::placeholder {
  text-transform: lowercase;
  font-variant: small-caps;
}
.selector .vs__dropdown-toggle {
  background: rgba(241, 189, 167, 0.103);
}

.selector .vs__dropdown-menu {
  background: #fdf8f5;
  text-transform: lowercase;
  font-variant: small-caps;
}
</style>
