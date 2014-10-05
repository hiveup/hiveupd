'use strict';

/**
 * This is the main module of the web application.
 */
angular.module('hiveup-main', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
.config(function ($routeProvider) {
    $routeProvider
    .when('/signup', {
        templateUrl: 'scripts/user/_signup.html',
        controller: 'UserSignupCtrl'
    })
    .when('/login', {
        templateUrl: 'scripts/user/_login.html',
        controller: 'UserLoginCtrl'
    })
    .when('/', {
        templateUrl: 'scripts/main/_main.html',
        controller: 'MainCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
