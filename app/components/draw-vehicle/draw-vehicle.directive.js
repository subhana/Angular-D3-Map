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

					console.log("inside link function");
                } //end of link function
			}
		});
})();
