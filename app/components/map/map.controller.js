'use strict';

mapModule.controller('MapController', [
    '$scope', '$rootScope', 'Notification', '$timeout', 'UserService',
    function mapController($scope, $rootScope, $mdDialog, Notification, $timeout, UserService) {


        d3.json('../json/neighborhoods.json',function(data) {

            console.log(data);
            var width = 600, height = 600;

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
            	}, {
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

            var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

            var projection = d3.geo.mercator().scale(1).translate([0, 0]).precision(0);
            var path = d3.geo.path().projection(projection);
            var bounds = path.bounds(data);

            xScale = width / Math.abs(bounds[1][0] - bounds[0][0]);
            yScale = height / Math.abs(bounds[1][1] - bounds[0][1]);
            scale = xScale < yScale ? xScale : yScale;

            var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2];
            projection.scale(scale).translate(transl);


            svg.selectAll("path").data(data.features).enter().append("path").attr("d", path).attr('data-id', function(d) {
                return d.id;
            }).attr('data-name', function(d) {
                return d.properties.name;
            }).style("fill", "#FB5B1F").style("stroke", "#ffffff");

            var aa = [-122.49444, 37.7609];
            var	bb = [-122.44908, 37.76623];

            /*svg.selectAll("circle")
        		.data(places)
        		.enter()
        		.append("circle")
        		.attr("cx", function (d) {
        		    console.log(d); return projection([d.lon, d.lat])[0];

        		})
        		.attr("cy", function (d) {
        		    return projection([d.lon, d.lat])[1];

        		})
        		.attr("r", "4px")
        		.attr("fill", "blue");*/
            });

    }
]);
