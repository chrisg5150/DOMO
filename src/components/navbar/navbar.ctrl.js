'use strict';
angular
    .module('app.core')
    .controller('NavbarController', function($scope, PageData, $rootScope) {
      var vm = this;
      vm.isNavCollapsed = true;
      vm.isCollapsed = false;
      vm.isCollapsedHorizontal = false;
      vm.pageData = PageData;

      function closeNav(){
        vm.isNavCollapsed = true;
      }

      var nav = $rootScope.$on('$routeChangeStart', function() {
          closeNav();
      });
    });
