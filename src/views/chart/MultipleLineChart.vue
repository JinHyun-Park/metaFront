<script>
import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        scales: {
          yAxes: [{
            id:'first-y-axis',
            ticks: {
              suggestedMax: 5,
              beginAtZero: true,
              // stepSize: 1,
            },
            gridLines: {
              display: true,
            },
            scaleLabel: {
              display: true,
            },
          }, {
            id:'second-y-axis',
            ticks: {
              suggestedMax: 5,
              beginAtZero: true,
              // stepSize: 1,
            },
            gridLines: {
              display: true,
            },
            scaleLabel: {
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
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
