app.controller('userHomeCtrl', ['$scope', '$stateParams', '$state', '$uibModal', 'codeService', function ($scope, $stateParams, $state, $uibModal, codeService) {
    $scope.changePageTitle('Code');
    $scope.changePageSubTitle('Code / List');
    $scope.pageData = {
        users:[],
        page: 1 ,
        itemsPerPage: 15,
        search: '',
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

        $scope.pageData.codes = [];

        codeService.getAllCodes(params).then(function successCallback(response) {
            $scope.mainLoaderStop();
            $scope.pageData.codes = response.data;
            $scope.pageData.totalItems = $scope.pageData.codes[0].TotalRow;
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
        $state.go('main.code.add');
    }

    $scope.selectPage = function () {
        loadCode();
    }
    $scope.search = function () {
        $scope.pageData.page = 1;
        loadCode();
    }

    $scope.sort = function (sortBy) {
        $scope.pageData.page = 1;
        
        if (sortBy === $scope.pageData.sortBy) {
            $scope.pageData.reverse = !$scope.pageData.reverse;
        } else {
            $scope.pageData.sortBy = sortBy;
            $scope.pageData.reverse = false;
        }

        loadCode();
    }

    $scope.delete = function (id, name) {
        $scope.isConfirmed().result.then(function (result) {
            $scope.mainLoaderStart();
            codeService.deleteCode(id).then(function successCallback(response) {
                $scope.mainLoaderStop();
                loadCode();
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
        $scope.pageData.sortBy = 'SerialNo';
        $scope.alerts = [];
        loadCode();
    }
    //Alert Builer
    $scope.alerts = [];

    $scope.addAlert = function (alert) {
        $scope.alerts.push(alert);
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
    if ($stateParams.codename) {
        $scope.addAlert({
            type: 'success',
            msg: $stateParams.codename+' has been updated successfully!'
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