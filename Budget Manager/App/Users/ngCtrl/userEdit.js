angular.module('app').controller("userEditCtrl", ['$scope', '$stateParams', '$state', 'userManagementService', function ($scope, $stateParams, $state, userManagementService) {
    $scope.user = {
        UserId: 0,
        UserFullName: '',
        Username: '',
        Designation: '',
        Password: '',
        RoleId: 3
    }

    $scope.roles = [];
    $scope.role = {};
    $scope.role.selected = undefined;

    userManagementService.getRoles().then(function successCallback(response) {
        $scope.roles = response.data;
    }, function errorCallback(response) {
    });

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
            $scope.role.selected = { id: response.data.RoleId, name: response.data.RoleName};
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

        $scope.user.RoleId = $scope.role.selected == undefined ? 3 : $scope.role.selected.id;

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

    $scope.onResetRole = function () {
        $scope.role.selected = undefined;
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