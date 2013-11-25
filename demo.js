
var module = angular.module( 'demo', ['ngScrollSpy'] );

/******************** DEMO SPECIFIC DIRECTIVES **********************/


module.directive( 'expand', [ function() {
	return {
		restrict: 'A',
		link: function( scope, element, attrs, ctrls ){

			element.bind( 'click', function() {
				console.log('clicked');
				element[0].style.height = '1000px';

				//scope.$apply();
			});

		}
	};
}]);


/********************************************************************/