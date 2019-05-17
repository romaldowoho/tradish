<template>
  <div>
    <v-select :options="myOptions" v-model="selected"></v-select>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);
export default {
  name: "searchBar",
  data() {
    return {
      companies: null,
      myOptions: [],
      prices: [],
      dates: [],
      selected: null
    };
  },
  mounted() {
    axios
      .get(
        "https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_34cb74a42f4d4470ad6f93215427ba54"
      )
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.myOptions.push(res.data[i]["symbol"]);
        }
        this.companies = res.data;
        //console.log("companies data: ", this.companies);
      });
  },
  watch: {
    selected: function(val) {
      console.log("new value is: ", val);
      this.$store.dispatch("RESET_DATA");
      axios
        .get(
          `https://cloud.iexapis.com/stable/stock/${val}/chart/1m?token=pk_34cb74a42f4d4470ad6f93215427ba54`
        )
        .then(res => {
          console.log(res);
          this.prices.length = 0;
          for (let i = 0; i < res.data.length; i++) {
            this.prices.push(res.data[i]["close"]);
            this.dates.push(res.data[i]["date"]);
          }
          this.$store.dispatch("ADD_PRICES", this.prices);
          this.$store.dispatch("ADD_DATES", this.dates);
        });
    }
  }
};
</script>

<style>
</style>
