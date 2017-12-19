'use strict';

/*
 * Contains a service to communicate with the DOMO API
 */
angular
    .module('app.services')
    .factory('DomoService', domoService);

function domoService($log, $window, $http, PageData, $q, $rootScope) {
    var data = {
        'getAppData': getAppData,

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

    function getAppData() {
      var revenue_volume = checkCacheGetRequest('revenue_volume')
      return $q.all([revenue_volume])
      .then(function(data){
        return data;
      });
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
