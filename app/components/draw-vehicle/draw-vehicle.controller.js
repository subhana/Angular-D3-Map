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
            VehicleService.get($scope.selectedRoute.tag).then(function(data) {
                $scope.vehicles = data.vehicle;
                $scope.drawVehicleLocations();
            });
        };

        $scope.drawVehicleLocations = function() {
            circles = $scope.svg.selectAll("circle").data($scope.vehicles);

            circles.enter().append("circle");
            circles.exit().remove();

            circles
            .attr("r", "3px")
            .attr("cx", function(d) { return $scope.projection([d.lon, d.lat])[0]; })
            .attr("cy", function(d) { return $scope.projection([d.lon, d.lat])[1]; })
            .attr("fill", "#454545");
        };

        $interval(function() {
            console.log("inside timeout");
            if($scope.selectedRoute) {
                $scope.updateVehicleLocations();
            }
        }, 15000)




            /*var circles = scope.svg.selectAll("circle").data(places1);
            circles.exit().remove();
            circles.enter().append("circle")
                .attr("r", "3px")
                .attr("cx", function(d) { return scope.projection([d.lon, d.lat])[0]; })
                .attr("cy", function(d) { return scope.projection([d.lon, d.lat])[1]; })
                .attr("fill", "blue");

            $timeout(function() {
                var circles = scope.svg.selectAll("circle").data(places2);

                circles.enter().append("circle");
                circles.exit().remove();

                circles
                .attr("r", "3px")
                .attr("cx", function(d) { return scope.projection([d.lon, d.lat])[0]; })
                .attr("cy", function(d) { return scope.projection([d.lon, d.lat])[1]; })
                .attr("fill", "red");
            }, 2000);*/

        /*$interval(function() {
            $scope.getVehicles();
        }, 15000);*/
    }
]);
