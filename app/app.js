'use strict';
var sfMap = angular.module('sfMap', [

    // 3rd party dependencies
    'ngResource',
    'ui.router',

    // App submodules
    'sfMap.drawMap',
    'sfMap.drawVehicle',
    'sfMap.map',
]);

sfMap.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/sf-map');
});
