(function() {
	'use strict';

		drawMapModule.directive('sfDrawMap', function () {
			return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/draw-map.html',
				scope: false,
				controller: 'DrawMapController as drawMapCtrl'
			}
		});
})();
