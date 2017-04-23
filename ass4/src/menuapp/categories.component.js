(function () {
    'use strict';

    angular.module('MenuApp')
   .component('categories', {
       controller: CategoriesComponentController,
       templateUrl: 'src/menuapp/templates/categories.template.html',
       bindings: {
           items: '<'
       }


   });
    function CategoriesComponentController($scope, $state) {
        $scope.$state = $state;
    }
})();
