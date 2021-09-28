<template>
  <div>
    <h1 class="centralizado">Principal</h1>
    <div class="container">
      <div class="row">
        <div class="col col-sm-12 col-md-6 col-lg-4 g-3">
          <div class="card">
            <div class="card-header">CPU Usage %</div>
            <div class="card-body">
              <line-chart :chartData="cpuUsageData" :options="chartOptions"></line-chart>
            </div>
          </div>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-4 g-3">
          <div class="card">
            <div class="card-header">Memory Usage %</div>
            <div class="card-body">
              <line-chart :chartData="memoryUsageData" :options="chartOptions"></line-chart>
            </div>
          </div>
        </div>
        <div class="col col-sm-12 col-md-6 col-lg-4 g-3">
          <div class="card text-white mb-3" :class="clusterStatusBG">
            <div class="card-header">Cluster Status</div>
            <div class="card-body">
              <h5 class="card-title">{{ clusterStatus }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '../shared/line-chart/LineChart';

export default {
  components: {
    LineChart
  },
  computed: {
    clusterStatusBG() {
      const bgMap = {
        green: 'bg-success',
        red: 'bg-danger'
      }
      return bgMap[this.clusterStatus];
    }
  },
  data() {
    return {
      isLoading: true,
      cpuUsageData: { labels:[], datasets: [] },
      memoryUsageData: { labels:[], datasets: [] },
      clusterStatus: { labels:[], datasets: [] },
      chartOptions: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    fetchElasticData() {
      Promise
        .all([
          this.$client.get('/elastic/cpu-usage').then(({ data }) => {
            const { labels, data: _data } = data;
            this.cpuUsageData = {
              labels,
              datasets: [{
                data: _data,
                fill: false,
                borderColor: '#2554FF',
                borderWidth: 1
              }]
            };
          }),
          this.$client.get('/elastic/memory-usage').then(({ data }) => {
            const { labels, data: _data } = data;
            this.memoryUsageData = {
              labels,
              datasets: [{
                data: _data,
                fill: false,
                borderColor: '#2554FF',
                borderWidth: 1
              }]
            };
          }),
          this.$client.get('/elastic/cluster-status').then(({ data }) => this.clusterStatus = data.status)
        ])
        .then(() => this.isLoading = false)
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.fetchElasticData();
  }
}
</script>

<style>
</style>
