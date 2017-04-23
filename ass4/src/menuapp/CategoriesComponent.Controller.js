(function () {
    'use strict';

 angular.module('MenuApp')
.controller('CategoriesComponentController', CategoriesComponentController);
    CategoriesComponentController.$inject = ['$scope', '$state'];
    function CategoriesComponentController($scope, $state) {
        $scope.$state = $state;
    }

})();
