(function () {
'use strict';

  angular.module('MenuApp')
.controller('MenuItemsController', MenuItemsController);

// Version with resolving to 1 item based on $stateParams in route config
MenuItemsController.$inject = ['$stateParams', 'items'];
function MenuItemsController($stateParams, items) {
    var MenuItems = this;
    MenuItems.items = items;
}

})();
