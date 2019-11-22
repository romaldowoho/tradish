<template>
  <div class="wrap">
    <div class="stock-info">
      <span class="price" v-if="loaded">
        <h1>${{lastPrice | formatNumber}}</h1>
      </span>
    </div>
    <div>
      <Card style="height: 300px; width: 610px; backgroundColor: inherit;" dis-hover>
        <div v-show="loaded">
          <canvas id="chartDashboard"></canvas>
        </div>
        <div v-show="!loaded">
          <Spin class="spinner">
            <Icon type="ios-loading" class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
        </div>
      </Card>
      <div class="periods">
        <Tabs size="small" v-model="activeTab">
          <TabPane label="1D" name="1D"></TabPane>
          <TabPane label="1M" name="1M"></TabPane>
          <TabPane label="1Y" name="1Y"></TabPane>
          <TabPane label="5Y" name="5Y"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
          <TabPane :disabled="true"></TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import moment from "moment-timezone";
import IEX from "./../api/IEX";
import DB from "./../api/DB";
// import crosshair from "chartjs-plugin-crosshair";

export default {
  name: "chart-dashboard",
  data() {
    return {
      chart: null,
      day_data: {
        values: [],
        dates: []
      },
      activeTab: "1M",
      chartColor: "rgb(19, 189, 137)",
      loaded: true
    };
  },
  computed: {
    lastPrice() {
      if (this.chart) {
        let len = this.chart.data.datasets[0].data.length;
        return this.chart.data.datasets[0].data[len - 1];
      }
    },
    chart_data() {
      return this.$store.getters.GET_CHART_DATA;
    }
  },
  watch: {
    chartColor: function(val) {
      this.chart.data.datasets[0].borderColor = val;
      this.chart.update();
    },
    activeTab: function(val) {
      if (val == "1M") {
        console.log(this.chart_data);
        this.chart.data.datasets[0].data = this.chart_data.month_data.values;
        this.chart.data.labels = this.chart_data.month_data.dates;
        this.chart.update();
      } else if (val == "1Y") {
        this.chart.data.datasets[0].data = this.chart_data.year_data.values;
        this.chart.data.labels = this.chart_data.year_data.dates;
        this.chart.update();
      } else if (val == "5Y") {
        this.chart.data.datasets[0].data = this.chart_data.five_year_data.values;
        this.chart.data.labels = this.chart_data.five_year_data.dates;
        this.chart.update();
      }
    },
    loaded: function(val) {
      this.chart.data.datasets[0].data = this.chart_data.month_data.values;
      this.chart.data.labels = this.chart_data.month_data.dates;
      this.chart.update();
    }
  },
  beforeMount: function() {
    if (!this.chart_data.month_data.values.length) {
      this.getChartData();
    }
  },
  mounted: function() {
    this.createChart();
  },
  filters: {
    formatNumber(num) {
      return Number(num)
        .toFixed(2)
        .toString()
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }
  },
  methods: {
    async getChartData() {
      this.loaded = false;
      let data = await DB.getPortfolioHistory(this);
      this.$store.dispatch("SET_CHART_DATA", data);
      this.loaded = true;
    },
    createChart() {
      var ctx = document.getElementById("chartDashboard").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.chart_data.month_data.dates,
          datasets: [
            {
              backgroundColor: "transparent",
              borderColor: this.chartColor,
              borderWidth: 1.5,
              data: this.chart_data.month_data.values
            }
          ]
        },
        // Configuration options go here
        options: {
          plugins: {},
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
  justify-content: space-between;
}
.periods {
  position: relative;
  display: flex;
  justify-content: left;
  padding-top: 5px;
  font-weight: bold;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.spinner {
  margin-top: 120px;
}
.link {
  padding-right: 5px;
  font-size: 15px;
  font-weight: bold;
  color: rgb(37, 39, 46);
}
.link:active {
  color: rgba(19, 189, 137, 0.8);
}
:link {
  color: rgba(19, 189, 137, 0.8);
}
</style>
