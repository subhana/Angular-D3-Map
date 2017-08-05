(function() {
	'use strict';

	drawVehicleModule.service('RouteService', function($resource) {

		var routeResource = $resource('http://webservices.nextbus.com/service/publicJSONFeed',
            {
    			command: 'routeList',
                a: 'sf-muni'
    		},
            {
                validateBulkDealNumberRange: {
					method: 'GET',
					isArray: false,
					url: '/api/deals/valid/bulkRange/:costCenterId/:numberOfDeals'
				},
				arc: {
					method: 'GET',
					isArray: false,
					url: '/api/deals/arcSearch'
				}
			});

            this.get = function() {
				return routeResource.get().$promise;
			};

		});
})();
