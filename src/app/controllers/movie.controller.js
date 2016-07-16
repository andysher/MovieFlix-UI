(function () {
    'user strict';


    angular.module( 'movieflix')
        .controller( 'MovieController', MovieController );

    MovieController.$Inject = ['userService','movieService','$window']
    function MovieController(userService,movieService, $window) {

        var movieVm = this;

        movieVm.catalog = 'Movies';

        movieVm.changeSort = changeSort;

        init();

        function init() {
            console.log( 'MovieController' );

            movieVm.sorter = {
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
                    .getMovies()
                    .then( function (movies) {
                        movieVm.movies = movies;
                    }, function (error) {
                        console.log( error.statusText );
                    } );
            }
        }
        function changeSort(prop) {
            movieVm.sorter.by = prop;
            movieVm.sorter.reverse = !movieVm.sorter.reverse;
        }
        
    }


})();
