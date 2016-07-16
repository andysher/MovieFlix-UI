(function() {
    'use strict';

    angular.module('movieflix')
        .service('userService', userService);

    userService.$Inject = ['$http', '$q', 'CONFIG_U', '$rootScope'];

    function userService($http, $q, CONFIG_U, $rootScope) {

        var self = this;
        self.user = {};
        self.isAuth = [];

        self.isAdmin = isAdmin;
        self.userAuth = userAuth;
        self.signUp = signUp;

        self.logOff = logOff;

        function logOff() {
            self.isAuth = false;
            $rootScope.isUserLoggedIn = false;
            self.userLoggedIn = [];
            console.log('Logout');
        }

        function isAdmin() {
            console.log(self.userType);
            if(self.userType == 'Admin'){
                return true;
            } else {
                return false;
            }
        }

        function userAuth(crednl) {
            return $http.post(CONFIG_U.API_HOST + '/auth', crednl)
                .then(successFn, errorFn);
        }

        function signUp(crednl) {
            return $http.post(CONFIG_U.API_HOST, crednl)
                .then(successFn, errorFn);
        }

        function successFn(response) {
            self.isAuth = true;
            self.userLoggedIn=response.data;
            self.userType = response.data.type;
            return self.userLoggedIn;
        }

        function errorFn(response) {
            return $q.reject('ERROR: ' + response.statusText);
        }
    }

})();