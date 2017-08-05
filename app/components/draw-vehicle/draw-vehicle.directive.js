(function() {
	'use strict';

		drawMapModule.directive('sfDrawVehicle', function ($timeout) {
			return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/draw-vehicle.html',
                scope: false,
				controller: 'DrawVehicleController as vehicleCtrl',
                link: function(scope, elm, attrs) {

                    var places = [
                        {
                            "id": "1434",
                            "lon": "-122.49444",
                            "routeTag": "N",
                            "predictable": "true",
                            "speedKmHr": "29",
                            "dirTag": "N____I_C00",
                            "heading": "87",
                            "lat": "37.7609",
                            "secsSinceReport": "9"
                        },
                        {
                            "id": "1480",
                            "lon": "-122.44908",
                            "routeTag": "N",
                            "predictable": "true",
                            "speedKmHr": "16",
                            "dirTag": "N____I_C00",
                            "heading": "45",
                            "lat": "37.76623",
                            "secsSinceReport": "34"
                        }
                    ];
                    scope.svg.selectAll("circle")
                        .data(places)
                        .enter()
                        .append("circle")
                        .attr("cx", function (d) {
                            //console.log(d);
                            return scope.projection([d.lon, d.lat])[0];

                        })
                        .attr("cy", function (d) {
                            return scope.projection([d.lon, d.lat])[1];

                        })
                        .attr("r", "4px")
                        .attr("fill", "blue");

						/*$timeout(function() {
							console.log("there");
							scope.svg.selectAll("circle")
		                        .data(places)
		                        .enter()
		                        .append("circle")
		                        .attr("cx", function (d) {
		                            //console.log(d);
		                            return scope.projection([d.lon, d.lat])[0];

		                        })
		                        .attr("cy", function (d) {
		                            return scope.projection([d.lon, d.lat])[1];

		                        })
		                        .attr("r", "4px")
		                        .attr("fill", "red");
				        }, 500);*/

                } // end of link function
			}
		});
})();
