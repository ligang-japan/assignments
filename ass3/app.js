(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', foundItemsDirective);

    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: foundItemsDirectiveController,
            controllerAs: 'NID',
            bindToController: true
        };

        return ddo;
    }
    function foundItemsDirectiveController() {
        var list = this;

       }
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var NID = this;
        NID.searchTerm = "";
        NID.showFlag = true;
        NID.getMatchedMenuItems = function (searchTerm) {
            NID.menu_items = [];
            NID.showFlag = true;
            if ((searchTerm.length==0)||(searchTerm==undefined)){
                NID.showFlag=false;
                return;
            }
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm).then(function (result) {
                NID.menu_items = result;
                              
                  if (NID.menu_items.length == 0) {
                      NID.showFlag = false;
                  }
            }
                );
        }
        NID.removeItem = function (itemIndex) {
            NID.menu_items.splice(itemIndex, 1);
        }

    }
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var menu_items = [];
        var myObj = {};
        service.getMatchedMenuItems = function (searchTerm) {
         return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                menu_items = [];
                var item;
                  myObj = response.data;
                  for (var i in myObj.menu_items) {
                      item = {};
                    if (myObj.menu_items[i].description.indexOf(searchTerm) != -1) {
                        item.name = myObj.menu_items[i].name;
                        item.short_name = myObj.menu_items[i].short_name;
                        item.description = myObj.menu_items[i].description;
                        menu_items.push(item);
                    }
                }
                return menu_items;
            });

        }
    }
})();