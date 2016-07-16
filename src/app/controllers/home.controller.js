(function () {
    'user strict';


    angular.module( 'movieflix')
        .controller( 'HomeController', HomeController );
    
    HomeController.$inject = ['userService','$window','movieService','$rootScope'];
    function HomeController (userService, $window, movieService,$rootScope) {
        
        var homeVm = this;

        homeVm.changeSort = changeSort;

        init();

        function init() {
            console.log( 'HomeController' );

            if (userService.isAuth == false){
                console.log( 'Login Required' );
                $window.location.href = "#/login";
            }
            else{
                console.log( 'Logged In' );
                movieService
                    .getAllTopRated()
                    .then(function(movies) {
                        homeVm.movies = movies;
                    }, function(error) {
                        console.log(error.statusText);
                    });
                console.log($rootScope.isUserLoggedIn)
            }

            homeVm.sorter = {
                by: 'Title',
                reverse: false
            };

            movieService
                .getAllTopRated()
                .then(function(movies) {
                    homeVm.movies = movies;
                }, function(error) {
                    console.log(error.statusText);
                });
        }
        function changeSort(prop) {
            usersVm.sorter.by = prop;
            usersVm.sorter.reverse = !usersVm.sorter.reverse;
        }

    }


})();