(function() {
	'use strict';

	drawVehicleModule.service('VehicleService', function($resource) {

		var vehicleResource = $resource('http://webservices.nextbus.com/service/publicJSONFeed?r=:routeTag',
            {
    			command: 'vehicleLocations',
                a: 'sf-muni',
				t: 0
    		});

            this.get = function(routeTag) {
				return vehicleResource.get({routeTag: routeTag}).$promise;
			};

		});
})();
