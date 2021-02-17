app.controller("mainCtrl", ['$scope', '$cookies', '$state', 'accountService', 'userService', 'mainService', function ($scope, $cookies, $state, accountService, userService, mainService) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function () {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function (newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookies.get('toggle'))) {
                $scope.toggle = $cookies.get('toggle');
            } else {
                $scope.toggle = 'true';
            }
        } else {
            $scope.toggle = 'false';
        }

    });

    $scope.toggleSidebar = function () {
        if ($scope.toggle == 'true') {
            $scope.toggle = 'false';
        }
        else {
            $scope.toggle = 'true';
        }
        $cookies.put('toggle', $scope.toggle);

    };

    window.onresize = function () {
        $scope.$apply();
    };

    $scope.logout = function () {
        accountService.logout();
        $state.go('login');
    };

    if (userService.GetCurrentUser()) {
        $scope.userName = userService.GetCurrentUser().userName;
    }

    var loadMenu = function () {
        $scope.menus = [];
        mainService.getPermittedMenu().then(function successCallback(response) {
            $scope.menus = response.data;
        }, function errorCallback(response) {

        });
    }

    loadMenu();

}]);