'use strict';
angular
    .module('app.core')
    .controller('GroupsController', function($scope, $rootScope, PageData, $log, groupsData, $filter, $routeParams) {

        var compMapping = {
          MTD:PageData.lang.mom,
          YTD:PageData.lang.yoy,
          TR12:PageData.lang.pop,
          TR3YR:PageData.lang.pop
        };
        
        //Setup view model object
        var vm = this;

        vm.groupId = $routeParams.groupId;

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
            data = $filter('where')(arr, {repGroupID:vm.groupId});
            data = data.map(function(item) {
              
              var newItem = {};
              newItem.value = item[currTime+'_'+currMetric];
              newItem.prevValue = item['prevYear_'+currTime+'_'+currMetric];
              newItem.name = item.repName||'Unknown';
              newItem.report_date = item.businessDate;
              return newItem;
            });
          }
          return data;
        }

        function updateChartData(){
          //var filteredDataView = $filter('where')(vm.data, 'name' = 'None')
          var filteredData = $filter('groupBy')(vm.data, 'name');
          vm.chart.data = [];
          if(filteredData){
            angular.forEach(filteredData, function(value, key) {
              var agg = PageData.optionBar.aggCurrent.val;
              
              var dataObj = {
                subcategory:key,
                value:vm['get'+agg](value, 'value'),
                prevValue: vm['get'+agg](value, 'prevValue'),
              };
              
              vm.chart.data.push(dataObj);
              
            });
            vm.chart.data = $filter('orderBy')(vm.chart.data, 'value', true);
          }
        }

        

        function init() {
          vm.pageData = PageData;

          vm.pageData.title = 'Reps';
          vm.pageData.optionBar.show = true;
          vm.pageData.optionBar.aggShow = true;
          vm.pageData.optionBar.timeShow = true;
          vm.pageData.optionBar.metricShow = false;
          vm.pageData.optionBar.viewShow = false;
          vm.pageData.optionBar.backShow = true;
          vm.pageData.optionBar.viewAccountShow = false;
          vm.pageData.optionBar.metricAccountShow = false;
          vm.pageData.optionBar.metricCurrent = {
            name:'Revenue',
            val:'Revenue'
          };         
          vm.changeClass = '';
          vm.chart = {};
          vm.chart.options = {
            responsive:true
          };
         // vm.openDrill = openDrill;
          updateAll();
        }

        init();

    });
