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
        templateUrl: 'views/signup.html',
        controller: 'UserSignupCtrl'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'UserLoginCtrl'
    })
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
