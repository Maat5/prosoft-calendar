angular.module('app.services', [])
  .service('moment', function() {
    return window.moment;
  })
  .service('lodash', function() {
    return window._;
  })
  .service('ApiRequests', ['$http', '$q', function($http, $q) {
    var key = '92b1b196-df5d-487e-8c4e-3bc96b03db65';

    function getHolydays(country, year) {
      var url = 'https://holidayapi.com/v1/holidays?key=' + key + '&country=' + country + '&year=' + year;
      var defer = $q.defer();
      var req = {
        method: 'GET',
        url: url,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
      $http(req)
        .then(function(res) { defer.resolve(res.data) })
        .catch(function(err) { defer.reject(err.data) });
      return defer.promise;
    };

    return {
      getHolydays: getHolydays,
    };
  }]);
