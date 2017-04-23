(function () {
    'use strict';

    angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");



    MenuDataService.$inject = ['$http', 'ApiBasePath']
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        service.getMenuCategories = function () {
            var items = [];
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            }).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var item = {};
                    item.short_name = response.data[i].short_name;
                    item.name=response.data[i].name;
                    items.push(item);
                };
                return items;
            });

            return response;
        };


        service.getItemsForCategory = function (categoryShortName) {
            var items = [];
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                params: {
                    category: categoryShortName
                }
            }).then(function (response) {
                console.log(response);
                for (var i = 0; i < response.data.menu_items.length; i++) {
                    var item = {};
                    item.name = response.data.menu_items[i].name;
                    item.price = response.data.menu_items[i].price_small;
                    items.push(item);
                };
                return items;
            });
            return response;
        };
    }
})();
