'use strict';
angular
    .module('app.core')
    .controller('RevenueController', function($scope, $rootScope, PageData, $log, revenueData, $filter, $location) {

        var compMapping = {
          MTD:PageData.lang.mom,
          YTD:PageData.lang.yoy,
          TR12:PageData.lang.pop,
          TR3YR:PageData.lang.pop
        };
        
        //Setup view model object
        var vm = this;

        vm.getSum = function(items, metric) {
          if(items && items.length > 0){
            return +((items
                .map(function(x) { return x[metric]||0; })
                .reduce(function(a, b) { return a + b; })).toFixed(2));
          } else {
            return 0;
          }
        };

        vm.getAvg = function(items, metric) {
          if(items && items.length > 0){
            var len = items.length;
            var reduced = (items
                .map(function(x) { return x[metric]||0; })
                .reduce(function(a, b) { return a + b; }));
            return +((reduced/len).toFixed(2));
          } else {
            return 0;
          }
        };

        vm.getChange = function(a, b) {
            return a-b;
        };

        $scope.$on('time-change', function(event, val) {
          updateAll();
        });

        $scope.$on('metric-change', function(event, val) {
          updateAll();
        });

        $scope.$on('agg-change', function(event, val) {
          updateAll();
        });

        $scope.$on('view-change', function(event, val) {
          updateAll();
      });

        $scope.$on('bar-click', function(event, val) {
          if(PageData.optionBar.viewCurrent.val === 'repGroupDesc') {
            openDrill(val);
          }  
        });

        function updateAll() {
          updateData();
          updateMetric();
          updateChartData();
        }

        function updateMetric() {
          var agg = PageData.optionBar.aggCurrent.val;
          
          vm.total = vm['get'+agg](vm.data, 'value');
          vm.prevTotal = vm['get'+agg](vm.data, 'prevValue');
          vm.totalChange = vm.getChange(vm.total,vm.prevTotal);
          if(vm.totalChange >= 0){
            vm.changeClass = 'green';
          } else {
            vm.changeClass = 'red';
          }
        }

        function updateData() {
          vm.data = orderData(PageData.domoData.revenue_volume);
          vm.compStr = compMapping[PageData.optionBar.timeCurrent.val];
        }

        function orderData(arr){
          var data = [];
          if(arr) {
            var currTime = PageData.optionBar.timeCurrent.val;
            var currMetric = PageData.optionBar.metricCurrent.val;
            var currView = PageData.optionBar.viewCurrent.val;
            var currAgg = PageData.optionBar.aggCurrent.val;
            data = arr.map(function(item) {
              var newItem = {};
              newItem.value = item[currTime+'_'+currMetric];
              newItem.prevValue = item['prevYear_'+currTime+'_'+currMetric];
              newItem.name = item[currView]||'Unknown';
              newItem.id = item.repGroupID;
              newItem.report_date = item.businessDate;
              newItem.repId = item.repID;
              return newItem;
            })
          }
          return data;
          
        }

        function updateChartData(){
          var filteredData = $filter('groupBy')(vm.data, 'name');
          vm.chart.data = [];
          if(filteredData){
            angular.forEach(filteredData, function(value, key) {
              var agg = PageData.optionBar.aggCurrent.val;
              var dataObj = {
                subcategory:key||'Unknown',
                id:value[0].id,
                value:vm['get'+agg](value, 'value'),
                prevValue: vm['get'+agg](value, 'prevValue')
                
              };
              
              vm.chart.data.push(dataObj);
            });
            vm.chart.data = $filter('orderBy')(vm.chart.data, 'value', true);
          }
        }

        function openDrill(val) {
          var filteredData = $filter('where')(vm.data, {name:val.subcategory});
          $rootScope.$broadcast('open-drill', filteredData); 
          $location.path('groups/'+val.id);
        }

        function init() {
          vm.pageData = PageData;

          vm.pageData.title = 'Revenue';
          vm.pageData.optionBar.show = true;
          vm.pageData.optionBar.aggShow = true;
          vm.pageData.optionBar.timeShow = true;
          vm.pageData.optionBar.metricShow = false;
          vm.pageData.optionBar.viewShow = true;
          vm.pageData.optionBar.backShow = false;
          vm.pageData.optionBar.viewAccountShow = false;
          vm.pageData.optionBar.metricAccountShow = false;
          vm.pageData.metricType = 'currency';
          vm.pageData.optionBar.metricCurrent = {
            name:'Revenue',
            val:'Revenue'
          };         
          vm.changeClass = '';
          vm.chart = {};
          vm.chart.options = {
            responsive:true
          };
          vm.openDrill = openDrill;
          updateAll();
        }

        init();

    });
