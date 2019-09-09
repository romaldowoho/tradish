<template>
  <div class="wrap">
    <Card style="height: 100px; width: 200px; backgroundColor: rgb(37, 39, 46);">
      <div>
        <canvas id="smallChart"></canvas>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  props: {
    symbol: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      prices: [],
      dates: []
    };
  },
  beforeMount: function() {
    this.getPrices();
  },
  mounted: function() {
    this.createChart();
  },
  methods: {
    getPrices() {
      // [this.prices, this.dates] = api.getPrices(this.symbol, "1d", [], []);
      console.log("Prices are: ", this.prices);
    },
    createChart() {
      var ctx = document.getElementById("smallChart").getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.dates,
          datasets: [
            {
              backgroundColor: "transparent",
              borderColor: "rgb(19, 189, 137)",
              borderWidth: 1.5,
              data: this.prices
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

<style>
</style>