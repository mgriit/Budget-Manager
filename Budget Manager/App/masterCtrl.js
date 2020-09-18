/**
 * Master Controller
 */

app.controller('masterCtrl', ['$scope','$loading' ,MasterCtrl]);

function MasterCtrl($scope, $loading) {
    $scope.mainTitle = 'Home';
    $scope.conTitle = 'Budget Manager';
    $scope.pageTitle = 'Dashboard';
    $scope.pageSubTitle = 'Dashboard';

    $scope.changeMainTitle = function (mainTitle) {
        $scope.mainTitle = mainTitle;
    };
    $scope.changePageTitle = function (newTitle) {
        $scope.pageTitle = newTitle;
    };
    $scope.changePageSubTitle = function (newSubTitle) {
        $scope.pageSubTitle = newSubTitle;
    };

    $scope.mainLoaderStart = function () {
        $loading.start('main');
    };

    $scope.mainLoaderStop = function () {
        $loading.finish('main');
    };
}