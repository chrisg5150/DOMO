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
                    return DomoService.getAppData();
                }
            }
        })
        .when('/volume', {
            templateUrl: 'sections/volume/volume.tpl.html',
            controller: 'VolumeController as volume',
            resolve: {
                volumeData: function(DomoService) {
                    return DomoService.getAppData();
                }
            }
        })/*
        .when('/accounts', {
            templateUrl: 'sections/accounts/accounts.tpl.html',
            controller: 'AccountController as accounts',
            resolve: {
                accountsData: function(DomoService) {
                   // return DomoService.getAppData();
                }
            }
        })*/
        .when('/groups/:groupId', {
            templateUrl: 'sections/groups/groups.tpl.html',
            controller: 'GroupsController as groups'
        })
        .otherwise({
            redirectTo: '/revenue'
        });
}
