(function () {
    'use strict';

    angular.module('public')
    .service('UserDataService', UserDataService);

    function UserDataService() {
        var service = this;
        var user = {};
        service.saveUserInfo = function (UserInfo) {
            user = UserInfo;
            user.menuFlg = false;
        };
        service.saveMenuInfo = function (MenuInfo) {
            user.title = MenuInfo.title;
            user.description = MenuInfo.description;
            user.basePath = MenuInfo.basePath;
            user.menuFlg = true;
        };
        service.getUser = function () {
            return user;
        }

        };

})();
