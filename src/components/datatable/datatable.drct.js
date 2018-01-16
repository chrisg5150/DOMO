angular
    .module('app.core')
    .directive('datatable', datatable);
function datatable() {
    var directive = {
        controller: ['$scope', '$rootScope', '$log', '$uibModal', 'PageData', controller],
        controllerAs:'datatable',
        templateUrl: 'components/datatable/datatable.tpl.html',
        restrict: 'E',
        scope: false
    };
    return directive;
    function controller($scope, $rootScope, $log, $uibModal, PageData) {
      $scope.pageData = PageData;

      $scope.open = function (passedObj,fieldTypes) {

          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'datatable-modal.html',
              controller: ['$scope', '$uibModalInstance', '$log', 'PageData', 'obj', '$rootScope', 'fieldTypes', modalController],
              size: 'lg',
              resolve: {
                obj: function () {
                  return passedObj;
                },
                fieldTypes: function () {
                  return fieldTypes;
                }
              }
          });

          modalInstance.result.then(function () {}, function () {});

          function modalController($scope, $uibModalInstance, $log, PageData, obj, $rootScope, fieldTypes) {
            $scope.pageData = PageData;
            $scope.fieldTypes = fieldTypes;
            if(obj && angular.isArray(obj)){
              $scope.title = obj[0][PageData.dataGroup];
              $scope.headings = [];
              $scope.data = obj;
              angular.forEach(obj[0], function(value, key) {
                var headingObj = {
                  name:key.replace(/_/g,' '),
                  id:key
                }
                if(key !== '$$hashKey'){
                  $scope.headings.push(headingObj);
                }
              });

            }

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };



          }
      };

      $scope.$on('open-drill', function(event, obj, ft) {
        $log.log('datatable',obj, ft);
          $scope.open(obj, ft);
      });


    }




}
