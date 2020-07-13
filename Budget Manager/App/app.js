var app = angular.module('app', ['ui.router', 'ngCookies','ngAnimate', 'ngTouch', 'ui.bootstrap','LocalStorageModule']);

app.config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider',function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(false);
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'App/Home/ngView/home.html',
            controller: 'homeCtrl'
        })
            .state('code', {
            url: '/code',
            templateUrl: 'App/Codes/ngView/codeRoot.html',
            controller: 'codeRootCtrl',
            abstract: true
        })
        .state('code.home', {
            url: '/:codename',
            templateUrl: 'App/Codes/ngView/codeHome.html',
            controller: 'codeHomeCtrl',
            data: {
                requireLogin: false
            }
        })
        .state('code.add', {
            url: '/add/',
            templateUrl: 'App/Codes/ngView/codeEdit.html',
            controller: 'codeEditCtrl',
            data: {
                requireLogin: false
            }
        })
        .state('code.update', {
            url: '/update/:id',
            templateUrl: 'App/Codes/ngView/codeEdit.html',
            controller: 'codeEditCtrl',
            data: {
                requireLogin: false
            }
        });

   // $locationProvider.html5Mode(true);  
}]);








