(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var NID = this;
        NID.searchTerm = "chicken";
        var menu_items = [];
        menu_items = MenuSearchService.getMatchedMenuItems("chicken");
        console.log("Data in the controller:")
        console.log(menu_items);
    };
  
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var menu_items = [];
        var myObj = {};
        service.getMatchedMenuItems = function (searchTerm) {
            $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                myObj = response.data;
                for (var i in myObj.menu_items) {
                    if (myObj.menu_items[i].description.indexOf(searchTerm) != -1) {
                        menu_items.push(myObj.menu_items[i].description);
                    }
                }
                console.log("Data in the service: " );
                console.log(menu_items);
                return menu_items;
            });

        }
    }
})();