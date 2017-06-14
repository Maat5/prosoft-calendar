angular.module('app.dashboard', [])
  .controller('DashboardCtrl', ['$scope','moment', 'lodash', function($scope, moment, lodash ) {

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

    $scope.daysForm = {};
    $scope.daysGrid = [];
    $scope.dateArray = [];
    $scope.calendars = [];
    //triggered at form submit
    $scope.searchDays = function(data) {
      handleDates(data.date, data.count);
    };

    // populate calendars
    function handleDates(date, count) {
      $scope.calendars = [];
      var _date = moment(date);
      var end =
      $scope.monthName = _date.format('MMMM Y');
      var start = moment(date).startOf('month');

      if(count) {
         end = moment(start).add(count, 'days');
      }
      else {
        end = moment(start).endOf('month');
      }
    }


  }]);
