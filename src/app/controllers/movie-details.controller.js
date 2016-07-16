(function () {
    'use strict';

    angular.module( 'movieflix' )
        .controller( 'MovieDetailsController', MovieDetailsController );

    MovieDetailsController.$inject = ['userService', 'movieService', 'reviewService', '$routeParams', '$window'];

    function MovieDetailsController(userService, movieService, reviewService, $routeParams, $window) {
        var movieDetailsVm = this;
        var userObj = {};
        var movieObj = {};
        movieDetailsVm.newComment = {};

        movieDetailsVm.checkUser = checkUser;
        movieDetailsVm.updateMovie = updateMovie;
        movieDetailsVm.postComment = postComment;
        movieDetailsVm.deleteMov = deleteMov;

        init();

        function init() {
            console.log( 'MovieDetailsController' );

            if (userService.isAuth == false) {
                console.log( 'Login Required' );
                $window.location.href = "#/login";
            }
            else {
                movieDetailsVm.thisUser = userService.userLoggedIn;
                userObj.id = movieDetailsVm.thisUser.id;
                movieDetailsVm.newComment.user = userObj;
                console.log( 'Logged In' );

                movieService
                    .getMoviesById( $routeParams.id )
                    .then( function (movie) {
                        movieDetailsVm.movie = movie;
                        movieObj.id = movie.id;
                        movieDetailsVm.newComment.movie = movieObj;
                    }, function (error) {
                        console.log( error.statusText );
                    } );

                reviewService
                    .fetchReviews( $routeParams.id )
                    .then( function (reviews) {
                        movieDetailsVm.reviews = reviews;
                        averageUserRaing( movieDetailsVm.reviews );
                    }, function (error) {
                        console.log( error.statusText );
                    } );
            }
        }

        function checkUser() {
            return userService.isAdmin();
        }

        function deleteMov() {
            var r = $window.confirm( "Are you sure?\nThis will delete the entry form the database permanently.." );
            if (r == true) {
                movieService.deleteMovie( movieObj.id );
                alert( 'Delete Successfull..!' );
                $window.location.href = "#/";
            }

        }
        
        function updateMovie(id) {
            var r = $window.confirm( "Update Confirmation!!\nDo you want to proceed.." );
            if (r == true) {
                movieService.updateMovieDetails( movieDetailsVm.movie.id, movieDetailsVm.movie);
                alert( 'Update Successfull..!' );
                $window.location.href = "#/detail/" + movieDetailsVm.movie.id;
            }
        }

        function postComment() {
            reviewService
                .postReview( movieDetailsVm.newComment )
                .then( function (review) {
                    review.user.firstName = userService.userLoggedIn.firstName;
                    review.user.lastName = userService.userLoggedIn.lastName;
                    movieDetailsVm.reviews.push( review );
                    averageUserRaing( movieDetailsVm.reviews );
                    console.log( review );
                    console.log( 'Comment post success' );
                    movieDetailsVm.newComment.comment = '';
                    movieDetailsVm.newComment.rating = '0';
                }, function (error) {
                    console.log( error.statusText );
                } );
        }

        function averageUserRaing(reviews) {
            var tmpSum = 0;
            for (var i = 0; i < reviews.length; i++) {
                tmpSum = tmpSum + parseInt( reviews[i].rating, 10 );
            }

            movieDetailsVm.avgRate = Math.round( tmpSum / (reviews.length) );
        }
    }

})();