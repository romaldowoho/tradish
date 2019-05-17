<template>
  <div style="height:600px; width:800px;">
    <canvas id="myChart"></canvas>
    <div>
      <button @click="addValue()">Add value</button>
      <button @click="updateChart()">Update chart</button>
      <button @click="getPrices()">Get new prices</button>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import { setInterval } from "timers";
export default {
  name: "Chart",
  data() {
    return {
      chart: null
    };
  },
  mounted: function() {
    this.createChart();
  },
  computed: {
    dataset() {
      return this.$store.getters.GET_PRICES;
    },
    labels() {
      return this.$store.getters.GET_DATES;
    }
  },
  watch: {
    dataset(newData, oldData) {
      this.chart.data.datasets[0].data = newData;
      this.chart.update();
    },
    labels(newData, oldData) {
      this.chart.data.labels = newData;
      this.chart.update();
    }
  },
  methods: {
    createChart() {
      var ctx = document.getElementById("myChart").getContext("2d");
      this.chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Stock X",
              backgroundColor: "transparent",
              borderColor: "rgb(19, 189, 137)",
              data: this.dataset
            }
          ]
        },
        // Configuration options go here
        options: {
          elements: {
            line: {
              tension: 0
            },
            point: {
              radius: 0,
              hitRadius: 5,
              backgroundColor: "rgb(19, 189, 137)",
              borderColor: "rgb(19, 189, 137)"
            }
          },
          tooltips: {
            mode: "nearest"
          },
          intersect: true
        }
      });
    },
    addValue() {
      this.dataset.push(Math.random() * 100);
      this.labels.push(Math.random() * 100);
      this.chart.update();
    },
    updateChart() {
      this.chart.update();
    },
    getPrices() {
      console.log(this.$store.state.prices);
      console.log(this.$store.state.dates);
    }
  }
};
</script>

<style>
</style>
