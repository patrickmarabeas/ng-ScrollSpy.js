
var module = angular.module( 'demo', ['ngScrollSpy'] );

module.config(['scrollspyConfigProvider', function(ScrollspyConfigProvider) {
  ScrollspyConfigProvider.config = {
    offset: 250,
    throttle: true,
    delay: 100
  };
}]);

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



