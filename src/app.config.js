'use strict';
var env = {};
// Import variables if present (from env.js)
if(window){
  env = window.__env;
}

angular
    .module('app.config', [])
    .config(configs)
    .run(runs)
    .constant('ENV',env)

function configs($httpProvider, $logProvider, ENV) {

    var interceptor = function($location, $log, $q) {

        function error(response) {
            if (response.status === 401) {
                $log.error('You are unauthorised to access the requested resource (401)');
            } else if (response.status === 404) {
                $log.error('The requested resource could not be found (404)');
            } else if (response.status === 500) {
                $log.error('Internal server error (500)');
            }
            return $q.reject(response);
        }
        function success(response) {
            //Request completed successfully
            return response;
        }
        return function(promise) {
            return promise.then(success, error);
        }
    };
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push(interceptor);

    $logProvider.debugEnabled(ENV.enableDebug);

}

function runs($rootScope, PageData) {
    var start = $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
        PageData.loading = true;
    });
    var success = $rootScope.$on('$routeChangeSuccess', function() {
        PageData.loading = false;
    });

}
