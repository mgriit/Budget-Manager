app.controller('userHomeCtrl', ['$scope', '$stateParams', '$state', '$uibModal', 'userManagementService', function ($scope, $stateParams, $state, $uibModal, userManagementService) {
    $scope.changePageTitle('User');
    $scope.changePageSubTitle('User / List');
    $scope.pageData = {
        users:[],
        page: 1 ,
        itemsPerPage: 15,
        search: '',
        sortBy: '[UserFullName]',
        reverse: false,
        totalItems: 0
    };

    var loadData = function () {

        $scope.mainLoaderStart();

        var params = {
            page: $scope.pageData.page,
            itemsPerPage: $scope.pageData.itemsPerPage,
            search: $scope.pageData.search,
            sortBy: $scope.pageData.sortBy,
            reverse: $scope.pageData.reverse
        };

        $scope.pageData.users = [];

        userManagementService.getAllUsers(params).then(function successCallback(response) {
            $scope.mainLoaderStop();
            $scope.pageData.users = response.data;
            $scope.pageData.totalItems = $scope.pageData.users[0].TotalRow;
        }, function errorCallback(response) {
                $scope.mainLoaderStop();
                $scope.addAlert({
                    type: 'warning',
                    msg: 'No data found!'
                });
        });
    }

    loadData();

    $scope.addNew = function () {
        $state.go('main.user.add');
    }

    $scope.selectPage = function () {
        loadData();
    }
    $scope.search = function () {
        $scope.pageData.page = 1;
        loadData();
    }

    $scope.sort = function (sortBy) {
        $scope.pageData.page = 1;
        
        if (sortBy === $scope.pageData.sortBy) {
            $scope.pageData.reverse = !$scope.pageData.reverse;
        } else {
            $scope.pageData.sortBy = sortBy;
            $scope.pageData.reverse = false;
        }

        loadData();
    }

    $scope.delete = function (id, name) {
        $scope.isConfirmed().result.then(function (result) {
            $scope.mainLoaderStart();
            userManagementService.delete(id).then(function successCallback(response) {
                $scope.mainLoaderStop();
                loadData();
                $scope.addAlert({
                    type: 'success',
                    msg: name + ' has been deleted successfully!'
                });
            }, function errorCallback(response) {
                $scope.mainLoaderStop();
                $scope.addAlert({
                    type: 'warning',
                    msg: name + ' can not be deleted!'
                });
            });
        }, function () {
            return;
        });      
    }

    $scope.reset = function () {
        $scope.pageData.page = 1;
        $scope.pageData.itemsPerPage = 15;
        $scope.pageData.search = '';
        $scope.pageData.sortBy = '[UserFullName]';
        $scope.alerts = [];
        loadData();
    }
    //Alert Builer
    $scope.alerts = [];

    $scope.addAlert = function (alert) {
        $scope.alerts.push(alert);
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    if ($stateParams.name) {
        $scope.addAlert({
            type: 'success',
            msg: $stateParams.name+' has been updated successfully!'
        });
    }
    //Confirm Delete Modal
    $scope.isConfirmed = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'App/Shared/ngView/confirmDeleteModal.html',
            controller: 'confirmDeleteModalCtrl',
            size: 'm'
        });

        return modalInstance;
    };
   }]
);