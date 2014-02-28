'use strict';

describe( '', function() {

	var element, $scope;

	beforeEach( module( 'ngScrollSpy' ));
	beforeEach( inject( function( $compile, $rootScope ) {
		$scope = $rootScope;
		element = angular.element("<div data-></div>");
		$compile(element)($rootScope);
	}));




});