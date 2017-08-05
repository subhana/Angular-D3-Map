'use strict';

drawVehicleModule.controller('DrawVehicleController', [
    '$scope', '$interval', 'RouteService','VehicleService',
    function drawVehicleController($scope, $interval, RouteService, VehicleService) {

        RouteService.get().then(function(routes) {
            $scope.routes = routes.route;
        });

        $scope.getVehicles = function() {
            console.log("selected route");
            console.log($scope.selectedRoute);
            VehicleService.get($scope.selectedRoute.tag).then(function(vehicles) {
                console.log("vehicles");
                console.log(vehicles);
            });
        };

        /*$interval(function() {
            $scope.getVehicles();
        }, 15000);*/
    }
]);
