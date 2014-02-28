/* ng-ScrollSpy.js v2.0.0
 * https://github.com/patrickmarabeas/ng-ScrollSpy.js
 *
 * Copyright 2014, Patrick Marabeas http://pulse-dev.com
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 28/02/2014
 */

'use strict';

angular.module( 'ngScrollSpy', [] )

	.directive( 'scrollspyBroadcast', [ '$rootScope', function( $rootScope ) {
		return {
			restrict: 'A',
			scope: {},
			link: function( scope, element, attrs ) {

				scope.activate = function() {

					scope.documentHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
//					distance down the page the top of the window is currently at
					scope.userScrolledTop = ( window.pageYOffset !== undefined ) ? window.pageYOffset : ( document.documentElement || document.body.parentNode || document.body ).scrollTop;
//					distance down the page the bottom of the window is currently at
					scope.userScrolledBottom = scope.userScrolledTop + window.innerHeight;

					scope.elementOffsetTop = element[0].offsetTop;
					scope.elementOffsetBottom = scope.elementOffsetTop + Math.max( element[0].scrollHeight, element[0].offsetHeight );

					scope.triggerOffset = 150;

					if( ( scope.elementOffsetTop - scope.triggerOffset ) < ( scope.documentHeight - window.innerHeight ) ) {
						if( scope.elementOffsetTop <= ( scope.userScrolledTop + scope.triggerOffset ) ) {
							$rootScope.$broadcast( 'spied', {
								'activeSpy': attrs.id
							});
						}
					} else {
						if( scope.userScrolledBottom > ( scope.elementOffsetBottom - scope.triggerOffset ) ) {
							$rootScope.$broadcast( 'spied', {
								'activeSpy': attrs.id
							});
						}
					}

				};

				angular.element( document ).ready( function() {
					scope.activate();
				});

				angular.element( window ).bind( 'scroll', function() {
					scope.activate();
				});

			}
		}
	}])


	.directive( 'scrollspyListen', [ '$rootScope', function( $rootScope ) {
		return {
			restrict: 'A',
			scope: {
				scrollspyListen: '@',
				enabled: '@'
			},
			replace: true,
			transclude: true,
			template: function( element, attrs ) {
				var tag = element[0].nodeName;
				return '<'+tag+' data-ng-transclude data-ng-class="{active: enabled}"></'+tag+'>';
			},
			link: function( scope, element, attrs ) {

				$rootScope.$on('spied', function(event, args){

					scope.enabled = false;

					if( scope.scrollspyListen === args.activeSpy ) {
						scope.enabled = true;
					}

					if( !scope.$$phase ) scope.$digest();

				});

			}
		}
	}]);