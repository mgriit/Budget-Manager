angular.module('app').controller("codeEditCtrl", ['$scope', '$stateParams', '$state', 'codeService', function ($scope, $stateParams, $state, codeService) {
    $scope.code = {
        CodeId: 0,
        CodeName: '',
        CodeNumber: '',
        SerialNo: ''
    }
    $scope.id = $stateParams.id;
    if ($scope.id) {
        $scope.changePageTitle('Code');
        $scope.changePageSubTitle('Code / Update')
        $scope.mainLoaderStart();
        codeService.getCode($scope.id).then(function successCallback(response) {
            $scope.mainLoaderStop();
            $scope.code.CodeId = response.data.CodeId;
            $scope.code.CodeName = response.data.CodeName;
            $scope.code.CodeNumber = response.data.CodeNumber;
            $scope.code.SerialNo = response.data.SerialNo;
        }, function errorCallback(response) {
                $scope.mainLoaderStop();
        });
    }
    else {
        $scope.changePageTitle('Code');
        $scope.changePageSubTitle('Code / Add')
    }
        
    $scope.save = function (form) {
        if (form.$invalid) {
            return;
        }

        $scope.mainLoaderStart();
        codeService.saveCode($scope.code).then(function successCallback(response) {
            $scope.mainLoaderStop();
            if ($scope.id)
                $state.go('main.code.home', { codename: $scope.code.CodeName });
            $scope.cleardata(form);
            $scope.addAlert({
                type: 'success',
                msg: 'Code has been added successfuly'
            });
        }, function errorCallback(response) {
            $scope.mainLoaderStop();
            $scope.addAlert({
                type: 'danger',
                msg: 'Code has not been added! Try again'
            });
        });
    };

    $scope.cleardata = function (f) {
        $scope.code.CodeId = 0;
        $scope.code.CodeName = '';
        $scope.code.CodeNumber = '';
        $scope.code.SerialNo = '';
        f.$setUntouched();
        f.$setPristine();
    }
    //Alert Builer
    $scope.alerts = [];

    $scope.addAlert = function (alert) {
        $scope.alerts.push(alert);
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
}]);