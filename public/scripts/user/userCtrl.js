'use strict';

angular.module('hiveup-main')
.controller('UserSignupCtrl', function($scope, $rootScope, $http, $location, UserService) {

    // The signup function ask the user service to register a new user
    if ($scope.isAuthenticated)
        $location.path('/');

    $scope.signup = function() {
        UserService.signup({
            email: $scope.user.email.toLowerCase(),
            password: $scope.user.password,
        }).success(function (data) {
            if (data.err === undefined) {
                $rootScope.isAuthenticated = true;
            } else {

            }
        });
    };
});

angular.module('hiveup-main')
.controller('UserLoginCtrl', function($scope, $rootScope, $http, $location, UserService, ErrorService) {

    $scope.errorService = ErrorService;
    $scope.user = {}; // This object will be filled by the form

    if ($scope.isAuthenticated)
        $location.path('/');
    // The login function uses the UserService to log the user.
    $scope.login = function() {
        console.log("login function called");

        UserService.login({
            email: $scope.user.email.toLowerCase(),
            password: $scope.user.password,
        }).success(function (res) {
            //The authentication is a success: Go to the profile page.
            $rootScope.isAuthenticated = true;
            $location.path('/');
            ErrorService.addAlert("Welcome back! :)");
        })
        .error(function(){
            //Error: authentication failed.
            ErrorService.addAlert('Oops, it seems that your email or password is invalid!', 'danger');
        });
    };

});

