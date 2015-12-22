'use strict';
angular.module('angular-jointjs-graph')
  .factory('JointNodeModel', ['$window', '$templateCache', 'FactoryMap',
    function($window, $templateCache, FactoryMap) {
      var ModelConstructor = $window.joint.shapes.basic.Generic.extend({
        markup: $templateCache.get('graphNode'),
        defaults: $window.joint.util.deepSupplement({
          // The corresponding html.ElementView is defined
          // in the JointElementView service.
          type: 'html.Element',
          attrs: FactoryMap.get('JointNodeParams').get({}).attrs
        }, $window.joint.shapes.basic.Generic.prototype.defaults)
      });

      //Any methods that should be common to all node instances should be prototyped
      //on the new ModelConstructor class here.

      $window.joint.shapes.html = {
        Element: ModelConstructor
      };

      return {
        getConstructor: function() {
          return ModelConstructor;
        }
      };
    }
  ]);
