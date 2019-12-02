<template>
  <div class="chart-light-wrap">
    <div class="chart-light" style>
      <canvas :id="id"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import IEX from "./../api/IEX";
export default {
  name: "chart-light",
  props: {
    symbol: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      chartPrices: [],
      chartDates: [],
      chartColor: "rgb(19, 189, 137)"
    };
  },
  watch: {
    chartPrices: function(val) {
      this.chart.data.datasets[0].data = val;
      this.chart.update();
    },
    chartDates: function(val) {
      this.chart.data.labels = val;
      this.chart.update();
    },
    chartColor: function(val) {
      this.chart.data.datasets[0].borderColor = val;
      this.chart.update();
    },
    symbol: function(val) {
      this.getChartData("1m");
    }
  },
  beforeMount: function() {
    this.getChartData("1m");
  },
  mounted: function() {
    this.createChart();
  },
  methods: {
    async getChartData(name) {
      [
        this.chartPrices,
        this.chartDates,
        this.chartColor
      ] = await IEX.getChartData(this.symbol, name, true);
    },
    createChart() {
      var ctx = document.getElementById(this.id).getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.chartDates,
          datasets: [
            {
              backgroundColor: "transparent",
              borderColor: this.chartColor,
              borderWidth: 1.5,
              data: this.chartPrices
            }
          ]
        },
        // Configuration options go here
        options: {
          animation: {
            easing: "easeInOutQuart",
            duration: 0
          },
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
                  display: false,
                  drawBorder: false
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
              enabled: false,
              radius: 0,
              hoverRadius: 0
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.chart-light-wrap {
  display: flex;
  padding: 0;
  margin: 0;
}
.chart-light {
  height: 60px;
  width: 80px;
  background-color: inherit;
  padding: 0;
}
</style>
