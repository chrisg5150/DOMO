'use strict';
angular
    .module('app.core')
    .controller('LostbuyboxController', function($scope, $rootScope, PageData, $log, lostbuyboxData, $filter) {

        var metricMapping = {
          units:'lost_units',
          dollars:'lost_sales'
        };

        //Setup view model object
        var vm = this;

        $scope.$on('metric-change', function(event, val) {
            updateMetric();
            updateChartData();
        });

        $scope.$on('bar-click', function(event, val) {
            openTable(val);
        });

        function updateMetric() {
          vm.currentMetric = metricMapping[PageData.optionBar.metricCurrent.val];
          vm.currentMetricPop = vm.pageData.lang['lbblost'+PageData.optionBar.metricCurrent.val+'pop'];
          // LBB totals
          vm.total = vm.summaryLBB;
          vm.prevTotal = vm.prevSummaryLBB;
          vm.totalChange = vm.getChange(vm.total,vm.prevTotal,true);
          // Lost Sales totals
          vm.totalLostSales = vm.getSum(vm.data);
          vm.prevTotalLostSales = vm.getSum(vm.prevData);
          vm.totalLostSalesChange = vm.getChange(vm.totalLostSales,vm.prevTotalLostSales,true);

          if(vm.data[0]){
            vm.totalDate = vm.data[0].report_date;
          }

          if(vm.totalChange <= 0){
            vm.changeClass = 'green';
          } else {
            vm.changeClass = 'red';
          }
          if(vm.totalLostSalesChange <= 0){
            vm.changeLostSalesClass = 'green';
          } else {
            vm.changeLostSalesClass = 'red';
          }
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

        function joinData(){
          // summary data
          vm.summaryData = PageData.domoData.fasttrack_summary.map(function(item) {
            item.lost_buy_box = percentToNum(item.lost_buy_box);
            item.fast_track_buy_box = percentToNum(item.fast_track_buy_box);
            item.out_of_stock = percentToNum(item.out_of_stock);
            return item;
          });
          vm.prevSummaryData = PageData.domoData.fasttrack_summary_append.map(function(item) {
            item.lost_buy_box = percentToNum(item.lost_buy_box);
            item.fast_track_buy_box = percentToNum(item.fast_track_buy_box);
            item.out_of_stock = percentToNum(item.out_of_stock);
            return item;
          });

          vm.summaryLBB = vm.summaryData[0].lost_buy_box;
          vm.prevSummaryLBB = (vm.prevSummaryData.length>0)?vm.prevSummaryData[0].lost_buy_box:0;
          // item data
          var joinedData = alasql('select fast.*, cost.cost, forecast.current_week as units from ? as fast join ? as cost on fast.asin = cost.asin join ? as forecast on fast.asin = forecast.asin',
          [
            PageData.domoData.fasttrack_instock,
            PageData.domoData.item_costs,
            PageData.domoData.demand_forecast
          ]);

          var joinedPrevData = alasql('select fast.*, cost.cost, forecast.weekm1 as units from ? as fast join ? as cost on fast.asin = cost.asin join ? as forecast on fast.asin = forecast.asin',
          [
            PageData.domoData.fasttrack_instock_append,
            PageData.domoData.item_costs,
            PageData.domoData.demand_forecast
          ]);

          joinedData = orderData(joinedData);

          if(joinedPrevData.length>0){
            joinedPrevData = orderData(joinedPrevData);
          }

          vm.data = joinedData;
          vm.prevData = joinedPrevData;
        }

        function orderData(arr){
          vm.fieldTypes = ['','','','','percentage','percentage','','currency',''];
          var data = arr.map(function(item) {
            var newItem = {};
            newItem.asin = item.asin;
            newItem.asin_name = item.asin_name;
            newItem.category = item.category;
            newItem.subcategory = item.subcategory;
            newItem.fast_track_buy_box = percentToNum(item.fast_track_buy_box);
            newItem.lost_buy_box = percentToNum(item.lost_buy_box);
            var units = Number(item.units);
            var cost = Number(item.cost);
            var lu = newItem.lost_buy_box * units;
            newItem.lost_units = roundNum(lu);
            var ls = newItem.lost_buy_box * (units * cost);
            newItem.lost_sales = roundNum(ls);
            newItem.report_date = item.report_date;
            return newItem;
          });
          return data;
        }

        function openTable(obj){
          var filteredData = $filter('filter')(vm.data, {subcategory:obj.subcategory});
          $rootScope.$broadcast('open-table', filteredData, vm.fieldTypes);
        }

        vm.getSum = function(items,metric) {
          if(items && items.length > 0){
            var met = metric||vm.currentMetric;
            return +((items
                .map(function(x) { return x[met]; })
                .reduce(function(a, b) { return a + b; })).toFixed(2));
          } else {
            return 0;
          }
        };

        vm.getChange = function(a, b, reverse) {

            return a-b;
        };

        function percentToNum(x){
          try{
            var num = Number(x.replace('%','').trim())/100;
            num = Math.round(num * 10000) / 10000;
            return num;
          } catch(e) { return x;}
        }

        function roundNum(x){
          try{
            var num = Number(x.toFixed('2'));
            return num;
          } catch(e) { return x;}
        }

        function init() {
          vm.pageData = PageData;

          vm.pageData.title = 'Lost Buy Box';
          vm.pageData.icon = 'img-lostbuybox-sm';
          vm.compStr = 'WoW';
          vm.pageData.optionBar.show = true;
          vm.pageData.optionBar.opsShow = false;
          vm.pageData.optionBar.timeShow = false;
          vm.pageData.optionBar.metricShow = true;
          vm.changeClass = '';
          vm.changeLostSalesClass = '';
          vm.chart = {};
          vm.chart.options = {
            responsive:true
          };

          joinData();
          updateMetric();
          updateChartData();

        }

        init();

    });
