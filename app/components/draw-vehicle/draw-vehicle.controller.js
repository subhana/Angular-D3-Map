'use strict';

drawVehicleModule.controller('DrawVehicleController', [
    '$scope', '$rootScope', 'Notification', '$timeout', 'RouteService',
    function drawVehicleController($scope, $rootScope, Notification, $timeout, RouteService) {

        RouteService.get().then(function(routes) {
            console.log("routes");
            console.log(routes);
        });
    }
]);
