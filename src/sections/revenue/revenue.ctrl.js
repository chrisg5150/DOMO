'use strict';
angular
    .module('app.core')
    .controller('RevenueController', function($scope, $rootScope, PageData, $log, revenueData, $filter) {

        var timeMapping = {
          weekly:'sales_weekly',
          monthly:'sales_monthly'
        };
        var compMapping = {
          weekly:PageData.lang.wow,
          monthly:PageData.lang.mom
        };
        var metricMapping = {
          units:'units_shipped',
          dollars:'shipped_cogs'
        };

        //Setup view model object
        var vm = this;

        vm.getSum = function(items) {
          if(items && items.length > 0){
            return +((items
                .map(function(x) { return x[vm.currentMetric]; })
                .reduce(function(a, b) { return a + b; })).toFixed(2));
          } else {
            return 0;
          }
        };

        vm.getChange = function(a, b) {
            return a-b;
        };

        $scope.$on('time-change', function(event, val) {
            updateTime();
            updateMetric();
            updateChartData();
        });

        $scope.$on('metric-change', function(event, val) {
            updateMetric();
            updateChartData();
        });

        $scope.$on('bar-click', function(event, val) {
            openTable(val);
        });

        function updateMetric() {
          vm.currentMetric = metricMapping[PageData.optionBar.metricCurrent.val];
          vm.currentMetricPop = vm.pageData.lang['sales'+PageData.optionBar.metricCurrent.val+'pop'];
          vm.total = vm.getSum(vm.data);
          vm.prevTotal = vm.getSum(vm.prevData);
          vm.totalChange = vm.getChange(vm.total,vm.prevTotal);
          if(vm.totalChange >= 0){
            vm.changeClass = 'green';
          } else {
            vm.changeClass = 'red';
          }
        }

        function updateTime() {
          vm.currentTime = timeMapping[PageData.optionBar.timeCurrent.val];
          vm.data = orderData(PageData.domoData[vm.currentTime]);
          vm.prevData = orderData(PageData.domoData[vm.currentTime+'_append']);
          vm.compStr = compMapping[PageData.optionBar.timeCurrent.val];
          if(vm.data[0]){
            vm.totalDate = vm.data[0].report_date;
          }
        }

        function orderData(arr){
          vm.fieldTypes = ['','','','','','currency','',''];
          var data = [];
          if(arr) {
            data = arr.map(function(item) {
              var newItem = {};
              newItem.asin = item.asin;
              newItem.asin_name = item.asin_name;
              newItem.category = item.category;
              newItem.subcategory = item.subcategory;
              newItem.color = item.color;
              newItem.shipped_cogs = item.shipped_cogs;
              newItem.units_shipped = item.units_shipped;
              newItem.report_date = item.report_date;
              return newItem;
            });
          }
          return data;
        }

        function updateChartData(){
          var filteredData = $filter('groupBy')(vm.data, 'subcategory');
          var filteredPrevData = $filter('groupBy')(vm.prevData, 'subcategory');
          vm.chart.data = [];
          if(filteredData){
            angular.forEach(filteredData, function(value, key) {
              var dataObj = {
                subcategory:key,
                value:vm.getSum(value),
                category:value[0].category
              };
              if(filteredPrevData[key]){
                dataObj.prevValue = vm.getSum(filteredPrevData[key]);
              } else {
                dataObj.prevValue = 0;
              }
              vm.chart.data.push(dataObj);
            });
            vm.chart.data = $filter('orderBy')(vm.chart.data, 'value', true);
          }
        }

        function openTable(obj){
          var filteredData = $filter('filter')(vm.data, {subcategory:obj.subcategory});
          $rootScope.$broadcast('open-table', filteredData, vm.fieldTypes);
        }

        function init() {
          vm.pageData = PageData;

          vm.pageData.title = 'Revenue';
          vm.pageData.optionBar.show = true;
          vm.pageData.optionBar.opsShow = false;
          vm.pageData.optionBar.timeShow = true;
          vm.pageData.optionBar.metricShow = true;
          vm.changeClass = '';
          vm.chart = {};
          vm.chart.options = {
            responsive:true
          };
          vm.openTable = openTable;
          updateTime();
          updateMetric();
          updateChartData();

        }

        init();

    });
