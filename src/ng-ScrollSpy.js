/* ng-ScrollSpy.js v3.0.0
 * https://github.com/patrickmarabeas/ng-ScrollSpy.js
 *
 * Copyright 2014, Patrick Marabeas http://marabeas.io
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 08/08/2014
 */

'use strict';

angular.module('ngScrollSpy', [])

  .value('config', {
    'offset': 200,
    'throttle': true,
    'delay': 100
  })

  .run(['PositionFactory', function(PositionFactory) {
    PositionFactory.refreshPositions();
    angular.element(window).bind('scroll', function() {
      PositionFactory.refreshPositions();
    });
  }])

  .factory('PositionFactory', ['$rootScope', function($rootScope){
    return {
      'position': [],
      'refreshPositions': function() {
        this.position.documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
        this.position.windowTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
        this.position.windowBottom = this.position.windowTop + window.innerHeight
      }
    }
  }])

  .factory('SpyFactory', ['$rootScope', function($rootScope){
    return {
      'spies': [],
      'addSpy': function(id) {
        var index = this.spies.map(function(e) { return e }).indexOf(id);
        if(index == -1) {
          this.spies.push(id);
          this.broadcast();
        }
      },
      'removeSpy': function(id) {
        var index = this.spies.map(function(e) { return e }).indexOf(id);
        if(index != -1) {
          this.spies.splice(index, 1);
          this.broadcast();
        }
      },
      'broadcast': function() {
        $rootScope.$broadcast('spied');
      }
    }
  }])

  .directive('scrollspyBroadcast', ['config', 'scrollspyConfig', 'SpyFactory', 'PositionFactory', function(config, scrollspyConfig, SpyFactory, PositionFactory) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        angular.extend(config, scrollspyConfig.config);

        scope.checkActive = function() {
          scope.elementTop = element[0].offsetTop;
          scope.elementBottom = scope.elementTop + Math.max(element[0].scrollHeight, element[0].offsetHeight);

          if((scope.elementTop - config.offset) < (PositionFactory.position.documentHeight - window.innerHeight)) {
            if(scope.elementTop <= (PositionFactory.position.windowTop + config.offset)) {
              SpyFactory.addSpy(attrs.id);
            } else {
              SpyFactory.removeSpy(attrs.id);
            }

          } else {
            if(PositionFactory.position.windowBottom > (scope.elementBottom - config.offset)) {
              SpyFactory.addSpy(attrs.id);
            } else {
              SpyFactory.removeSpy(attrs.id);
            }
          }
        };

        function throttle(e,t,n){var r,i;return function(){var s=n||this;var o=+(new Date),u=arguments;if(r&&o<r+t){clearTimeout(i);i=setTimeout(function(){r=o;e.apply(s,u)},t)}else{r=o;e.apply(s,u)}}}
        config.throttle == true
          ? angular.element(window).bind('scroll', throttle(function() { scope.checkActive() }, config.delay))
          : angular.element(window).bind('scroll', function() { scope.checkActive() });

        angular.element( document ).ready( function() { scope.checkActive() });
      }
    }
  }])

  .directive('scrollspyListen', ['$timeout', 'SpyFactory', function($timeout, SpyFactory) {
    return {
      restrict: 'A',
      scope: {
        scrollspyListen: '@',
        enabled: '@'
      },
      replace: true,
      transclude: true,
      template: function(element) {
        var tag = element[0].nodeName;
        return '<' + tag + ' data-ng-transclude data-ng-class="{active: enabled}"></' + tag + '>';
      },
      link: function(scope) {
        scope.$on('spied', function() {
          $timeout(function() {
            var spies = scope.scrollspyListen.split("|");
              for(var i = 0; i < spies.length; i++)
                if(scope.enabled = spies[i] === SpyFactory.spies[SpyFactory.spies.length - 1])
                  break;
          });
        });
      }
    }
  }])

  .provider('scrollspyConfig', function() {
    var self = this;
    this.config = {};
    this.$get = function() {
      var extend = {};
      extend.config = self.config;
      return extend;
    };
    return this;
  });