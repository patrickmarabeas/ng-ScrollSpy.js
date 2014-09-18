
var module = angular.module( 'demo', ['ngScrollSpy'] );

module.config(['scrollspyConfigProvider', function(ScrollspyConfigProvider) {
  ScrollspyConfigProvider.config = {
    offset: 250,
    throttle: function(e,t,n){var r,i;return function(){var s=n||this;var o=+(new Date),u=arguments;if(r&&o<r+t){clearTimeout(i);i=setTimeout(function(){r=o;e.apply(s,u)},t)}else{r=o;e.apply(s,u)}}},
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



