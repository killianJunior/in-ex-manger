(function () {

    'use strict';

    angular.module('BusinessManagerApp')
        .controller("MainCtrl", ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {

            /*var vm = this;*/

          /*  $scope.$on('$viewContentLoaded', function () {
                Metronic.initComponents(); // init core components
                // Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 

                Layout.initHeader();
                Layout.initSidebar();

                $scope.$on('$includeContentLoaded', function () {
                    setTimeout(function () {
                        QuickSidebar.init(); // init quick sidebar        
                    }, 2000)
                });
                Demo.init();
                Layout.initFooter();
            });*/

            //$rootScope.settings.layout.pageBodySolid = true;
            //$rootScope.settings.layout.pageSidebarClosed = false;

            /*CurrentYearSvc.getCurrentYear().then(function (data) {
                vm._currentYear = data;*/
                console.log("Hello from the main controller");
           /* });*/

        }]);

})();