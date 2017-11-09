angular
    .module('app.core')
    .directive('hometile', hometile);
function hometile() {
    var directive = {
        controller: ['$scope', '$log', controller],
        controllerAs:'hometile',
        templateUrl: 'components/hometile/hometile.tpl.html',
        restrict: 'E',
        replace:true,
        scope: {
          tiledata:'=tiledata'
        }
    };
    return directive;

    function controller($scope, $log) {

      var vm = this;

    }


}
