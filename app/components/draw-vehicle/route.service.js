(function() {
	'use strict';

	drawVehicleModule.service('RouteService', function($resource) {

		var routeResource = $resource('http://webservices.nextbus.com/service/publicJSONFeed',
            {
    			command: 'routeList',
                a: 'sf-muni'
    		});

            this.get = function() {
				return routeResource.get().$promise;
			};
		});
})();
