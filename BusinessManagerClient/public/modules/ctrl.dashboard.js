(function () {
    'use strict'

    angular.module('BusinessManagerApp')
        .controller("DashboardCtrl", ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {

            var vm = this;

            vm.pageTitle = "Manager Dashboard";

            console.log("Hello from the dashboard controller");


        }]);
})();