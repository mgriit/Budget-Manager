var app = angular.module('app', ['ui.router', 'ngCookies', 'ngAnimate', 'ngTouch', 'ui.select', 'ngSanitize', 'ui.bootstrap', 'LocalStorageModule', 'chart.js', 'datatables', 'datatables.buttons', 'darthwade.dwLoading']);

app.config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(false);
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'App/Login/ngView/login.html',
            controller: 'loginCtrl',
            data: {
                requireLogin: false
            }
        })
        .state('main', {
            templateUrl: 'App/Main/ngView/main.html',
            controller: 'mainCtrl',
            abstract: true
        })
        .state('main.dashboard', {
            url: '/dashboard',
            templateUrl: 'App/Home/ngView/home.html',
            controller: 'homeCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.code', {
            url: '/code',
            templateUrl: 'App/Codes/ngView/codeRoot.html',
            controller: 'codeRootCtrl',
            abstract: true
        })
        .state('main.code.home', {
            url: '/:codename',
            templateUrl: 'App/Codes/ngView/codeHome.html',
            controller: 'codeHomeCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.code.add', {
            url: '/add/',
            templateUrl: 'App/Codes/ngView/codeEdit.html',
            controller: 'codeEditCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.code.update', {
            url: '/update/:id',
            templateUrl: 'App/Codes/ngView/codeEdit.html',
            controller: 'codeEditCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.transaction', {
            url: '/transaction',
            templateUrl: 'App/Transactions/ngView/transactionRoot.html',
            controller: 'transactionRootCtrl',
            abstract: true
        })
        .state('main.transaction.home', {
            url: '/:transactionId',
            templateUrl: 'App/Transactions/ngView/transactionHome.html',
            controller: 'transactionHomeCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.transaction.add', {
            url: '/add/',
            templateUrl: 'App/Transactions/ngView/transactionEdit.html',
            controller: 'transactionEditCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.transaction.update', {
            url: '/update/:id',
            templateUrl: 'App/Transactions/ngView/transactionEdit.html',
            controller: 'transactionEditCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.user', {
            url: '/user',
            templateUrl: 'App/Users/ngView/userRoot.html',
            controller: 'userRootCtrl',
            abstract: true
        })
        .state('main.user.home', {
            url: '/:name',
            templateUrl: 'App/Users/ngView/userHome.html',
            controller: 'userHomeCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.user.add', {
            url: '/add/',
            templateUrl: 'App/Users/ngView/userEdit.html',
            controller: 'userEditCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.user.update', {
            url: '/update/:id',
            templateUrl: 'App/Users/ngView/userEdit.html',
            controller: 'userEditCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.transReport ', {
            url: '/transreport',
            templateUrl: 'App/TransReport/ngView/transReport.html',
            controller: 'transReportCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.codeSummary', {
            url: '/codesummary',
            templateUrl: 'App/CodeSummary/ngView/codeSummary.html',
            controller: 'codeSummaryCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.codeTransfer', {
            url: '/codetransfer',
            templateUrl: 'App/CodeTransfer/ngView/codeTransfer.html',
            controller: 'codeTransferCtrl',
            data: {
                requireLogin: true
            }
        })
        .state('main.about', {
            url: '/about',
            templateUrl: 'App/About/ngView/about.html',
            controller: 'aboutCtrl',
            data: {
                requireLogin: true
            }
        });

    // $locationProvider.html5Mode(true);  
}]);

//global veriable for store service base path
//app.constant('serviceBasePath', 'http://budrcc-001-site1.dtempurl.com');
//app.constant('serviceBasePath', 'http://localhost:50465');

app.run(['$rootScope', '$state', 'userService', function ($rootScope, $state, userService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        var requireLogin = toState.data.requireLogin;

        if (requireLogin && userService.GetCurrentUser() == null) {
            $rootScope.toState = toState.name;
            $rootScope.toStateParams = toParams;
            event.preventDefault();
            $state.go('login');
        }
    });
}]);

app.factory('userService', ['localStorageService', function (localStorageService) {
    var fac = {};
    fac.CurrentUser = null;

    fac.SetCurrentUser = function (user) {
        fac.CurrentUser = user;
        // sessionStorage.user = angular.toJson(user);
        localStorageService.set('authorizationData', user);
    }
    fac.GetCurrentUser = function () {
        //fac.CurrentUser = angular.fromJson(sessionStorage.user);
        fac.CurrentUser = localStorageService.get('authorizationData');
        return fac.CurrentUser;
    }
    return fac;
}])


//http interceptor
app.config(['$httpProvider', function ($httpProvider) {
    var interceptor = function (userService, $q, $location) {
        return {
            request: function (config) {
                var currentUser = userService.GetCurrentUser();
                if (currentUser != null) {
                    config.headers['Authorization'] = 'Bearer ' + currentUser.access_token;
                }
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $location.path('/login');
                    return $q.reject(rejection);
                }
                return $q.reject(rejection);
            }

        }
    }
    var params = ['userService', '$q', '$location'];
    interceptor.$inject = params;
    $httpProvider.interceptors.push(interceptor);
}]);


