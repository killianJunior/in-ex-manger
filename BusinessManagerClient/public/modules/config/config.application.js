
angular.module('BusinessManagerApp')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            //Daily Income

            //DailyIncome List
            .state('dailyIncomeList', {
                url: '/dailyIncomeList',
                templateUrl: 'public/views/application/vw.income_list.html',
                controller: "DailyIncomeCtrl",

            })

            //New Daily Income Entry
            .state('entry_dailyIncome', {
                url: '/daily income entry',
                templateUrl: 'public/views/application/vw.income_entry.html',
               

            })

            //Edit Daily Income
            .state('edit_dailyIncome', {
                url: '/dailyIncome/:dailyIncomeId',
                templateUrl: 'public/views/application/vw.income_entry.html',
             

            })

            //DailyIncome
            .state('dailyIncome', {
                url: '/dailyIncomeList/:dailyIncomeId',
                templateUrl: 'public/views/application/vw.income_detail.html',
                data: { pageTitle: 'CBAA.Communities' }

            })

            //Expense
           
            .state('new_expense', {
                url: '/dailyIncomeList/:dailyIncomeId/new daily expense',
                templateUrl: 'public/views/application/vw.income_expense.html'

            })

            .state('edit_expense', {
                url: '/dailyIncomeList/:dailyIncomeId/:expenseId',
                templateUrl: 'public/views/application/vw.income_expense.html'

            })

    }]);

