
    angular.module('BusinessManagerApp', [

        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'ui.select',

    ]).run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {

            //CurrentYearSvc.initializeCurrentYear();

            event.targetScope.$watch('$viewContentLoaded', function () {

                angular.element('html, body, #content').animate({ scrollTop: 0 }, 200);

                setTimeout(function () {
                    angular.element('#wrap').css('visibility', 'visible');

                    if (!angular.element('.dropdown').hasClass('open')) {
                        angular.element('.dropdown').find('>ul').slideUp();
                    }
                }, 200);
            });
            $rootScope.containerClass = toState.containerClass;
        });


    }]).config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('!');

    }]);

