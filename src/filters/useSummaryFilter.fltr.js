angular
    .module('app.core')
    .filter('useSummaryFilter', useSummaryFilter);

function useSummaryFilter($filter) {
  return function(value, filterName) {
    if(filterName === 'STRING' || filterName === ''){
      return value;
    }
    if(filterName === 'currency'){
      return '$'+$filter('number')(Math.round(value));
    }
    return $filter(filterName)(value);
  };
}
