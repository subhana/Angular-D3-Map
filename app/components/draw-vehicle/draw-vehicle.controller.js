(function() {
    'use strict';

    angular.module('sfMuni.drawVehicle').controller('DrawVehicleController', [
        '$scope', '$interval', 'SfmuniService',
        function drawVehicleController($scope, $interval, SfmuniService) {

            var circles;

            // fetch route list of sfmta agency
            SfmuniService.getRoutes().then(function(data) {
                $scope.routes = data;
            });

            // set vehicle and other related data
            this.setVehicleData = function(data) {
                if (!Array.isArray(data) || !data.length) {
                    this.vehicles = [];
                    this.noVehicle = true;
                }
                else {
                    this.vehicles = data;
                    this.noVehicle = false;
                } 
            };

            // fetch the latest vehicle location for a particular route
            this.updateVehicleLocations = function() {
                if(!this.selectedRoute) return;

                console.log("selected route", this.selectedRoute);

                SfmuniService.getRouteVehicles(this.selectedRoute.id).then(function(data) {
                    this.setVehicleData(data);
                    this.drawVehicleLocations();
                }.bind(this));
            }.bind(this);

            // draw vehicles locations
            this.drawVehicleLocations = function() {

                circles = $scope.svg.selectAll('circle').data(this.vehicles);

                circles.enter().append('circle');
                circles.exit().remove();

                circles.attr('r', '3px')
                .attr('cx', function(d) { return $scope.projection([d.lon, d.lat])[0]; })
                .attr('cy', function(d) { return $scope.projection([d.lon, d.lat])[1]; })
                .attr('class', 'vehicle');
            };

            // update vehicle location every 5 seconds
            var updateVehicleLoc = $interval(this.updateVehicleLocations.bind(this), 5000);

            $scope.$on('$destroy', function() {
                $interval.cancel(updateVehicleLoc);
            });
        }
    ]);
})();
