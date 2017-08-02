'use strict';

var firmModule = angular.module('sfMap.clients', ['sfMap.directives']) //jshint ignore: line
    .config(function ($stateProvider) {
        $stateProvider.state('clients', {
            url: '/clients',
            templateUrl: 'templates/clients.html',
            controller: 'ClientsController',
            controllerAs: 'clientsCtrl'
        });
    });
