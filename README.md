# ng-ScrollSpy.js

### ng-ScrollSpy is an AngularJS module for navigation highlighting.

Grab it with Bower: `bower install ng-ScrollSpy.js`

Include it in your AngularJS application

	var myApp = angular.module( 'myApp', [ 'ngScrollSpy' ] );

The following line is your navigation item element which will be given an `active` class when the specified ID is spied upon. It is element type unspecific.

	<span data-scrollspy-listen="myID">myID</span>

This is the element you wish to spy on.

	<section id="myID" data-scrollspy-broadcast></section>

NOTE: this AngularJS module is simply a scrollspy, anchor linking / smooth scrolling is another modules concern.