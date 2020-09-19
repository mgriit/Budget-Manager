app.controller("userEditCtrl", ['$scope', '$stateParams', '$state', 'userManagementService', function ($scope, $stateParams, $state, userManagementService) {
    $scope.user = {
        UserId: 0,
        UserFullName: '',
        Username: '',
        Designation: '',
        Password: '',
        IsAdmin: false
    }

    $scope.id = $stateParams.id;

    if ($scope.id) {
        $scope.changePageTitle('User');
        $scope.changePageSubTitle('User / Update')
        $scope.mainLoaderStart();
        userManagementService.getUser($scope.id).then(function successCallback(response) {
            $scope.mainLoaderStop();
            $scope.user.UserId = response.data.UserId;
            $scope.user.UserFullName = response.data.UserFullName;
            $scope.user.Designation = response.data.Designation;
            $scope.user.Username = response.data.Username;
            $scope.user.Password = response.data.Password;
            $scope.user.IsAdmin = response.data.IsAdmin;
        }, function errorCallback(response) {
                $scope.mainLoaderStop();
        });
    }
    else {
        $scope.changePageTitle('User');
        $scope.changePageSubTitle('User / Add')
    }


    $scope.save = function (form) {
        if (form.$invalid) {
            return;
        }

        $scope.mainLoaderStart();

        userManagementService.save($scope.user).then(function successCallback(response) {
            $scope.mainLoaderStop();
            if ($scope.id)
                $state.go('main.user.home', { name: $scope.user.UserFullName });

            $scope.cleardata(form);

            $scope.addAlert({
                type: 'success',
                msg: 'User has been added successfuly'
            });
        }, function errorCallback(response) {
            $scope.mainLoaderStop();
            $scope.addAlert({
                type: 'danger',
                msg: response.data.Message
            });
        });
    };

    $scope.cleardata = function (f) {
        $scope.user.UserId = 0;
        $scope.user.UserFullName = '';
        $scope.user.Designation = '';
        $scope.user.Username = '';
        $scope.user.Password = '';  
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