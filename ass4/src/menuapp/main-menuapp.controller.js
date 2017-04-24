(function () {
    'use strict';

    angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);
    CategoriesController.$inject = ['MenuDataService', 'items'];
    function CategoriesController(MenuDataService, items) {
        var Cats = this;
        Cats.items = items;
    }

})();
