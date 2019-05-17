<template>
  <div class="home">
    <Chart/>
    <SearchBar/>
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
