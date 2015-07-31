'use strict';
angular.module('angular-jointjs-graph')
  .factory('GraphSelection', ['JointGraph', 'JointPaper', 'GraphHelpers', 'GraphEntities', 'GraphLinks', 'FactoryMap',
    function(JointGraph, JointPaper, GraphHelpers, GraphEntities, GraphLinks, FactoryMap) {
      var selection,
          selectionChangeCallback;

      function updateSelection() {
        var cell = JointGraph.getCell(selection.selectedCellId);

        if (cell) {
          var modelValues = {},
              isChartNode = cell.get('isChartNode'),
              paramsFactory = isChartNode ?
                FactoryMap.get('JointNodeParams') :
                FactoryMap.get('JointLinkParams');

          if (paramsFactory) {
            var properties = isChartNode ?
                GraphHelpers.entityProperties(selection.entityIdentifier) :
                GraphHelpers.linkProperties();

            properties.forEach(function(propertyKey) {
              modelValues[propertyKey] = selection.selectedResource[propertyKey];
            });

            var attributes = paramsFactory.get(modelValues).attrs;

            if (attributes) {
              cell.attr(attributes);
            }
          }
        }
      }

      function notifySelectionChange() {
        if (angular.isFunction(selectionChangeCallback)) {
          selectionChangeCallback(selection);
        }
      }

      function revertNoNotify() {
        if (selection) {
          angular.copy(selection.masterResource, selection.selectedResource);
          updateSelection();
        }
      }

      return {
        onSelectionChange: function(callback) {
          selectionChangeCallback = callback;
        },
        select: function(selectedIds) {
          revertNoNotify();

          if (selectedIds) {
            var cell = JointGraph.getCell(selectedIds.selectedCellId),
                entity = selectedIds.isChartNode ?
                  GraphEntities.getSingle(cell) :
                  GraphLinks.getSingle(cell);

            selection = {
              isChartNode: selectedIds.isChartNode,
              selectedResource: entity,
              selectedCellId: selectedIds.selectedCellId,
              masterResource: angular.copy(entity),
              entityIdentifier: selectedIds.entityIdentifier
            };
          } else {
            selection = null;
          }

          notifySelectionChange();
        },
        selectEntity: function(entity, identifier) {
          revertNoNotify();

          selection = {
            isChartNode: true,
            selectedResource: entity,
            selectedCellId: GraphEntities.jointModelId(identifier, entity),
            masterResource: angular.copy(entity),
            entityIdentifier: identifier
          };

          notifySelectionChange();
        },
        getSelectedEntity: function() {
          return selection ? selection.selectedResource : null;
        },
        revertSelection: function() {
          if (selection) {
            angular.copy(selection.masterResource, selection.selectedResource);
            updateSelection();
            notifySelectionChange();
          }
        },
        syncSelection: function() {
          if (selection) {
            angular.copy(selection.selectedResource, selection.masterResource);
            updateSelection();
            notifySelectionChange();
          }
        },
        clear: function() {
          JointPaper.clearSelection();
          selection = null;
          notifySelectionChange();
        },
        clearAndRevert: function() {
          JointPaper.clearSelection();
          revertNoNotify();
          selection = null;
          notifySelectionChange();
        }
      };
    }
  ]);
