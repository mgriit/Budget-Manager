app.controller('transactionHomeCtrl', ['$scope', '$stateParams', '$state', '$uibModal', 'transactionService', function ($scope, $stateParams, $state, $uibModal, transactionService) {
    $scope.changePageTitle('Transaction');
    $scope.changePageSubTitle('Transaction / List');
    $scope.pageData = {
        trans: [],
        page: 1,
        itemsPerPage: 15,
        search: '',
        sortBy: 'TransactionId',
        reverse: true,
        totalItems: 0
    };
   

    var loadData = function () {
        $scope.mainLoaderStart();
        var params = {
            page: $scope.pageData.page,
            itemsPerPage: $scope.pageData.itemsPerPage,
            search: $scope.pageData.search,
            sortBy: $scope.pageData.sortBy,
            reverse: $scope.pageData.reverse,
            codeID: $scope.code.selected == undefined ? 0 : $scope.code.selected.id,
            fiscalYearId: $scope.fiscalYear.selected == undefined ? 0 : $scope.fiscalYear.selected.id,
            transactionTypeId: $scope.transType.selected == undefined ? 0 : $scope.transType.selected.id
        };

        $scope.pageData.trans = [];

        transactionService.getAll(params).then(function successCallback(response) {
            $scope.mainLoaderStop();
            $scope.pageData.trans = response.data;
            $scope.pageData.totalItems = $scope.pageData.trans[0].TotalRow;
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
        $state.go('main.transaction.add');
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
            transactionService.delete(id).then(function successCallback(response) {
                $scope.mainLoaderStop();
                loadData();
                $scope.addAlert({
                    type: 'success',
                    msg: 'Transaction has been deleted successfully!'
                });
            }, function errorCallback(response) {
                $scope.mainLoaderStop();
                $scope.addAlert({
                    type: 'warning',
                    msg: 'Transaction can not be deleted!'
                });
            });
        }, function () {
            return;
        });
    }

    $scope.reset = function () {
        $scope.pageData.page = 1;
        $scope.pageData.search = '';
        $scope.pageData.sortBy = 'TransactionId';
        $scope.pageData.reverse = true;
        $scope.pageData.alerts = [];
        $scope.transType.selected = undefined;
        $scope.fiscalYear.selected = undefined;
        $scope.code.selected = undefined;
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

    if ($stateParams.transactionId) {
        $scope.addAlert({
            type: 'success',
            msg:'Transaction has been updated successfully!'
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

    $scope.onResetCode = function () {
        $scope.code.selected = undefined;
        loadData();
    }
    $scope.onSelectChangeCode = function (item) {
        loadData();
    }

    $scope.onResetFiscalYear = function () {
        $scope.fiscalYear.selected = undefined;
        loadData();
    }
    $scope.onSelectChangeFiscalYear = function (item) {
        loadData();
    }

    $scope.onResetTransType = function () {
        $scope.transType.selected = undefined;
        loadData();
    }
    $scope.onSelectChangeTransType = function (item) {
        loadData();
    }

}]
);