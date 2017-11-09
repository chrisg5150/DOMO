angular
    .module('app.core')
    .filter('percentage', percentage);

function percentage($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}
