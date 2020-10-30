(function () {
    'use strict';

    angular.module('BusinessManagerApp')
        .controller("DailyIncomeCtrl", ['$scope', '$state', '$filter', '$stateParams', 'DailyIncome',
            function ($scope, $state, $filter, $stateParams, DailyIncome) {

                var vm = this;
                vm.isNew = true;
                vm.isClicked = false;
                vm.pageTitle = "Daily Income";

                /*This code retrieves a daily income entity from the server*/

                if ($stateParams.dailyIncomeId) {
                    vm._dailyIncome = DailyIncome.get({ id: $stateParams.dailyIncomeId })
                    vm.isNew = false;

                    console.log(vm._dailyIncome);

                } else {
                    vm._dailyIncome = new DailyIncome();
                }

            /*This Code block returns a list of Daily Income*/

                vm._dailyIncomeList = DailyIncome.query();

            /*This Code Block Returns a Daily Income with all its expenses */

                if ($stateParams.dailyIncomeId) {
                    DailyIncome.get({ id: $stateParams.dailyIncomeId }).$promise.then(function (data) {
                        vm.dailyIncomeList = data;
                        vm._expenses = data.expenses;
                    });
                }


               /* vm.newDailyIncome = function () {

                    vm.addNewActivated = !vm.addNewActivated;
                }*/

            /*This code block saves a DailyIncome object to the server*/

                vm.enterDailyIncome = function () {
                    vm.isClicked = true;
                    vm._dailyIncome.$save(function (success) {
                        if (success) {
                            console.log(success);
                            Notifier.success('Entry Successful', 'Businsess Manager');
                            $state.go('dailyIncomeList');
                        }
                    },

                        function (err) {
                            Notifier.error('Error Ocuured', 'Business Manager');
                        });
                };

            /* This code block updates an already existing DailyIncome Object*/

                vm.updateDailyIncome = function () {
                    vm.isClicked = true;
                    vm._dailyIncome.$update(function () {
                        Notifier.success('Updates successfully', 'Business Manager');
                        $state.go('dailyIncome', { dailyIncomeId: $stateParams.dailyIncomeId });
                    },
                        function (err) {
                            Notifier.error('Error Ocuured', 'Business Manager');
                            $state.go('dailyIncome', { dailyIncomeId: $stateParams.dailyIncomeId });
                        });
                };

                vm.cancel = function () {
                    $state.go('dailyIncomeList');
                };




            }]);

})();


