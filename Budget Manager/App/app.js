var app = angular.module('app', ['ui.router', 'ngCookies', 'ngAnimate', 'ngTouch', 'ui.select', 'ngSanitize', 'ui.bootstrap', 'LocalStorageModule', 'chart.js', 'datatables', 'datatables.buttons', 'darthwade.dwLoading', 'oc.lazyLoad']);

app.config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $ocLazyLoadProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(false);
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'loginCtrl',
            templateUrl: 'App/Login/ngView/login.html',
            resolve: { 
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Login/ngCtrl/loginCtrl.js'); // Resolve promise and load before view 
                }]
            },
            data: {
                requireLogin: false
            }
        })
        .state('main', {
            templateUrl: 'App/Main/ngView/main.html',
            controller: 'mainCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'App/Main/ngService/mainService.js',
                            'App/Main/ngCtrl/mainCtrl.js'
                        ]
                    }); 
                }]
            },
            abstract: true
        })
        .state('main.dashboard', {
            url: '/dashboard',
            templateUrl: 'App/Home/ngView/home.html',
            controller: 'homeCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Home/ngCtrl/homeCtrl.js'); 
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.code', {
            url: '/code',
            templateUrl: 'App/Codes/ngView/codeRoot.html',
            controller: 'codeRootCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'App/Codes/ngService/codeServie.js',
                            'App/Codes/ngCtrl/codeRootCtrl.js'
                        ]
                    }); 
                }]
            },
            abstract: true
        })
        .state('main.code.home', {
            url: '/:codename',
            templateUrl: 'App/Codes/ngView/codeHome.html',
            controller: 'codeHomeCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Codes/ngCtrl/codeHomeCtrl.js'); 
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.code.add', {
            url: '/add/',
            templateUrl: 'App/Codes/ngView/codeEdit.html',
            controller: 'codeEditCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Codes/ngCtrl/codeEdit.js'); 
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.code.update', {
            url: '/update/:id',
            templateUrl: 'App/Codes/ngView/codeEdit.html',
            controller: 'codeEditCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Codes/ngCtrl/codeEdit.js'); 
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.transaction', {
            url: '/transaction',
            templateUrl: 'App/Transactions/ngView/transactionRoot.html',
            controller: 'transactionRootCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'App/Codes/ngService/codeServie.js',
                            'App/TransType/ngService/transTypeService.js',
                            'App/FiscalYears/ngService/fiscalYearService.js',
                            'App/Transactions/ngService/transactionService.js',
                            'App/Transactions/ngCtrl/transactionRootCtrl.js'
                        ]
                    });
                }]
            },
            abstract: true
        })
        .state('main.transaction.home', {
            url: '/:transactionId',
            templateUrl: 'App/Transactions/ngView/transactionHome.html',
            controller: 'transactionHomeCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Transactions/ngCtrl/transactionHomeCtrl.js');
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.transaction.add', {
            url: '/add/',
            templateUrl: 'App/Transactions/ngView/transactionEdit.html',
            controller: 'transactionEditCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Transactions/ngCtrl/transactionEdit.js');
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.transaction.update', {
            url: '/update/:id',
            templateUrl: 'App/Transactions/ngView/transactionEdit.html',
            controller: 'transactionEditCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Transactions/ngCtrl/transactionEdit.js');
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.user', {
            url: '/user',
            templateUrl: 'App/Users/ngView/userRoot.html',
            controller: 'userRootCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'App/Users/ngService/userManagementService.js',
                            'App/Users/ngCtrl/userRootCtrl.js'
                        ]
                    });
                }]
            },          
            abstract: true
        })
        .state('main.user.home', {
            url: '/:name',
            templateUrl: 'App/Users/ngView/userHome.html',
            controller: 'userHomeCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Users/ngCtrl/userHomeCtrl.js');
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.user.add', {
            url: '/add/',
            templateUrl: 'App/Users/ngView/userEdit.html',
            controller: 'userEditCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Users/ngCtrl/userEdit.js');
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.user.update', {
            url: '/update/:id',
            templateUrl: 'App/Users/ngView/userEdit.html',
            controller: 'userEditCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Users/ngCtrl/userEdit.js');
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.user.myprofile', {
            url: '/myprofile/',
            templateUrl: 'App/Users/ngView/updateProfile.html',
            controller: 'updateProfileCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Users/ngCtrl/updateProfileCtrl.js');
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.role', {
            url: '/role',
            templateUrl: 'App/Role/ngView/roleRoot.html',
            controller: 'roleRootCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'App/Role/ngService/roleService.js',
                            'App/Role/ngCtrl/roleRootCtrl.js'
                        ]
                    });
                }]
            },   
            abstract: true
        })
        .state('main.role.menu', {
            url: '/menu/',
            templateUrl: 'App/Role/ngView/roleMenu.html',
            controller: 'roleMenuCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/Role/ngCtrl/roleMenuCtrl.js');
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.transReport', {
            url: '/transreport',
            templateUrl: 'App/TransReport/ngView/transReport.html',
            controller: 'transReportCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'App/Codes/ngService/codeServie.js',
                            'App/TransType/ngService/transTypeService.js',
                            'App/FiscalYears/ngService/fiscalYearService.js',
                            'App/TransReport/ngCtrl/transReportCtrl.js'
                        ]
                    });
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.codeSummary', {
            url: '/codesummary',
            templateUrl: 'App/CodeSummary/ngView/codeSummary.html',
            controller: 'codeSummaryCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'App/FiscalYears/ngService/fiscalYearService.js',
                            'App/CodeSummary/ngCtrl/codeSummary.js'
                        ]
                    });
                }]
            },
            data: {
                requireLogin: true
            }
        })
        .state('main.about', {
            url: '/about',
            templateUrl: 'App/About/ngView/about.html',
            controller: 'aboutCtrl',
            resolve: {
                LazyLoadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('App/About/ngCtrl/aboutCtrl.js');
                }]
            },
            data: {
                requireLogin: true
            }
        });
}]);

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
