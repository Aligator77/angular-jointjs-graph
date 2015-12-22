'use strict';
angular.module('angular-jointjs-graph', ['ngResource', 'angular-jointjs-graph/templates']);

angular.module('angular-jointjs-graph/templates', [])
  .run(['$templateCache',
    function($templateCache) {
      $templateCache.put('angular-joints-graph/templates/graph',
        '<div class="organogram">\n' +
          '<section class="chartContainer">\n' +
            '<div class="chartArea" droppable></div>\n' +
            '<div ng-transclude></div>\n' +
          '</section>\n' +
        '</div>'
      );

      $templateCache.put('angular-joints-graph/templates/graphSidePanelTools',
        '<div class="graph-tools">\n' +
          '<div class="basic">\n' +
            '<div class="intro">Drag to create new</div>\n' +
            '<div class="fabric"></div>\n' +
          '</div>\n' +
          '<div class="switch-container" ng-click="toggleExtended()" extended="{{showExtended}}">\n' +
            '<div class="switch">\n' +
              'or choose from existing\n' +
              '<span ng-class="showExtended ? \'up\' : \'down\'"></span>\n' +
            '</div>\n' +
          '</div>' +
          '<div class="listing" ng-show="showExtended">\n' +
            '<ul></ul>\n' +
          '</div>\n' +
        '</div>'
      );

      $templateCache.put('angular-joints-graph/templates/graphSidePanelDetails',
        '<div ng-transclude></div>'
      );

      $templateCache.put('angular-joints-graph/templates/graphNewEntity',
        '<div class="instance-template" draggable></div>'
      );

      $templateCache.put('angular-joints-graph/templates/graphExistingEntities',
        '<li class="entity-item"' +
          'ng-repeat="entity in entities"' +
          'ng-hide="entity.show == false"' +
          'draggable graph-existing-entity="{{entityIdentifier}}">\n' +
          '<div class="remove-entity" ng-click="removeEntity(entity)">&times;</div>\n' +
        '</li>'
      );
    }
  ]);
