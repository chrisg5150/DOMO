angular
    .module('app.core')
    .filter('useFilter', useFilter);

function useFilter($filter) {
  return function(value, filterName) {
    if(filterName === 'STRING' || filterName === ''){
      return value;
    }
    return $filter(filterName)(value);
  };
}
