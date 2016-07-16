(function () {
    'user strict';


    angular.module( 'movieflix')
        .directive('movieCard', movieCard);

    function movieCard () {
        var directive = {
            //replace: true,
            scope: {
                movie: '=',
                tagLine: '@',
                logFn: '&'
            },
            transclude: true,
            templateUrl: 'app/views/movie-card.tmpl.html',
            link: function (scope, elem, attrs) {
                elem.on('click', function () {
                    scope.logFn();
                });
            }
        };

        return directive;
    }

})();
