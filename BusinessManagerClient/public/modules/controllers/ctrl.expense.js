(function () {
    'use strict';

    angular.module('BusinessManagerApp')
        .controller("ExpenseCtrl", ['$scope', '$state', '$filter', '$stateParams', 'DailyIncome', 'Expense',
            function ($scope, $state, $filter, $stateParams, DailyIncome, Expense) {

                var vm = this;
                vm.isNew = true;
                vm.isClicked = false;
                vm.selected_dailyIncome = null;


                /*This code retrieves a daily income entity from the server*/

                if ($stateParams.expenseId) {
                    vm._expense = Expense.get({ id: $stateParams.expenseId })
                    vm.isNew = false;

                    console.log(vm._expense);

                } else {
                    vm._expense = new Expense();
                }

                /*This Code block returns a list of Daily Income Expesnes*/

                vm._expenseList = Expense.query();

                /*This Code Block Returns a Daily Income with all its expenses */
/*
                if ($stateParams.expenseId) {
                    DailyIncome.get({ id: $stateParams.expenseId }).$promise.then(function (data) {
                        vm.expenseList = data;
                        vm._expenses = data.expenses;
                    });
                }*/


                /*This code block saves a DailyIncome object to the server*/

                vm.enterExpense = function () {
                    vm.isClicked = true;
                    vm._expense.dailyIncomeId = vm.selected_dailyIncome.id;
                    vm._expense.$save(function (success) {
                        if (success) {
                            console.log(success);
                            Notifier.success('Entry Successful', 'Businsess Manager');
                           /* $state.go('expenseList');*/
                        }
                    },

                        function (err) {
                            Notifier.error('Error Ocuured', 'Business Manager');
                        });
                };

                /* This code block updates an already existing DailyIncome Object*/

                vm.updateExpense = function () {
                    vm.isClicked = true;
                    vm._expense.$update(function () {
                        Notifier.success('Updates successfully', 'Business Manager');
                        $state.go('dailyIncome', { dailyIncomeId: $stateParams.dailyIncomeId });
                    },
                        function (err) {
                            Notifier.error('Error Ocuured', 'Business Manager');
                            $state.go('dailyIncome', { dailyIncomeId: $stateParams.dailyIncomeId });
                        });
                };

                vm.cancel = function () {
                    $state.go('expenseList');
                };




            }]);

})();


