(function() {
	'use strict';

		angular.module('sfMuni.drawVehicle').directive('sfDrawVehicle', function ($timeout) {
			return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/draw-vehicle.html',
                scope: false,
				controller: 'DrawVehicleController as vehicleCtrl'
			}
		});
})();
