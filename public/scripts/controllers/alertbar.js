'use strict';

angular.module('hiveup-main')
.controller('AlertbarCtrl', function AlertbarCtrl($scope, $location, ErrorService) {

    $scope.alerts = ErrorService.alerts;

    $scope.closeAlert = function(index) {
        ErrorService.closeAlert(index);
    };

});
