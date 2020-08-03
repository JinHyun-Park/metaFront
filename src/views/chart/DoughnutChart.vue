<script>
import { Doughnut, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        scales: {
          gridLines: {
            color: 'black',
            lineWidth: 5,
          },
          pointLabels: {
            fontColor: 'black',
          },
          ticks: {
            suggestedMax: 100,
            beginAtZero: true,
            min: 0,
            max: 5,
            stepSize: 1,
          },
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
