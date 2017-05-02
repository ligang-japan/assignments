(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['UserDataService', 'MenuService', 'ApiPath'];
function SignupController(UserDataService, MenuService,ApiPath) {
    var $ctrl = this;
    var MenuInfo = {};
    $ctrl.menunoShowFlg = false;
    $ctrl.showFlg = false;
    $ctrl.submit = function (UserInfo) {
        $ctrl.showFlg = true;
        UserDataService.saveUserInfo(UserInfo);
        MenuService.getMenuItems(UserInfo.shortName).then(function (response) {
            MenuInfo.title = response.name;
            MenuInfo.description = response.description;
            MenuInfo.basePath = ApiPath;
            UserDataService.saveMenuInfo(MenuInfo);
        }, function (reason) {
            $ctrl.menunoShowFlg = true;
        });
    }
}
    /*

    MyinfoController.$inject = ['UserDataService', 'MenuService', 'ApiPath'];
function MyinfoController(UserDataService, MenuService, ApiPath) {
    alert(ApiPath);
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

    */


})();
