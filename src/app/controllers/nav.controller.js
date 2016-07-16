(function () {
    'user strict';


    angular.module( 'movieflix' )
        .controller( 'NavController', NavController );

    NavController.$inject = ['userService', '$rootScope'];
    function NavController(userService, $rootScope) {

        var navVm = this;

        init();

        function init() {
            console.log( 'NavController' );

            if (userService.isAuth == false){
                console.log( 'Login Required' );
                $rootScope.isLoggedIn = 0;
            }
            else{
                console.log( 'Logged In' );
                $rootScope.isLoggedIn = 1;
            }

        }

    }


})();