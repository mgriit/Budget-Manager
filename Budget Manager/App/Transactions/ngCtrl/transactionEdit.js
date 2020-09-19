app.controller("transactionEditCtrl", ['$scope', '$stateParams', '$state', 'transactionService', function ($scope, $stateParams, $state, transactionService) {
    $scope.isLoading = false;
    $scope.trans = {
        TransactionId: 0,
        CodeId: 0,
        FiscalYearId: 0,
        TransactionTypeId: 0,
        TransactionAmount: '',
        TransactionNote: ''
    }

    $scope.id = $stateParams.id;
    if ($scope.id) {
        $scope.trans.TransactionId = $scope.id;
        $scope.changePageTitle('Transaction');
        $scope.changePageSubTitle('Transaction / Update');
        $scope.mainLoaderStart();
        transactionService.get($scope.id).then(function successCallback(response) {
            $scope.mainLoaderStop();
            $scope.trans.TransactionId = response.data.TransactionId;
            $scope.code.selected = { id: response.data.CodeId, name: response.data.CodeName };
            $scope.fiscalYear.selected = { id: response.data.FiscalYearId, name: response.data.FiscalYearName };
            $scope.transType.selected = { id: response.data.TransactionTypeId, name: response.data.Status };
            $scope.trans.TransactionAmount = response.data.TransactionAmount;
            $scope.trans.TransactionNote = response.data.TransactionNote;
        }, function errorCallback(response) {
                $scope.mainLoaderStop();
        });
    }
    else {
        $scope.changePageTitle('Transaction');
        $scope.changePageSubTitle('Transaction / Add')
    }

    $scope.save = function (form) {
        if (form.$invalid) {
            return;
        }
        $scope.trans.CodeId = $scope.code.selected.id;
        $scope.trans.FiscalYearId = $scope.fiscalYear.selected.id;
        $scope.trans.TransactionTypeId = $scope.transType.selected.id;

        $scope.mainLoaderStart();

        transactionService.save($scope.trans).then(function successCallback(response) {
            $scope.mainLoaderStop();
            if ($scope.id)
                $state.go('main.transaction.home', { transactionId: $scope.trans.TransactionId });

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
        $scope.trans.TransactionAmount = '';
        $scope.trans.TransactionNote = '';
        $scope.onResetCode();
        $scope.onResetFiscalYear();
        $scope.onResetTransType();
        f.$setUntouched();
        f.$setPristine();
    }

    $scope.onResetCode = function () {
        $scope.code.selected = undefined;
    }
    $scope.onResetFiscalYear = function () {
        $scope.fiscalYear.selected = undefined;
    }
    $scope.onResetTransType = function () {
        $scope.transType.selected = undefined;
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