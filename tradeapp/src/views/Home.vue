<template>
  <div class="home">
    <SearchBar/>
    <Chart/>
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from "@/components/chart.vue";
import SearchBar from "@/components/searchbar.vue";

export default {
  name: "home",
  components: {
    Chart,
    SearchBar
  }
};
</script>

<style>
.home {
  display: block;
  background-color: darkgrey;
  margin-left: 350px;
  margin-right: 390px;
}
</style>

