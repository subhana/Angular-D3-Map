(function() {
    'use strict';

    angular.module('sfMuni.drawVehicle').controller('DrawVehicleController', [
        '$scope', '$interval', 'SfmuniService',
        function drawVehicleController($scope, $interval, SfmuniService) {

            var circles;

            // fetch route list of sfmuni agency
            SfmuniService.getRoutes().then(function(data) {
                $scope.routes = data.route;
            });

            // set vehicle and other related data
            this.setVehicleData = function(data) {

                if (data.vehicle) {
                    this.vehicles = angular.isArray(data.vehicle) ? data.vehicle : [data.vehicle];
                    this.noVehicle = false;
                } else {
                    this.vehicles = [];
                    this.noVehicle = true;
                }
            };

            // fetch the latest vehicle location for a particular route
            this.updateVehicleLocations = function() {

                if(!this.selectedRoute) return;

                SfmuniService.getVehicles(this.selectedRoute.tag).then(function(data) {
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

            // update vehicle location every 15 seconds
            var updateVehicleLoc = $interval(this.updateVehicleLocations.bind(this), 15000);

            $scope.$on('$destroy', function() {
                $interval.cancel(updateVehicleLoc);
            });
        }
    ]);
})();
