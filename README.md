# ng-ScrollSpy.js

### ng-ScrollSpy is an AngularJS module for navigation highlighting.

Grab it with Bower: `bower install ng-ScrollSpy.js`

Include it in your AngularJS application

	var myApp = angular.module( 'myApp', [ 'ngScrollSpy' ] );

Apply it to your app

	<body data-scrollspy>...</body>

The attribute `data-scrollspy-offset` can also be used. Default is 0. Must be used on the element with the scrollspy directive. The following line is your navigation item element which will be given an `active` class when the specified ID is spied upon. It is element type unspecific.

	<span data-spy="myID">myID</span>

This is the element you wish to spy on.

	<section id="myID"></section>

NOTE: this AngularJS module is simply a scrollspy, anchor linking / smooth scrolling is another modules concern.