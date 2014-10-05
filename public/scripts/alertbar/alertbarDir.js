angular.module('hiveup-main')
.directive('alertbar', function () {
    return {
        restrict:'EA',
        templateUrl:'scripts/alertbar/_alertbar.html',
        transclude:true,
        replace:true
    };
});
