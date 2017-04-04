(function () {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController',LunchCheckController);
    LunchCheckController.$inject=['$scope'];
    function LunchCheckController ($scope) {
        $scope.test = "hello";
        $scope.meals = "";
        $scope.check = function (meals) {
            var res = meals.split(",");
            $scope.colorflg = false;
            if (res==""){
                $scope.message="Please enter data first!";
                $scope.colorflg = true;
                return;
            }
            if (res.length > 3) {
                $scope.message = "Too much!";
            }else{
                $scope.message = "Enjoy!";}
            }

    };

})();