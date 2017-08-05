'use strict';

drawMapModule.controller('DrawMapController', [
    '$scope', function drawMapController($scope) {

        var width, height, svg, projection, path, bounds, xScale, yScale, scale, transl;

        this.setProjectionParams = function(data) {

            width = 600; height = 600;
            svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

            projection = d3.geo.mercator().scale(1).translate([0, 0]).precision(0);
            path = d3.geo.path().projection(projection);
            bounds = path.bounds(data);

            xScale = width / Math.abs(bounds[1][0] - bounds[0][0]);
            yScale = height / Math.abs(bounds[1][1] - bounds[0][1]);
            scale = xScale < yScale ? xScale : yScale;

            transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2];
        };

        this.drawMap = function(svg, path, data, fillColor, strokeColor) {

            svg.selectAll('path').data(data.features).enter().append('path').attr('d', path).attr('data-id', function(d) {
                return d.id;
            }).attr('data-name', function(d) {
                return d.properties.name;
            }).style('fill', fillColor).style('stroke', strokeColor);
        };

        this.ready = function(error, neighborhoods, freeways) {

            this.setProjectionParams(neighborhoods);
            projection.scale(scale).translate(transl);

            $scope.projection = projection;
            $scope.svg = svg;

            this.drawMap(svg, path, neighborhoods, '#FB5B1F', '#ffffff');
            this.drawMap(svg, path, freeways, '#FB5B1F', '#ffffff');

            $scope.$apply();
        };

        queue()
            .defer(d3.json, '../map_data/neighborhoods.json')
            .defer(d3.json, '../map_data/freeways.json')
            .await(this.ready.bind(this))
     }
]);
