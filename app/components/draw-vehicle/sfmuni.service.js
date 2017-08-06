(function() {
	'use strict';

	angular.module('sfMuni.drawVehicle').service('SfmuniService', function($resource) {

		var sfmuniResource = $resource('',
		{},
		{
			getRoutes: {
				method: 'GET',
				isArray: false,
				url: 'http://webservices.nextbus.com/service/publicJSONFeed',
				params: {
					command: 'routeList',
					a: 'sf-muni'
				}
			},
			getVehicles: {
				method: 'GET',
				isArray: false,
				url: 'http://webservices.nextbus.com/service/publicJSONFeed?r=:routeTag',
				params: {
					command: 'vehicleLocations',
					a: 'sf-muni',
					t: 0
				}
			}
		}
	);

	this.getRoutes = function() {
		return sfmuniResource.getRoutes().$promise;
	};

	this.getVehicles = function(routeTag) {
		return sfmuniResource.getVehicles({routeTag: routeTag}).$promise;
	};
});
})();
