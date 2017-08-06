(function() {
	'use strict';

		drawMapModule.directive('sfDrawMap', function () {
			return {
                restrict: 'E',
				scope: false,
				controller: 'DrawMapController as drawMapCtrl'
			}
		});
})();
