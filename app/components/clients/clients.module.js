'use strict';

var firmModule = angular.module('Adp.clients', ['Adp.directives']) //jshint ignore: line
    .config(function ($stateProvider) {
        $stateProvider.state('clients', {
            url: '/clients',
            templateUrl: 'templates/clients.html',
            controller: 'ClientsController',
            controllerAs: 'clientsCtrl'
        });
    });
