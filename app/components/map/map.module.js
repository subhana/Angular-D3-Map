'use strict';

var mapModule = angular.module('sfMap.map', ['sfMap.directives']) //jshint ignore: line
    .config(function ($stateProvider) {
        $stateProvider.state('sfmap', {
            url: '/sf-map',
            templateUrl: 'templates/map.html',
            controller: 'MapController',
            controllerAs: 'mapCtrl'
        });
    });
