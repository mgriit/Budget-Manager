/**
 * Master Controller
 */

app.controller('masterCtrl', ['$scope', '$cookies', MasterCtrl]);

function MasterCtrl($scope, $cookies) {

    $scope.pageTitle = 'Dashboard';
    $scope.pageSubTitle = 'Dashboard';
    $scope.changePageTitle = function (newTitle) {
        $scope.pageTitle = newTitle;
    };
    $scope.changePageSubTitle = function (newSubTitle) {
        $scope.pageSubTitle = newSubTitle;
    };
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
        if ($scope.toggle=='true') {
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
}