'use strict';
angular
    .module('app.core')
    .controller('HomeController', function($scope, PageData, $filter, $log) {

        //Setup view model object
        var vm = this;

        var sectionMapping = {
          sales:{
            reverse:false,
            popover:'Shipped COGS',
            title:'Sales'
          },
          inventory:{
            reverse:true,
            popover:'Out of Stock Rate',
            title:'Inventory'
          },
          operations:{
            reverse:true,
            popover:'Vendor Lead Time in days',
            title:'Operations'
          },
          lostbuybox:{
            reverse:true,
            popover:'Lost Buy Box Rate',
            title:'Lost Buy Box'
          }
        }

        function updateChartData(){
          var homeData = PageData.domoData.section_summary;
          var sortedData = [];
          if(homeData){
            angular.forEach(sectionMapping, function(value, key) {
              var matchItem = $filter('filter')(homeData,{section:key})
              sortedData.push(matchItem[0]);
            });

            angular.forEach(sortedData, function(value, key) {
              var tileObj = getTile(value);
              var dataObj = {
                name:sectionMapping[value.section].title,
                icon:'img-'+value.section,
                tile:tileObj.tile,
                value:value.currentTotal,
                classNm:tileObj.classNm,
                filterName:tileObj.filter,
                link:'#!/'+value.section,
                popoverText:sectionMapping[value.section].popover
              };
              vm.sectionData.push(dataObj);
            });
          }
        }

        function getTile(val){
          var type = 'number';
          if(angular.isString(val.currentTotal)){
            if(val.currentTotal.indexOf('$') > -1){
              type = 'currency';
            } else if(val.currentTotal.indexOf('%') > -1){
              type = 'percentage';
            }
          }
          var reverse = sectionMapping[val.section].reverse;
          var currTotal = vm[type+'ToNum'](val.currentTotal);
          var prevTotal = vm[type+'ToNum'](val.previousTotal);
          var change = vm.getChange(currTotal,prevTotal,reverse);
          if(change >= 0){
            return {
              tile:(reverse)?'img-tile-down-rev':'img-tile-up',
              classNm:'green',
              filter:type
            };
          } else {
            return {
              tile:(reverse)?'img-tile-up-rev':'img-tile-down',
              classNm:'red',
              filter:type
            };
          }
        }

        vm.percentageToNum = function(x){
          try{
            var num = Number(x.replace('%','').trim())/100;
            num = Math.round(num * 10000) / 10000;
            return num;
          } catch(e) { return x;}
        }

        vm.currencyToNum = function(x){
          try{
            var num = Number(x.replace(/\$|,/g,'').trim());
            num = Math.round(num * 100) / 100;
            return num;
          } catch(e) { return x;}
        }

        vm.numberToNum = function(x){
          try{
            return Number(x);
          } catch(e) { return x;}
        }

        vm.getChange = function(a, b, reverse) {
            if(reverse){
              return b-a;
            }
            return a-b;
        };

        function init() {
          vm.pageData = PageData;

          vm.pageData.title = 'Home';
          vm.pageData.optionBar.show = false;
          vm.sectionData = [];

          updateChartData();

        }

        init();
    });
