'use strict';
var sfMap = angular.module('sfMap', [
    'sfMap.services',
    'ui-notification',
    'ngResource',
    'ui.router',
    'sfMap.clients',
]);

sfMap.config(function ($stateProvider, $urlRouterProvider, $httpProvider, NotificationProvider) {
    NotificationProvider.setOptions({
        startTop: 100,
        maxCount: 3,
        delay: false
    });

    $urlRouterProvider.otherwise('/clients');
    //$httpProvider.interceptors.push('RequestInterceptor');
    //$httpProvider.interceptors.push('ResponseInterceptor');


});

sfMap.run(['$rootScope', '$state', '$location', '$http',
    function ($rootScope, $state, $location, $http) {
        //SecurityService.setAuthToken();
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) { //jshint ignore: line

        });
    }]);
