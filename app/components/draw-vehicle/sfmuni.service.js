(function() {
	'use strict';

	angular.module('sfMuni.drawVehicle').service('SfmuniService', function($resource) {

		var sfmuniResource = $resource('',
		{},
		{
			getRoutes: {
				method: 'GET',
				isArray: true,
				url: 'https://webservices.umoiq.com/api/pub/v1/agencies/sfmta-cis/routes?key=0be8ebd0284ce712a63f29dcaf7798c4',
			},
			getVehicles: {
				method: 'GET',
				isArray: true,
				url: `https://webservices.umoiq.com/api/pub/v1/agencies/sfmta-cis/routes/:routeId/vehicles?key=0be8ebd0284ce712a63f29dcaf7798c4`,
			}
		}
	);

	this.getRoutes = function() {
		return sfmuniResource.getRoutes().$promise;
	};

	this.getVehicles = function(routeId) {
		return sfmuniResource.getVehicles({routeId: routeId}).$promise;
	};
});
})();
