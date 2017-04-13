(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var NID = this;
        NID.searchTerm = "tofu";
         NID.getMatchedMenuItems = function (searchTerm) {
            NID.menu_items = [];
            MenuSearchService.getMatchedMenuItems(searchTerm, NID);
         }
         NID.getMatchedMenuItems(NID.searchTerm);
    };
  
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var menu_items = [];
        var myObj = {};
        service.getMatchedMenuItems = function (searchTerm,NID) {
            $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                alert("search term: " + searchTerm);
                  myObj = response.data;
                for (var i in myObj.menu_items) {
                    if (myObj.menu_items[i].description.indexOf(searchTerm) != -1) {
                        menu_items.push(myObj.menu_items[i].description);
                    }
                }
                NID.menu_items = menu_items;
            });

        }
    }
})();