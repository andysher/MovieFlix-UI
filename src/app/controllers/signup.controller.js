(function () {
    'user strict';


    angular.module( 'movieflix' )
        .controller( 'SignupController', SignupController );

    SignupController.$inject = ['userService','$window'];
    function SignupController(userService,$window) {

        var signupVm = this;
        signupVm.credntl = {};

        signupVm.newSignup = newSignup;
        signupVm.formReset = formReset;


        init();

        function init() {
            console.log( 'SignupController' );
        }
        
        function newSignup() {
            userService
                .signUp( signupVm.credntl )
                .then( function (user) {
                    signupVm.user = user;
                    console.log( 'SignUp success' );
                    $window.location.href = "#/home";
                }, function (error) {
                    console.log( error.statusText );
                    alert('Failed!! User email already exists\nPlease Ty again different email id....!');
                } );
        }

        function formReset(form) {
            angular.copy({}.form);
        }
    }


})();