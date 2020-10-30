(function () {
    'use strict'

    angular.module('BusinessManagerApp')
        .factory('DailyIncome', ['$resource', function ($resource) {

            return $resource(
                'api/dailyIncome/:dailyIncomeId',
                {
                    dailyIncoemeId: '@id'
                }, {
                update: {
                    method: 'PUT'
                }
            });

        }]);

    angular.module('BusinessManagerApp')
        .factory('Expense', ['$resource', function ($resource) {

            return $resource(
                'api/expense/:expenseId',
                {
                    expenseId: '@id'
                }, {
                update: {
                    method: 'PUT'
                }
            });

        }]);

})();