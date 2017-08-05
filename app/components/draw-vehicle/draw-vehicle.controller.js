'use strict';

drawVehicleModule.controller('DrawVehicleController', [
    '$scope', '$interval', 'RouteService','VehicleService', '$timeout',
    function drawVehicleController($scope, $interval, RouteService, VehicleService, $timeout) {

        var circles;

        RouteService.get().then(function(data) {
            $scope.routes = data.route;
        });

        $scope.updateVehicleLocations = function() {
            console.log("selected route");
            console.log($scope.selectedRoute);

            if(!$scope.selectedRoute) return;
            VehicleService.get($scope.selectedRoute.tag).then(function(data) {

                $scope.vehicles = data.vehicle ? data.vehicle : [];
                $scope.noVehicle = data.vehicle ? false : true;
                $scope.drawVehicleLocations();
            });
        };

        $scope.drawVehicleLocations = function() {
            circles = $scope.svg.selectAll('circle').data($scope.vehicles);

            circles.enter().append('circle');
            circles.exit().remove();

            circles
            .attr('r', '3px')
            .attr('cx', function(d) { return $scope.projection([d.lon, d.lat])[0]; })
            .attr('cy', function(d) { return $scope.projection([d.lon, d.lat])[1]; })
            .attr('fill', 'red')
            .attr('stroke', '#545454')
            .attr('fill-opacity', 0.5);
        };

        var updateVehicleLoc = $interval($scope.updateVehicleLocations, 15000);

        $scope.$on('$destroy', function() {
            $interval.cancel(updateVehicleLoc);
        });
    }
]);
