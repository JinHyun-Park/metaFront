<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  data() {
    return {
      datacollection: {
        labels: ['임시저장', '승인요청', '접수중', '개발완료', '운영완료'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [1, 1, 3, 0, 1],
          },
        ],
      },
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
    this.renderChart(this.datacollection, this.options);
  },
};
</script>
