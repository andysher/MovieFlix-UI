(function() {
    'use strict';

    angular
        .module('movieflix')
        .constant('CONFIG', {'API_HOST': 'http://localhost:8080/Movieflix/api'})
        .constant('CONFIG_U', {'API_HOST': 'http://localhost:8080/Movieflix/api/users'});

})();