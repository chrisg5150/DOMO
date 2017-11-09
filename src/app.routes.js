'use strict';

angular
    .module('app.routes', ['ngRoute'])
    .config(config);

function config ($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'sections/home/home.tpl.html',
            controller: 'HomeController as home',
            resolve: {
                homeData: function(DomoService) {
                    return DomoService.getHomeData();
                }
            }
        })
        .when('/sales', {
            templateUrl: 'sections/sales/sales.tpl.html',
            controller: 'SalesController as sales',
            resolve: {
                salesData: function(DomoService) {
                    return DomoService.getSalesData();
                }
            }
        })
        .when('/operations', {
            templateUrl: 'sections/operations/operations.tpl.html',
            controller: 'OperationsController as operations',
            resolve: {
                operationsData: function(DomoService) {
                    return DomoService.getOperationsData();
                }
            }
        })
        .when('/inventory', {
            templateUrl: 'sections/inventory/inventory.tpl.html',
            controller: 'InventoryController as inventory',
            resolve: {
                inventoryData: function(DomoService) {
                    return DomoService.getInventoryData();
                }
            }
        })
        .when('/lostbuybox', {
            templateUrl: 'sections/lostbuybox/lostbuybox.tpl.html',
            controller: 'LostbuyboxController as lostbuybox',
            resolve: {
                lostbuyboxData: function(DomoService) {
                    return DomoService.getLostbuyboxData();
                }
            }
        })
        .otherwise({
            redirectTo: '/home'
        });
}
