<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
import Chart from "@/client/components/chart.vue";
import SearchBar from "@/client/components/searchbar.vue";

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
  margin-left: 250px;
  margin-right: 190px;
}
</style>

