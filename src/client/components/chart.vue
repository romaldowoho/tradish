<template>
  <div class="wrap">
    <div v-if="main" class="stock-info">
      <span class="symbol">
        <h1>{{this.$store.getters.GET_SYMBOL}}</h1>
      </span>
      <span class="price">
        <h1>{{dataset[dataset.length - 1]}}</h1>
      </span>
    </div>
    <Card style="height: 300px; width: 600px; backgroundColor: rgb(37, 39, 46);">
      <div>
        <canvas id="myChart"></canvas>
      </div>
    </Card>
  </div>
</template>

<script>
import Chart from "chart.js";
import moment from "moment";
export default {
  name: "Chart",
  props: {
    main: Boolean
  },
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
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              backgroundColor: "transparent",
              borderColor: "rgb(19, 189, 137)",
              borderWidth: 1.5,
              data: this.dataset
            }
          ]
        },
        // Configuration options go here
        options: {
          legend: {
            display: false
          },
          hover: {
            intersect: false
          },
          responsive: true,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  display: false
                }
              }
            ]
          },
          elements: {
            line: {
              tension: 0
            },
            point: {
              backgroundColor: "rgba(19, 189, 137,0.8)",
              radius: 0,
              hoverRadius: 3,
              hitRadius: 2
            }
          },
          tooltips: {
            mode: "index",
            intersect: false,
            custom: function(tooltip) {
              if (!tooltip) return;
              tooltip.displayColors = false;
            },
            callbacks: {
              label: function(tooltipItem, data) {
                return "$" + tooltipItem.yLabel;
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.wrap {
  display: block;
}
.stock-info {
  display: flex;
}
.symbol {
  text-align: left;
  padding-left: 5px;
}
</style>
