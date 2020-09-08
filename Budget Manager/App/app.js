var app = angular.module('app', ['ui.router', 'ngCookies', 'ngAnimate', 'ngTouch', 'ui.select', 'ngSanitize', 'ui.bootstrap', 'LocalStorageModule', 'chart.js', 'datatables', 'datatables.buttons']);

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
        })
        .state('transaction', {
            url: '/transaction',
            templateUrl: 'App/Transactions/ngView/transactionRoot.html',
            controller: 'transactionRootCtrl',
            abstract: true
        })
        .state('transaction.home', {
            url: '/:transactionId',
            templateUrl: 'App/Transactions/ngView/transactionHome.html',
            controller: 'transactionHomeCtrl',
            data: {
                requireLogin: false
            }
        })
        .state('transaction.add', {
            url: '/add/',
            templateUrl: 'App/Transactions/ngView/transactionEdit.html',
            controller: 'transactionEditCtrl',
            data: {
                requireLogin: false
            }
        })
        .state('transaction.update', {
            url: '/update/:id',
            templateUrl: 'App/Transactions/ngView/transactionEdit.html',
            controller: 'transactionEditCtrl',
            data: {
                requireLogin: false
            }
        })
        .state('transReport', {
            url: '/transreport',
            templateUrl: 'App/TransReport/ngView/transReport.html',
            controller: 'transReportCtrl',
            data: {
                requireLogin: false
            }
        });

   // $locationProvider.html5Mode(true);  
}]);








