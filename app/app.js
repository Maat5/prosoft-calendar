'use strict';

/**
 *  Module
 *
 * Description
 */
angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'app.services',
  'app.dashboard'

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
    .state('app.dashboard', {
      url: '/',
      templateUrl: './templates/dashboard/dashboard.html',
      controller: "DashboardCtrl"
    })
    .state('404', {
      url: '/404',
      templateUrl: './templates/shared/404.html'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);
