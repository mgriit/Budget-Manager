var app = angular.module("app", ["ui.router", , "ngAnimate", "ngTouch", "ui.bootstrap", "LocalStorageModule"]);

app.config(function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(false);
    $urlRouterProvider.otherwise("/codes");

    $stateProvider
        .state("codes", {
        url: "/codes",
        templateUrl: "App/Codes/ngView/root.html",
        controller: "rootCtrl",
        abstract: true
    })
        .state("codes.home", {
        url: "?page&items",
        templateUrl: "App/Codes/ngView/home.html",
        controller: "homeCtrl",
        data: {
            requireLogin: false
        }
    })
    .state("articles.create", {
        url: "/create",
        templateUrl: "App/articles/ngView/add.html",
        controller: "addCtrl",
        data: {
             requireLogin: true 
        }
    })
    .state("articles.read", {
        url: "/:id/read",
        templateUrl: "App/articles/ngView/read.html",
        controller: "readCtrl",
        data: {
             requireLogin: false 
        }
    })
    .state("articles.popular", {
        url: "/popular?page&items",
        templateUrl: "App/articles/ngView/list.html",
        controller: "listCtrl",
        data: {
            requireLogin: false
        }
    })
    .state("articles.search", {
        url: "/:searchword/search?page&items",
        templateUrl: 'App/articles/ngView/search.html',
        controller: 'searchCtrl',
        data: {
            requireLogin: false
        }
    })
    .state("articles.category", {
        url: "/:catid/category?page&items",
        templateUrl: "App/articles/ngView/list.html",
        controller: "listCtrl",
        data: {
             requireLogin: false 
        }
    })
    .state("articles.tag", {
        url: "/:tagid/tag?page&items",
        templateUrl: 'App/articles/ngView/search.html',
        controller: 'tagCtrl',
        data: {
            requireLogin: false
        }
    })
    .state("articles.preview", {
        url: "/:id/preview",
        templateUrl: "App/articles/ngView/preview.html",
        controller: 'previewCtrl',
        data: {
            requireLogin: true
        }
    });
});








