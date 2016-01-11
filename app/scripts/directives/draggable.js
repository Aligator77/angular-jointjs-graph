'use strict';
angular.module('angular-jointjs-graph')
  .directive('draggable', ['$window',
    function ($window) {
      return function(scope, element) {
        var el = element[0];
        el.draggable = true;

        el.addEventListener('dragstart', function(e) {
          e.dataTransfer.effectAllowed = 'copy';

          this.classList.add('drag');

          // We need to keep the pointer position relative to the element
          // being dragged in order to place it correctly on canvas.
          // The bounding rectangle takes page scroll position into account.
          var left = e.clientX - e.target.getBoundingClientRect().left,
              top  = e.clientY - e.target.getBoundingClientRect().top,
              offsetPoint = $window.g.point(left, top);

          e.dataTransfer.setData('text', JSON.stringify({
            'entity-attributes': el.dataset,
            'pointer-offset': offsetPoint
          }));
        });

        el.addEventListener('dragend', function () {
          this.classList.remove('drag');
        });
      };
    }
  ]);
