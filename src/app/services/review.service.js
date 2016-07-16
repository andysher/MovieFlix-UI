(function () {
    'use strict';

    angular.module( 'movieflix' )
        .service( 'reviewService', reviewService );

    reviewService.$Inject = ['$http', '$q', 'CONFIG'];

    function reviewService($http, $q, CONFIG) {

        var self = this;

        self.fetchReviews = fetchReviews;
        self.postReview = postReview;


        function fetchReviews(movieID) {
            return $http.get( CONFIG.API_HOST +'/' + movieID + '/reviews' )
                .then( successFn, errorFn );
        }

        function postReview(review) {
            return $http.post(CONFIG.API_HOST +'/' + review.movie.id + '/reviews', review)
                .then(successFn, errorFn);
        }

        function successFn(response) {
            return response.data;
        }

        function errorFn(response) {
            return $q.reject( 'ERROR: ' + response.statusText );
        }
    }

})();