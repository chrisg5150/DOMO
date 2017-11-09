angular
    .module('app.core')
    .directive('graphbar', graphbar);
function graphbar() {
    var directive = {
        controller: ['$scope', '$rootScope', '$log', '$filter', 'PageData', controller],
        controllerAs:'graphbar',
        templateUrl: 'components/graphbar/graphbar.tpl.html',
        restrict: 'E',
        replace:true,
        scope: {
          graphdata:'=',
          reverse:'=',
          metric:'='
        }
    };
    return directive;

    function controller($scope, $rootScope, $log, $filter, PageData) {

      var vm = this;
      vm.pageData = PageData;
      vm.barClick = barClick;

      $scope.$watch('graphdata',function(newVal,oldVal){
        var maxVal = getMax($scope.graphdata);
        angular.forEach($scope.graphdata, function(value, key) {
          value.width = Math.round((value.value/maxVal.value)*100);
          value.change = (value.value - value.prevValue);
          $log.log('$scope.reverse', $scope.reverse);
          $log.log('value.value', value.value);
          $log.log('value.prevValue', value.prevValue);
          value.color = (value.change >=0)?'green':'red';
          if($scope.reverse){
            value.color = (value.change <=0)?'green':'red';
          }
        });

      });

      function barClick(bar){
        $rootScope.$broadcast('bar-click', bar);
      }

      function getMax (items) {
        if(items && items.length > 0){
          return $filter('max')(items,'value');
        } else {
          return 1;
        }
      };
    }


}
