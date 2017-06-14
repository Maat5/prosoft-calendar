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

      var dates = getMonths(start, end);
      // handle multiple month
      _.forEach(dates, function(month, i) {
        //  get month and generate weeks
        var weeks = makeWeeks(month);
        // get month name
        var selectechWeek = _.first(weeks);
        var dt = _.find(selectechWeek, 'date');
        var name = moment(dt.date).format('MMMM Y');
        // populate calendars
        $scope.calendars.push({name: name , dates: fillBlankSpaces(weeks)});
      });
    }

    // create an array with months and all days of week in the month
    function getMonths(startDate, stopDate) {
      var months = [];
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      var currentMonth = [];
      while (stopDate > currentDate) {
        var month = moment(currentDate).format('MM');
        var start = moment(currentDate).startOf('month');
        var end = moment(start).endOf('month');

        months.push(getDates(start, end));
        currentDate.add(1,'month');

      }
      return months;
    }

    // get days between to dates
    function getDates(startDate, stopDate) {
      var dates = [];
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      while (currentDate <= stopDate) {
        dates.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
      }
      return dates;
    }

    // get an array of dates and divide it by weeks
    function makeWeeks(dates){
      var weeks = [];
      var data = {};
      _.forEach(dates, function(val, i){
        var endOfWeek = moment(val).endOf('week').format('YYYY-MM-DD');
        var day = moment(val);
        var dayNumber = getDayNumber(val)

        if(endOfWeek === day.format('YYYY-MM-DD')){
          data[dayNumber] = {
            day: moment(val).format('DD'),
            date: moment(val).format('YYYY-MM-DD'),
            isWeekend: (dayNumber == 6  || dayNumber == 0) ? true : false
          };
          weeks.push(data);
          data = {};
        }
        else {
          data[dayNumber] = {
            day: moment(val).format('DD'),
            date: moment(val).format('YYYY-MM-DD'),
            isWeekend: (dayNumber == 6  || dayNumber == 0) ? true : false
          };
        }
      });
      return weeks;
    }

    // get number of week day
    function getDayNumber(day){
      var day = moment(day).format('d');
      return day;
    }

    // fill days without dates
    function fillBlankSpaces(dates) {
      _.forEach($scope.daysName, function(days, i){
        _.forEach(dates, function(weeks){
          var day = _.get(weeks, days.number );
          if(_.isUndefined(day)){
            day = {
              day: '',
              isWeekend: (days.number == 6  || days.number  == 0) ? true : false
            };
            weeks[days.number] = day;
          }
        });
      });
      return dates;
    }

  }]);
