'use strict';

angular.module('hiveup-main')
.controller('MainCtrl', function($scope) {

    $scope.name = "cyril";

    $scope.googleAuth = function() {
    	window.gaWindowSuccess = function(){
    		$scope.name = "gaWindowSuccess";
    		$scope.$apply();
    	}
    	var gaWindow = window.open("/auth/google", "gaWindow", "height=600, width=450");
    };

});

