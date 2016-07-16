(function () {
    'user strict';


    angular.module( 'movieflix')
        .controller( 'SeriesController', SeriesController );

    SeriesController.$Inject = ['userService','movieService','$window']
    function SeriesController(userService,movieService, $window) {

        var seriesVm = this;

        seriesVm.catalog = 'Tv-Series';

        seriesVm.changeSort = changeSort;

        init();

        function init() {
            console.log( 'SeriesController' );

            seriesVm.sorter = {
                by: 'Title',
                reverse: false
            };

            if (userService.isAuth == false){
                console.log( 'Login Required' );
                $window.location.href = "#/login";
            }
            else {
                console.log( 'Logged In' );

                movieService
                    .getSeries()
                    .then( function (movies) {
                        seriesVm.movies = movies;
                    }, function (error) {
                        console.log( error.statusText );
                    } );
            }
        }
        function changeSort(prop) {
            seriesVm.sorter.by = prop;
            seriesVm.sorter.reverse = !seriesVm.sorter.reverse;
        }

    }


})();
