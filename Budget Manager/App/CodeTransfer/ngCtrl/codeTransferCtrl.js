app.controller("codeTransferCtrl", ['$scope', 'codeService', 'fiscalYearService', 'codeTransferService', function ($scope, codeService, fiscalYearService, codeTransferService) {
    $scope.changeMainTitle('Code Transfer');
    $scope.changePageTitle('Code Transfer');
    $scope.changePageSubTitle('Code Transfer');

    $scope.codesShort = [];
    $scope.fiscalYearShort = [];
    $scope.sentCode = {};
    $scope.receivedCode = {};
    $scope.fiscalYear = {};
    $scope.sentCode.selected = undefined;
    $scope.receivedCode.selected = undefined;
    $scope.fiscalYear.selected = undefined;

    $scope.codetransfer = {
        SentCodeId: 0,
        ReceivedCodeId: 0,
        FiscalYearId : 0,
        TransactionAmount: '',
        TransactionNote: ''
    }


    codeService.getCodesShort().then(function successCallback(response) {
        $scope.codesShort = response.data;
    }, function errorCallback(response) {
    });

    fiscalYearService.getFiscalYearShort().then(function successCallback(response) {
        $scope.fiscalYearShort = response.data;
    }, function errorCallback(response) {
    });


    $scope.save = function (form) {
        if (form.$invalid) {
            return;
        }

        $scope.codetransfer.SentCodeId = $scope.sentCode.selected.id;
        $scope.codetransfer.ReceivedCodeId = $scope.receivedCode.selected.id;
        $scope.codetransfer.FiscalYearId = $scope.fiscalYear.selected.id;

        if ($scope.codetransfer.SentCodeId == $scope.codetransfer.ReceivedCodeId) {
            $scope.addAlert({
                type: 'danger',
                msg: 'You can not transfer to same code'
            });
            return;
        }

        codeTransferService.save($scope.codetransfer).then(function successCallback(response) {
            $scope.cleardata(form);
            $scope.addAlert({
                type: 'success',
                msg: 'Amount has been transfered successfuly'
            });
        }, function errorCallback(response) {
            $scope.addAlert({
                type: 'danger',
                msg: response.data.Message
            });
        });
    };

    $scope.cleardata = function (f) {
        $scope.codetransfer.TransactionAmount = '';
        $scope.codetransfer.TransactionNote = '';
        $scope.onResetSentCode();
        $scope.onResetReceivedCode();
        $scope.onResetFiscalYear();
        f.$setUntouched();
        f.$setPristine();
    }

    $scope.onResetSentCode = function () {
        $scope.sentCode.selected = undefined;
    }

    $scope.onResetReceivedCode = function () {
        $scope.receivedCode.selected = undefined;
    }

    $scope.onResetFiscalYear = function () {
        $scope.fiscalYear.selected = undefined;
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