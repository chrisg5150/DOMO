angular
    .module('app.core')
    .directive('optionbar', optionbar);
function optionbar() {
    var directive = {
        controller: ['$scope', 'PageData', '$log', '$rootScope', controller],
        controllerAs:'optionbar',
        templateUrl: 'components/optionbar/optionbar.tpl.html',
        restrict: 'E',
        replace:true,
        scope: {}
    };
    return directive;

    function controller($scope, PageData, $log, $rootScope) {

      var vm = this;
      vm.pageData = PageData;
      vm.pageData.optionBar.metricCurrent = vm.pageData.optionBar.metricChoices[0];
      vm.pageData.optionBar.timeCurrent = vm.pageData.optionBar.timeChoices[0];
      vm.pageData.optionBar.viewCurrent = vm.pageData.optionBar.viewChoices[0];
      vm.pageData.optionBar.opsCurrent = vm.pageData.optionBar.opsChoices[0];
      vm.changeTime = changeTime;
      vm.changeMetric = changeMetric;
      vm.changeView = changeView;
      vm.changeOps = changeOps;

      function changeTime(val){
        vm.pageData.optionBar.timeCurrent = val;
        $rootScope.$broadcast('time-change', val.val);
      }

      function changeMetric(val){
        vm.pageData.optionBar.metricCurrent = val;
        if(val.val === 'dollars'){
          vm.pageData.metricType = 'currency';
        } else {
          vm.pageData.metricType = 'number';
        }
        $rootScope.$broadcast('metric-change', val.val);
      }

      function changeView(val){
        vm.pageData.optionBar.viewCurrent = val;
        $rootScope.$broadcast('view-change', val.val);
      }

      function changeOps(val){
        vm.pageData.optionBar.opsCurrent = val;
        $rootScope.$broadcast('ops-change', val.val);
      }

    }


}
