'use strict';

drawVehicleModule.controller('DrawVehicleController', [
    '$scope', '$rootScope', 'Notification', '$timeout', 'RouteService',
    function drawVehicleController($scope, $rootScope, Notification, $timeout, RouteService) {

        RouteService.get().then(function(routes) {
            $scope.routes = routes.route;
        });

        $scope.getVehicles = function() {
            console.log("selected route");
            console.log($scope.selectedRoute);
        }
    }
]);
