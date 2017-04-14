(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .component('foundItems', {
        templateUrl: 'foundItems.html',
        controller:ComponentController,
        bindings: {
            items: '<',
            onRemove: '&'
        }
    });


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
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm).then(function (response) {
                  NID.menu_items = response;
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
                  myObj = response.data;
                for (var i in myObj.menu_items) {
                    if (myObj.menu_items[i].description.indexOf(searchTerm) != -1) {
                        menu_items.push(myObj.menu_items[i].description);
                    }
                }
                return menu_items;
            });

        }
    }
    function ComponentController() {
        var $ctrl = this;
      
        $ctrl.remove=function (myIndex){
            $ctrl.onRemove({Index: myIndex});
        };
    

    }
})();