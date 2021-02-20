angular.module('app').controller("updateProfileCtrl", ['$scope', '$stateParams', '$state', 'userManagementService', function ($scope, $stateParams, $state, userManagementService) {
    $scope.user = {
        UserId: 0,
        UserFullName: '',
        Username: '',
        Designation: '',
        Password: ''
    }

  
    $scope.changePageTitle('User');
    $scope.changePageSubTitle('User / MyProfile')
    $scope.mainLoaderStart();
    userManagementService.getMyProfile().then(function successCallback(response) {
        $scope.mainLoaderStop();
        $scope.user.UserId = response.data.UserId;
        $scope.user.UserFullName = response.data.UserFullName;
        $scope.user.Designation = response.data.Designation;
        $scope.user.Username = response.data.Username;
        $scope.user.Password = response.data.Password;
    }, function errorCallback(response) {
        $scope.mainLoaderStop();
    });



    $scope.save = function (form) {
        if (form.$invalid) {
            return;
        }

        $scope.mainLoaderStart();

        userManagementService.updateprofile($scope.user).then(function successCallback(response) {
            $scope.mainLoaderStop();

            $scope.addAlert({
                type: 'success',
                msg: 'Profile has been added successfuly!'
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