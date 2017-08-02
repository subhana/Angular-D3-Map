(function() {
	'use strict';

		directivesModule.directive('adpTableFooterButton', function () {
			return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/table-footer-button.html',
                scope: {
                    printFn: '&',
                    addFn: '&',
                    align: '@'
                },
                link: function(scope, elm, attrs) {
                    scope.add = function() {
                        scope.addFn()("Directive Args");
                    }
                }
			}
		});
})();
