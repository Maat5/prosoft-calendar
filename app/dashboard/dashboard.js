angular.module('app.dashboard', [])
  .controller('DashboardCtrl', ['$scope', function($scope) {

    $scope.daysName = [{
      number: 0,
      name: 'S'
    }, {
      number: 1,
      name: 'M'
    }, {
      number: 2,
      name: 'T'
    }, {
      number: 3,
      name: 'W'
    }, {
      number: 4,
      name: 'T'
    }, {
      number: 5,
      name: 'F'
    }, {
      number: 6,
      name: 'S'
    }];


  }]);
