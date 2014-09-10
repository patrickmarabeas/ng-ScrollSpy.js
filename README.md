# ng-ScrollSpy.js

### ng-ScrollSpy is an AngularJS module for navigation highlighting.

Grab it with Bower:

    bower install ng-ScrollSpy.js

Include it in your AngularJS application

    var myApp = angular.module( 'myApp', [ 'ngScrollSpy' ] );
    
The following line is your navigation item element which will be given an `active` class when the specified ID is spied upon. It is element type unspecific. You can listen for multiple elements with pipe separation.

    <span data-scrollspy-listen="myID">myID</span>
    <span data-scrollspy-listen="myID|another">multiple</span>
    
This is the element you wish to spy on. Offset can be set specifically on elements as well.

    <section id="myID" data-scrollspy-broadcast data-scrollspy-offset="100"></section>

There are some global config options available:

    myApp.config([ 'scrollspyConfigProvider', function( scrollspyConfigProvider ) {
      scrollspyConfigProvider.config = {
       offset: 250, //offset added to element
       throttle: true, //whether to limit the scroll event to once every n
       delay: 100 //the delay between scroll events
      };
    }]);
    
NOTE: this AngularJS module is simply a scrollspy, anchor linking / smooth scrolling is another modules concern.