(function () {
    'use strict';

    angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);
    CategoriesController.$inject = ['MenuDataService', 'items','$scope','$state'];
    function CategoriesController(MenuDataService, items,$scope,$state) {
        var Cats = this;
        Cats.items = items;
        $scope.$state = $state;
    }

})();
