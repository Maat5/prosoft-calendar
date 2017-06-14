'use strict';

/**
 *  Module
 *
 * Description
 */
angular.module('app', [
  'ui.router',
  'ui.bootstrap'

]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  // any unknown URLS go to 404
  $urlRouterProvider.otherwise('/404');
  // no route goes to index
  $urlRouterProvider.when('', '/');
  // use a state provider for routing
  $stateProvider
    .state('app', {
      abstract: true,
      templateUrl: "./templates/base/base.html",
    })

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);
