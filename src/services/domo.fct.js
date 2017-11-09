'use strict';

/*
 * Contains a service to communicate with the DOMO API
 */
angular
    .module('app.services')
    .factory('DomoService', domoService);

function domoService($log, $window, $http, PageData, $q, $rootScope) {
    var data = {
        'getSalesData': getSalesData,
        'getHomeData': getHomeData,
        'getOperationsData': getOperationsData,
        'getInventoryData': getInventoryData,
        'getLostbuyboxData':getLostbuyboxData

    };
    var DOMO = $window.domo;
    var hasCommonData = false;


    function makeRequest(alias,params) {
      var requestUrl = '/data/v1/'+alias;
      var config = {
          'url': requestUrl,
          'method': 'GET',
          'headers':{
            'Accept': 'application/array-of-objects'
          }
      };
      if(params){
        config.params = params;
      }
      return $http(config)
      .then(function(response){
          PageData.domoData[alias] = response.data;
          return {};
      }).catch(dataServiceError);

    }

    function getSalesData() {
      var weekly = checkCacheGetRequest('sales_weekly');
      var monthly = checkCacheGetRequest('sales_monthly');
      var daily = checkCacheGetRequest('sales_daily_append',{groupby:'subcategory'});
      return $q.all([daily, weekly, monthly])
      .then(function(data){
        return getSalesPreviousData(PageData.domoData.sales_weekly);
      });
    }

    function getSalesPreviousData(data) {
      var date = getReportDate(data);
      var targetWeek = moment(date,'YYYY-MM-DD').subtract(7,'days').format('YYYY-MM-DD');
      var targetMonth = moment(date,'YYYY-MM-DD').subtract(1,'month').format('YYYY-MM-DD');
      var weekly = checkCacheGetRequest('sales_weekly_append',{filter:'report_date = '+targetWeek});
      var monthly = checkCacheGetRequest('sales_monthly_append',{filter:'report_date = '+targetMonth});
      return $q.all([weekly, monthly]);
    }

    function getInventoryData() {
      var summary = checkCacheGetRequest('fasttrack_summary',{filter:"metric = Actual"});
      var instock = checkCacheGetRequest('fasttrack_instock');
      var sales = checkCacheGetRequest('item_costs');
      var forecast = checkCacheGetRequest('demand_forecast');
      return $q.all([summary, instock, sales, forecast])
      .then(function(data){
        return getInventoryPreviousData(PageData.domoData.fasttrack_summary);
      });
    }

    function getInventoryPreviousData(data) {
      var date = getReportDate(data);
      var targetWeek = moment(date,'YYYY-MM-DD').subtract(7,'days').format('YYYY-MM-DD');
      var summary = checkCacheGetRequest('fasttrack_summary_append',{filter:"report_date = "+targetWeek+", metric = Actual"});
      var instock = checkCacheGetRequest('fasttrack_instock_append',{filter:"report_date = "+targetWeek});
      return $q.all([summary, instock]);
    }

    function getLostbuyboxData() {
      return getInventoryData();
    }

    function getOperationsData() {
      return checkCacheGetRequest('operational_metrics');
    }

    function getHomeData() {
      getCommonData();
      return checkCacheGetRequest('section_summary');
    }

    function getReportDate(data){
      var rd = moment().format('YYYY-MM-DD');
      if(data){
        try{
          if(data[0].report_date){
            rd = data[0].report_date;
          }
          if(data[0]['Report Date']){
            rd = data[0]['Report Date'];
          }
        }catch(e){}
      }
      return rd;
    }

    function checkCache(alias){
      if(PageData.domoData[alias]){
        return true;
      }
      return false;
    }

    function checkCacheGetRequest(alias,params){
      if(checkCache(alias)){
        return $q.when({});
      }
      return makeRequest(alias,params);
    }

    function getCommonData() {
      if(!hasCommonData){
        PageData.userData = domo.env;
        hasCommonData = true;
      }
    }

    return data;

    function dataServiceError(errorResponse) {
        $log.info('XHR Failed for DomoService');
        $log.info(errorResponse);
        return errorResponse;
    }
}
