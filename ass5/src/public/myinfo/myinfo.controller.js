(function () {
"use strict";

angular.module('public')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['UserDataService', 'MenuService', 'ApiPath'];
function MyinfoController(UserDataService, MenuService, ApiPath) {
    var $ctrl = this;
    $ctrl.signupFlg = false;
    $ctrl.user = UserDataService.getUser();
    if ($ctrl.user.username == undefined){
        $ctrl.signupFlg = true;
        return;
    }
    MenuService.getMenuItems($ctrl.user.shortName).then(function (value) {
        // fulfillment
    }, function (reason) {
        // rejection
    });
 }


})();
