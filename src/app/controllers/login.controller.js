(function () {
    'user strict';


    angular.module( 'movieflix' )
        .controller( 'LoginController', LoginController );

    LoginController.$inject = ['userService','$window','$rootScope'];
    function LoginController(userService,$window,$rootScope) {

        var loginVm = this;
        $rootScope.isUserLoggedIn = false;
        loginVm.credntl = {};
        loginVm.authenticate = authenticate;
        loginVm.logout = logout;
        loginVm.formReset = formReset;
        loginVm.checkUserType = checkUserType;

        init();

        function init() {
            console.log( 'LoginController' );

            if (userService.isAuth == false) {
                $rootScope.isUserLoggedIn = false;
                console.log( 'Login Required' );
            }
            else{
                console.log( 'Logged In' );
                $rootScope.isUserLoggedIn = true;
                $window.location.href = "#/all";
            }

        }
        
        function logout() {
            userService.logOff();            
        }

        function checkUserType() {
             return userService.isAdmin();
        }

        function authenticate() {
            userService
                .userAuth( loginVm.credntl )
                .then( function (user) {
                    loginVm.user = user;
                    $rootScope.isUserLoggedIn = true;
                    console.log( 'Login success' );
                    $window.location.href = "#/home";
                }, function (error) {
                    console.log( error.statusText );
                    alert('Invalid userid/password\nPlease Try Again....!');
                } );
        }
        
        function formReset(form) {
            angular.copy({}.form);
        }

    }


})();