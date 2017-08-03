(function() {
	'use strict';

		drawMapModule.directive('sfDrawVehicle', function () {
			return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/draw-vehicle.html',
                scope: {
                    printFn: '&',
                    addFn: '&',
                    align: '@'
                },
                link: function(scope, elm, attrs) {

                }
			}
		});
})();
