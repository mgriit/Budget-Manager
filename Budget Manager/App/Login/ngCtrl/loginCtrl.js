app.controller("loginCtrl", ['$scope', '$rootScope', '$state', 'accountService', '$loading', function ($scope, $rootScope, $state, accountService, $loading) {
    $scope.account = {
        username: '',
        password: ''
    }
    $scope.message = "";

    $scope.login = function () {
        $loading.start('login');
        accountService.login($scope.account).then(function (data) {
            $loading.finish('login');
            if ($rootScope.toState && $rootScope.toState !== 'login') {
                $state.go($rootScope.toState, $rootScope.toStateParams).then(function () {
                    $rootScope.toState = undefined;
                    $rootScope.toStateParams = undefined;
                });
            } else {
                $state.go('main.dashboard');
            };
        }, function (error) {
            $scope.message = error.error_description;
            $loading.finish('login');
        })
    };
}]);