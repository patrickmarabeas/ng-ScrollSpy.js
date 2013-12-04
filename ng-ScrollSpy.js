/* ng-ScrollSpy.js v1.1.0
 * https://github.com/patrickmarabeas/ng-ScrollSpy.js
 *
 * Copyright 2013, Patrick Marabeas http://pulse-dev.com
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 24/11/2013
 */

var module = angular.module( 'ngScrollSpy', [] );

module.service( 'spyService', function() {
	return {
		spies: [],
		addSpy: function( spy ) {
			this.spies.push( spy );
		}
	};
});

module.directive ( 'scrollspy', [ '$interval', 'spyService', function( $interval, spyService ) {
	return {
		restrict: 'A',
		controller: [ '$scope', function( $scope ) {
			this.spyService = spyService;
		}],
		link: function( scope, element, attrs ) {

			var scrollSpyVisibleHeight = function() {
				if( element[0].innerHeight ) {
					return element[0].innerHeight;
				}
				else {
					return window.innerHeight;
				}
			};

			var setup = function() {

				scope.testHeight = Math.max( element[0].scrollHeight, element[0].offsetHeight );
				var scrollSpyTotalHeight = Math.max( element[0].scrollHeight, element[0].offsetHeight );
				//var offset = scrollSpyVisibleHeight() / 4;
				var offset = attrs.scrollspyOffset || 0;
				var maxScrollTop = scrollSpyTotalHeight - scrollSpyVisibleHeight();

				for ( var i = 0; i < spyService.spies.length; i++ ) {

					var spy = spyService.spies[i];
					var spyElement = document.getElementById( spy.scope.spy );
					spy.range = {
						min: spyElement.offsetTop - offset,
						max: spyElement.offsetTop + spyElement.offsetHeight
					};

					if( spy.range.min < maxScrollTop ) {
						spy.trigger = 'min';
					}
					else {
						spy.trigger = 'max';
					}


				}
			};

			var determiner = function() {

				var current = null;
				var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
				var scrollBottom = ((window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop) + scrollSpyVisibleHeight();

				for ( var i = 0; i < spyService.spies.length; i++ ) {
					var spy = spyService.spies[i];

					if( spy.trigger === 'min' && (spy.range.min - scrollTop) <= 0 ) {
						current = spy.scope.spy;
					}
					else if( spy.trigger === 'max' && (spy.range.max - scrollBottom) <= 0 ) {
						current = spy.scope.spy;
					}

				}

				scope.$apply( function () {
					scope.activeSpy = current;

				});

			};

			scope.$watch('activeSpy', function( newVal, oldVal ){
				if( newVal != oldVal ) {
					scope.$broadcast( 'spied', {
						'activeSpy': scope.activeSpy
					});
				}
			});

			angular.element( document ).ready( function() {
				setup();
				determiner();
			});

			angular.element( window ).bind("resize", function() {
				setup();
				determiner();
			});

			angular.element( window ).bind("scroll", function() {
				determiner();
			});

			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			if( MutationObserver ) {

				for ( var i = 0; i < spyService.spies.length; i++ ) {
					var spy = spyService.spies[i].scope.spy;
					var target = document.getElementById(spy);

					var config = {
						attributes: true,
						childList: true,
						characterData: true,
						subtree: true
					};
					var observer = new MutationObserver(function(mutations) {
						mutations.forEach(function(mutation) {
							//console.warn('mutation observation');
							setup();
							determiner();
						});
					}).observe(target, config);
				}
			}
			else {
				//console.warn('no mutation observers here');
				$interval(function() {
					angular.element( document ).ready( function() {
						//console.log('refreshing');
						setup();
						determiner();
					});
				}, 2000);

			}
		}
	};
}]);

module.directive( 'spy', [ function() {
	return {
		restrict: 'A',
		require: [ '?^scrollspy' ],
		scope: {
			spy: '@',
			enabled: '@'
		},
		template: function( element, attrs ) {
			var tag = element[0].nodeName;
			return '<'+tag+' data-ng-transclude data-ng-class="{active: enabled}"></'+tag+'>';
		},
		replace: true,
		transclude: true,
		link: function( scope, element, attrs, ctrls ){

			ctrls[0].spyService.addSpy({
				scope: scope
			});

			scope.$on('spied', function(event, args){
				scope.enabled = false;
				if( scope.spy === args.activeSpy ) {
					scope.enabled = true;
				}
			});

		}
	};
}]);
