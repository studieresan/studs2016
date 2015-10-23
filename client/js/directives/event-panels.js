(function() {
    angular.module('events')
           .directive('eventPanels', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/events/panels.html',
            controller: function() {
                this.panel = 1;

                this.isSet = function(checkPanel) {
                    return this.panel === checkPanel;
                };

                this.setPanel = function(activePanel) {
                    this.panel = activePanel;
                };
            },
            controllerAs: 'panels'
        };
    });
})();
