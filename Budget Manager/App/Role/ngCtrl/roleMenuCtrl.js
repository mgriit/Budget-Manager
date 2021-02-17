app.controller("roleMenuCtrl", ['$scope', '$state', '$http', 'roleService', function ($scope, $state, $http, roleService) {
    $scope.rolesShort = [];
    $scope.role = {};
    $scope.role.selected = undefined;

    $scope.menus = [];

    roleService.getRolesShort().then(function successCallback(response) {
        $scope.rolesShort = response.data;
    }, function errorCallback(response) {
    });

    $scope.getMenu = function () {
        if ($scope.role.selected == undefined) {
            return;
        }
        $scope.mainLoaderStart();
        $http({
            method: 'GET',
            url: 'api/menu?roleId=' + $scope.role.selected.id
        }).then(function successCallback(response) {
            $scope.menus = response.data;
            $scope.mainLoaderStop();
        }, function errorCallback(response) {
            $scope.mainLoaderStop();
            $scope.addAlert({
                type: 'danger',
                msg: 'Menu can not be loaded! Try again'
            });
        });
    }

    $scope.setMenu = function () {
        if ($scope.role.selected == undefined) {
            return;
        }

        var RoleMenuPermission = {};
        RoleMenuPermission.RoleId = $scope.role.selected.id;
        RoleMenuPermission.Menus = $scope.menus;
        $scope.mainLoaderStart();
        roleService.saveRolePermission(RoleMenuPermission)
            .then(function successCallback(response) {
                $scope.mainLoaderStop();
                $scope.addAlert({
                    type: 'success',
                    msg: 'Menu permission has been updated successfuly'
                });
                location.reload(); 
            }, function errorCallback(response) {
                $scope.mainLoaderStop();
                $scope.addAlert({
                    type: 'danger',
                    msg: 'Permission can not be updated! Try again'
                });
            });
        
    }

    $scope.onResetRole = function () {
        $scope.role.selected = undefined;
        $scope.menus = [];
    }
    $scope.onSelectChangeRole = function () {
        $scope.menus = [];
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