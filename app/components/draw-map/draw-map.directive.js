(function() {
	'use strict';

	angular.module('sfMuni.drawMap').directive('sfDrawMap', function () {
		return {
			restrict: 'E',
			scope: false,
			controller: 'DrawMapController as drawMapCtrl'
		}
	});
})();
