app.controller('confirmDeleteModalCtrl', function ($scope) {
    $scope.cancel = function () {
        $scope.$dismiss();
    };

    $scope.ok = function () {
        var retObj = {
            press: true
        };
        $scope.$close(retObj);
    };
});
