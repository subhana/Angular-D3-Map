'use strict';
var sfMap = angular.module('sfMap', [
    'ngResource',
    'ui.router',
    'sfMap.drawMap',
    'sfMap.drawVehicle',
    'sfMap.map',
]);

sfMap.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/sf-map');
});
