(function () {
    'use strict';

    angular.module('MenuApp')
.config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
        .state('home', {
            url: '/',
            templateUrl: 'src/menuapp/templates/home.template.html'
        })

        // All categories
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/menuapp/templates/main-categories.template.html',
            controller: 'CategoriesController as Cats',           
            resolve: {
                items: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getMenuCategories();
                }]
            }
            
        })

        // Item detail
        .state('categories.items', {
            url: '/menuitems/{shortName}',
            templateUrl: 'src/menuapp/templates/menuitems.template.html',
            controller: 'MenuItemsController as MenuItems',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function ($stateParams,MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.shortName);
                }]
            }
        });

    }

})();
