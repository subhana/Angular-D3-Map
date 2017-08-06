'use strict';
var sfMuni = angular.module('sfMuni', [

    // 3rd party dependencies
    'ngResource',
    'ui.router',

    // App submodules
    'sfMuni.drawMap',
    'sfMuni.drawVehicle'
]);

sfMuni.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider.state('sfmuni', {
        url: '/sfmuni',
        templateUrl: 'index.html',

    });
    $urlRouterProvider.otherwise('/sfmuni');
});
