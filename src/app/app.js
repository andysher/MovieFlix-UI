(function () {
    'user strict';

    angular
        .module( 'movieflix', ['ngRoute','ngMessages', 'ui.bootstrap', 'angularMoment'] )
        .config( moduleConfig );


    function moduleConfig($routeProvider) {

        $routeProvider
            .when( '/login', {
                templateUrl: 'app/views/login.tmpl.html',
                controller: 'LoginController',
                controllerAs: 'loginVm'
            } )
            .when( '/user/signup', {
                templateUrl: 'app/views/signup.tmpl.html',
                controller: 'SignupController',
                controllerAs: 'signupVm'
            } )
            .when( '/home', {
                templateUrl: 'app/views/home.tmpl.html',
                controller: 'HomeController',
                controllerAs: 'homeVm'
            } )
            .when('/detail/:id', {
                templateUrl: 'app/views/movie-details.tmpl.html',
                controller: 'MovieDetailsController',
                controllerAs: 'movieDetailsVm'
            })
            .when( '/browse/movies', {
            templateUrl: 'app/views/cotalog-type.tmpl.html',
            controller: 'MovieController',
            controllerAs: 'catalogVm'
            } )
            .when( '/browse/series', {
            templateUrl: 'app/views/cotalog-type.tmpl.html',
            controller: 'SeriesController',
            controllerAs: 'catalogVm'
            } )
            .when( '/movie/edit/:id', {
            templateUrl: 'app/views/editmovie.tmpl.html',
            controller: 'MovieDetailsController',
            controllerAs: 'movieDetailsVm'
            } )
            .otherwise({
                redirectTo:'/home'
            });
    }


})();