'use strict';
angular
    .module('app.core')
    .controller('OperationsController', function($scope, $rootScope, PageData, $log, operationsData, $filter) {
        var trendsMetrics = [
          'Accepted confirmation rate',
          'Receive fill rate'
        ];
        var vltMetrics = [
          'PO Submit to Confirm (days)',
          'Prep time (days)',
          'Transit time (days)',
          'Ready to deliver time (days)',
          'Delivery to receipt time (days)',
          'Unspecified time (days)'
        ];
        var totalMetric = 'Overall VLT (days)';
        var colors=[
          '#72b0d7',
          '#80c25d',
          '#fb8d33',
          '#b391ca',
          '#69bea8',
          '#ee76bf',
          '#fd7f76'
        ];

        var barColors=[
          {
              backgroundColor: '#72b0d7',
              borderColor: '#72b0d7',
              hoverBackgroundColor: '#72b0d7',
              hoverBorderColor: '#72b0d7'
          },
          {
              backgroundColor: '#80c25d',
              borderColor: '#80c25d',
              hoverBackgroundColor: '#80c25d',
              hoverBorderColor: '#80c25d'
          },
          {
              backgroundColor: '#fb8d33',
              borderColor: '#fb8d33',
              hoverBackgroundColor: '#fb8d33',
              hoverBorderColor: '#fb8d33'
          },
          {
              backgroundColor: '#b391ca',
              borderColor: '#b391ca',
              hoverBackgroundColor: '#b391ca',
              hoverBorderColor: '#b391ca'
          },
          {
              backgroundColor: '#69bea8',
              borderColor: '#69bea8',
              hoverBackgroundColor: '#69bea8',
              hoverBorderColor: '#69bea8'
          },
          {
              backgroundColor: '#ee76bf',
              borderColor: '#ee76bf',
              hoverBackgroundColor: '#ee76bf',
              hoverBorderColor: '#ee76bf'
          }
        ];
        //Setup view model object
        var vm = this;

        $scope.$on('ops-change', function(event, val) {
        });

        function updateChartData(){
          var origData = vm.pageData.domoData.operational_metrics;
          var tempData = [];
          var tempTrends = [];
          var tempVlt = [];
          var combinedData = [];
          var combinedMetrics = trendsMetrics.concat(vltMetrics);

          combinedMetrics.push(totalMetric);

          angular.forEach(combinedMetrics, function(val, key) {
            var fil = $filter('filter')(origData, {Metric:val});
            combinedData = combinedData.concat(fil);
          });

          $log.log('combinedData',combinedData);
          // convert to a normal array
          angular.forEach(combinedData, function(value, key) {
            angular.forEach(value, function(va, ke) {
              if(ke !== 'Batch Date' && ke !== 'Goal' && ke !== 'Metric' && ke !== 'Report Date'){
                var dataObj = {
                  Goal:value.Goal,
                  Metric:value.Metric,
                  report_date:value['Report Date'],
                  date:moment(ke,'MMM YYYY').format('YYYY-MM-DD'),
                  dateLabel:ke,
                  value:va
                };
                tempData.push(dataObj);
              }
            });
          });

          // get totals
          var tot = $filter('filter')(tempData, {Metric:totalMetric});
          tot = $filter('orderBy')(tot, 'date');
          $log.log('tot',tot);
          angular.forEach(tot, function(val, key) {
            var fil = $filter('filter')(tempData, {date:val.date});

            var vltVals = fil.map(function(x) {
              if(vltMetrics.indexOf(x.Metric) > -1){
                return Number(x.value);
              }
              return 0; })
            .reduce(function(a, b) { return a + b; });
            var diff = Number(val.value) - vltVals;

            var undObj = {
              Goal:0,
              Metric:vltMetrics[5],
              report_date:val.report_date,
              date:val.date,
              dateLabel:val.dateLabel,
              value:(diff>0)?diff.toFixed(2):0
            };
            tempData.push(undObj);

          });

          vm.total = Number(tot[tot.length-1].value).toFixed(1);
          vm.prevTotal = Number(tot[tot.length-2].value).toFixed(1);
          vm.totalDate = tot[tot.length-1].report_date;
          $log.log('vm.total',vm.total);
          $log.log('vm.prevTotal',vm.prevTotal);
          $log.log('vm.totalDate',vm.totalDate);
          vm.totalChange = vm.getChange(vm.total,vm.prevTotal);

          // filter out trends
          vm.chart.trends.all = {};
          vm.chart.trends.all.series = [];
          vm.chart.trends.all.data = [];
          angular.forEach(trendsMetrics, function(val, key) {
            var fil = $filter('filter')(tempData, {Metric:val});
            fil = $filter('orderBy')(fil, 'date');
            vm.chart.trends[val] = {
              labels:fil.map(function(x) { return x.dateLabel; }),
              data:fil.map(function(x) { return Number(x.value.replace('%','').trim()); }),
              series:val
            };
            vm.chart.trends.all.labels = vm.chart.trends[val].labels;
            vm.chart.trends.all.series.push(val);
            vm.chart.trends.all.data.push(vm.chart.trends[val].data);
          });
          vm.chart.trends.currentData = vm.chart.trends.all;
          vm.chart.trends.options = {
            responsive:true,
            maintainAspectRatio: false,
            legend:{
                display: true
            },
            scales: {
              xAxes: [{
                stacked: false,
              }],
              yAxes: [{
                stacked: false,
                ticks: {
                    callback: function(label, index, labels) {
                        return label+'%';
                    }
                }
              }]
            },
            tooltips: {
                mode: 'label',
                callbacks: {
                    label: function(tooltipItem, data) {
                      var label = data.datasets[tooltipItem.datasetIndex].label;
                      var val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                      return label + " " + val + "%";
                    }
                }
            }
          };
          // filter out vlt
          vm.chart.vlt.all = {};
          vm.chart.vlt.all.series = [];
          vm.chart.vlt.all.data = [];
          var vltSumData = 0;
          var vltPrevSumData = 0;
          var totalDate = '';
          angular.forEach(vltMetrics, function(val, key) {
            var fil = $filter('filter')(tempData, {Metric:val});
            fil = $filter('orderBy')(fil, 'date');
            var labels = fil.map(function(x) { return x.dateLabel; });
            var data = fil.map(function(x) { return Number(x.value); });

            vm.chart.vlt.all.labels = labels;
            vm.chart.vlt.all.series.push(val.replace(' (days)',''));
            vm.chart.vlt.all.data.push(data);
            // get sum data
            vltSumData += Number(fil[fil.length-1].value);
            vltPrevSumData += Number(fil[fil.length-2].value);
            totalDate = fil[0]['Report Date'];
          });
          vm.chart.vlt.options = {
            responsive:true,
            maintainAspectRatio: false,
            title:{
              display:true,
              text:'Vendor Lead Time (Days)'
            },
            legend:{
                display: true
            },
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true
              }]
            },
            tooltips: {
                mode: 'label',
                callbacks: {
                    label: function(tooltipItem, data) {
                      var label = data.datasets[tooltipItem.datasetIndex].label;
                      var val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                      var total = 0;
                      for (var i = 0; i < data.datasets.length; i++){
                          total += data.datasets[i].data[tooltipItem.index];
                      }
                      var totalStr = Number(total).toFixed(2);
                      if (tooltipItem.datasetIndex != data.datasets.length - 1) {
                          return label + " " + val;
                      } else {
                          return [label + " " + val, "Total : " + totalStr];
                      }

                    }
                }
            }
          };
          vm.chart.vlt.all.type = 'StackedBar';
          vm.chart.vlt.currentData = vm.chart.vlt.all;


          if(vm.totalChange <= 0){
            vm.changeClass = 'green';
          } else {
            vm.changeClass = 'red';
          }
        }

        vm.getChange = function(a, b) {
            return a-b;
        };

        vm.getSum = function(items) {
          if(items && items.length > 0){
            return +((items
                .reduce(function(a, b) { return a + b; })).toFixed(2));
          } else {
            return 0;
          }
        };

        function init() {
          vm.pageData = PageData;

          vm.pageData.title = 'Operations';
          vm.pageData.icon = 'img-operations-sm';
          vm.pageData.optionBar.show = true;
          vm.pageData.optionBar.opsShow = true;
          vm.pageData.optionBar.timeShow = false;
          vm.pageData.optionBar.metricShow = false;
          vm.changeClass = '';
          vm.compStr = PageData.lang.mom;
          vm.chart = {};
          vm.chart.colors = colors;
          vm.chart.barColors = barColors;
          vm.chart.trends = {};
          vm.chart.vlt = {}
          vm.chart.options = {
            responsive:true,
            legend:{
                display: true

            }
          };

          updateChartData();

          $log.log('vm',vm);
        }

        init();

    });
