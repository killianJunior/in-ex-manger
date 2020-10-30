(function () {
    'use strict';

  angular.module('BusinessManagerApp')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider

        // Dashboard

        .state('dashboard', {
          url: '/',
          templateUrl: 'public/views/core/dashboard.html'
        })

      
      $urlRouterProvider.otherwise('/');

    }]);

  
})();