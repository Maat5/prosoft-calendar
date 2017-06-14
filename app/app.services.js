angular.module('app.services', [])
  .service('moment', function(){
    return window.moment;
  })
  .service('lodash', function(){
    return window._;
  });