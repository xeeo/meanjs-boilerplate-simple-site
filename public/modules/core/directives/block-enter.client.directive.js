'use strict';

angular.module('core').directive('blockEnter', [
	function() {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				element.bind('keydown keypress', function (event) {
					if(event.which === 13) {
						event.preventDefault();
					}
				});

			}
		};
	}
]);
