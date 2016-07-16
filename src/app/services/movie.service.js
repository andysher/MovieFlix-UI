(function() {
    'use strict';

    angular.module('movieflix')
        .service('movieService', movieService);

    movieService.$Inject = ['$http', '$q', 'CONFIG'];

    function movieService($http, $q, CONFIG) {

        var self = this;

        self.getAllTopRated = getAllTopRated;
        self.getMovies= getMovies;
        self.getSeries= getSeries;
        self.getMoviesById = getMoviesById;
        self.deleteMovie = deleteMovie;
        self.updateMovieDetails = updateMovieDetails;

        function getAllTopRated() {
            return $http.get(CONFIG.API_HOST + '/browse/toprated')
                .then(successFn, errorFn);
        }

        function getMovies() {
            return $http.get(CONFIG.API_HOST + '/browse/all/movie')
                .then(successFn, errorFn);
        }

        function getSeries() {
            return $http.get(CONFIG.API_HOST + '/browse/all/series')
                .then(successFn, errorFn);
        }

        function getMoviesById(id) {
            return $http.get(CONFIG.API_HOST + '/' + id)
                .then(successFn, errorFn);
        }
        
        function deleteMovie(id) {
            return $http.delete(CONFIG.API_HOST + '/' + id)
                .then(successFn, errorFn);
        }

        function updateMovieDetails(id, movie) {
            return $http.put(CONFIG.API_HOST + '/' + id, movie)
            .then(successFn,errorFn);
        }

        function successFn(response) {  
            return response.data;
        }

        function errorFn(response) {
            return $q.reject('ERROR: ' + response.statusText);
        }
    }

})();