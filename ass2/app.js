(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var ToBuy = this;
        ToBuy.items = ShoppingListCheckOffService.getItemsToBuy();
        ToBuy.removeItem = function (itemIndex) {

            ShoppingListCheckOffService.removeItem(itemIndex);
        }
    };
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var Bought = this;
        Bought.items = ShoppingListCheckOffService.getItemsBought();
    };

    function ShoppingListCheckOffService() {
        var service = this;

        // List of shopping items to buy
        var toBuy = [
        { name: "cookies", quantity: 10 },
        { name: "apples", quantity: 5 },
        { name: "oranges", quantity: 3 },

        ];
        // List of shopping items that have been bought
        var Bought = [];


        service.removeItem = function (itemIndex) {

            var item = {
                name: toBuy[itemIndex].name,
                quantity: toBuy[itemIndex].quantity
            };
            
            Bought.push(item);
            toBuy.splice(itemIndex, 1);
            console.log(Bought);
        };

        service.getItemsToBuy = function () {
            return toBuy;
        };
        service.getItemsBought = function () {
            return Bought;
        };
    }
})();