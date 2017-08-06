'use strict';
var sfMap = angular.module('sfMap', [

    // 3rd party dependencies
    'ngResource',
    'ui.router',

    // App submodules
    'sfMap.drawMap',
    'sfMap.drawVehicle'
]);

sfMap.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider.state('sfmuni', {
        url: '/sfmuni',
        templateUrl: 'index.html',

    });
    $urlRouterProvider.otherwise('/sfmuni');
});
