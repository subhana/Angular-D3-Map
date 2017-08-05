'use strict';

var mapModule = angular.module('sfMap.map', [])
    .config(function ($stateProvider) {
        $stateProvider.state('sfmap', {
            url: '/sf-map',
            templateUrl: 'templates/map.html',
            controller: 'MapController',
            controllerAs: 'mapCtrl'
        });
    });
