<script>
import { Bar, mixins } from 'vue-chartjs';
// Getting the reactiveProp mixin from the mixins module.
const { reactiveProp } = mixins;
export default {
  extends: Bar,
  mixins: [reactiveProp],
  data() {
    return {
      // Chart.js options that control the appearance of the chart
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 100,
            },
            gridLines: {
              display: true,
            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
          }],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.renderChart(this.chartData, this.options);
        // this.$data._chart.update();
      },
    },
  },
  mounted() {
    // this.chartData is created in the mixin and contains all the data needed to build the chart.
    this.renderChart(this.chartData, this.options);
  },
};
</script>
