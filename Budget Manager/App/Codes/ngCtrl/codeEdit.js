app.controller("codeEditCtrl", ['$scope', '$stateParams', '$state', 'codeService', function ($scope, $stateParams, $state, codeService) {
    $scope.isLoading = false;
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
        $scope.isLoading = true;
        codeService.getCode($scope.id).then(function successCallback(response) {
            $scope.isLoading = false;
            $scope.code.CodeId = response.data.CodeId;
            $scope.code.CodeName = response.data.CodeName;
            $scope.code.CodeNumber = response.data.CodeNumber;
            $scope.code.SerialNo = response.data.SerialNo;
        }, function errorCallback(response) {
        });
    }
    else {
        $scope.changePageTitle('Code');
        $scope.changePageSubTitle('Code / Add')
    }
        

 
    $scope.save = function (isValid) {
        $scope.isLoading = true;
        if (!isValid) {
            $scope.isLoading = false;
            return;
        }
        codeService.saveCode($scope.code).then(function successCallback(response) {
            $scope.isLoading = false;
            if ($scope.id)
                $state.go('code.home', { codename: $scope.code.CodeName });
            $scope.cleardata();
            $scope.addAlert({
                type: 'success',
                msg: 'Code has been added successfuly'
            });
        }, function errorCallback(response) {
            $scope.isLoading = false;
            $scope.addAlert({
                type: 'danger',
                msg: 'Code has not been added! Try again'
            });
        });
    };

    $scope.cleardata = function () {
        $scope.code.CodeId= 0,
        $scope.code.CodeName= '',
        $scope.code.CodeNumber= '',
        $scope.code.SerialNo= ''    
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