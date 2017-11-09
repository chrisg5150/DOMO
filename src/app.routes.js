'use strict';

angular
    .module('app.routes', ['ngRoute'])
    .config(config);

function config ($routeProvider) {
    $routeProvider.
        when('/revenue', {
            templateUrl: 'sections/revenue/revenue.tpl.html',
            controller: 'RevenueController as revenue',
            resolve: {
                revenueData: function(DomoService) {
                    return DomoService.getHomeData();
                }
            }
        })
        .when('/volume', {
            templateUrl: 'sections/volume/volume.tpl.html',
            controller: 'VolumeController as volume',
            resolve: {
                volumeData: function(DomoService) {
                    return DomoService.getSalesData();
                }
            }
        })
        .when('/relationships', {
            templateUrl: 'sections/relationships/relationships.tpl.html',
            controller: 'RelationshipsController as relationships',
            resolve: {
                relationshipsData: function(DomoService) {
                    return DomoService.getOperationsData();
                }
            }
        })
        .otherwise({
            redirectTo: '/revenue'
        });
}
