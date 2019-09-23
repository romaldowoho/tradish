<template>
  <div class="wrap">
    <div v-if="symbol" class="stock-info">
      <span class="symbol">
        <h1>{{symbol}}</h1>
      </span>
      <span class="price">
        <h1>${{lastPrice}}</h1>
      </span>
    </div>
    <Card style="height: 300px; width: 600px; backgroundColor: white;">
      <div>
        <canvas id="myChart"></canvas>
      </div>
    </Card>
    <div class="periods">
      <Tabs size="small" value="1d" @on-click="getChartData">
        <TabPane label="1D" name="1d"></TabPane>
        <TabPane label="1M" name="1mm"></TabPane>
        <TabPane label="1Y" name="1y"></TabPane>
        <TabPane label="5Y" name="5y"></TabPane>
        <TabPane label="MAX" name="max"></TabPane>
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
</template>

<script>
import Chart from "chart.js";
import moment from "moment-timezone";
import IEX from "./../api/IEX";
export default {
  name: "chart",
  props: {
    symbol: {
      type: String,
      required: false
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
  computed: {
    lastPrice() {
      let len = this.chartPrices.length;
      return this.chartPrices[len - 1];
    }
  },
  watch: {
    chartPrices: function(val) {
      this.chart.data.datasets[0].data = val;
      this.chart.update();
      this.emitTerminalInfo();
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
      this.getChartData("1d");
    }
  },
  beforeMount: function() {
    this.getChartData("1d");
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
      ] = await IEX.getChartData(this.symbol, name);
    },
    emitTerminalInfo() {
      let info = {
        symbol: this.symbol,
        price: this.lastPrice
      };
      this.$emit("terminalInfo", info);
    },
    createChart() {
      var ctx = document.getElementById("myChart").getContext("2d");
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
  justify-content: space-between;
}
.periods {
  position: relative;
  display: flex;
  justify-content: left;
  padding-top: 5px;
  font-weight: bold;
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
