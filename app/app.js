'use strict';
var sfMap = angular.module('sfMap', [
    'sfMap.services',
    'ui-notification',
    'ngResource',
    'ui.router',
    'sfMap.drawMap',
    'sfMap.drawVehicle',
    'sfMap.map',
]);

sfMap.config(function ($stateProvider, $urlRouterProvider, $httpProvider, NotificationProvider) {
    NotificationProvider.setOptions({
        startTop: 100,
        maxCount: 3,
        delay: false
    });

    $urlRouterProvider.otherwise('/sf-map');
});
