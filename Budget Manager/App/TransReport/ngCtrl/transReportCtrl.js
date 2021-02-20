angular.module('app').controller("transReportCtrl", ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', '$http', 'codeService', 'fiscalYearService', 'transTypeService', function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder,$http ,codeService, fiscalYearService, transTypeService) {
    $scope.changeMainTitle('Transaction Report');
    $scope.changePageTitle('Transaction Report');
    $scope.changePageSubTitle('Report / Transaction');
    
    $scope.codesShort = [];
    $scope.fiscalYearShort = [];
    $scope.transTypeShort = [];
   
    $scope.code = {};
    $scope.fiscalYear = {};
    $scope.transType = {};

    $scope.code.selected = undefined;
    $scope.fiscalYear.selected = undefined;
    $scope.transType.selected = undefined;

    $scope.pageData = {
        trans: [],
        balance: 0,
        totalAllotment: 0,
        totalExpense: 0,
        codeId: $scope.code.selected == undefined ? 0 : $scope.code.selected.id,
        fiscalYearId: $scope.fiscalYear.selected == undefined ? 0 : $scope.fiscalYear.selected.id,
        transactionTypeId: $scope.transType.selected == undefined ? 0 : $scope.transType.selected.id,
        codeName: '',
        fiscalYearName: '',
        transTypeName: ''
    };

    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0).withClass('text-center').notSortable(),
        DTColumnDefBuilder.newColumnDef(1).withClass('text-center').notSortable(),
        DTColumnDefBuilder.newColumnDef(2).withClass('text-center').notSortable(),
        DTColumnDefBuilder.newColumnDef(3).withClass('text-center').notSortable(),
        DTColumnDefBuilder.newColumnDef(4).withClass('text-center').notSortable()
    ];
    var printTitle = '';
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('paging', false)
        .withOption('searching', false)
        .withOption('info', false)
        .withButtons([
            {
                extend: 'copy',
                text: '<i class="fa fa-files-o"></i> Copy',
                titleAttr: 'Copy',
                footer: true
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print" aria-hidden="true"></i> Print',
                titleAttr: 'Print',
                footer: true,
                title: function () {
                    return '<img style="text-align:center" src="../../../img/codereport.png" height="75" width="500"/>' + printTitle;
                }
            },
            {
                extend: 'excel',
                text: '<i class="fa fa-file-text-o"></i> Excel',
                titleAttr: 'Excel',
                footer: true,
                title: function () {
                    return 'Transaction Report';
                }
            }
        ]);

    codeService.getCodesShort().then(function successCallback(response) {
        $scope.codesShort = response.data;
    }, function errorCallback(response) {
    });

    fiscalYearService.getFiscalYearShort().then(function successCallback(response) {
        $scope.fiscalYearShort = response.data;
    }, function errorCallback(response) {
    });

    transTypeService.getTransTypeShort().then(function successCallback(response) {
        $scope.transTypeShort = response.data;
    }, function errorCallback(response) {
    });

    $scope.getReport = function () {
        var codeName = $scope.code.selected == undefined ?'N/A':$scope.code.selected.name;
        var fiscalYearName = $scope.fiscalYear.selected == undefined ?'N/A':$scope.fiscalYear.selected.name;
        var transType = $scope.transType.selected == undefined ? 'N/A' : $scope.transType.selected;
        printTitle = '<p style="font-size:14px; text-align:center; padding-top:5px;">Fiscal Year:' + fiscalYearName + '<br/> Code:' + codeName + '</p>';
        $scope.pageData.codeId = $scope.code.selected == undefined ? 0 : $scope.code.selected.id;
        $scope.pageData.fiscalYearId = $scope.fiscalYear.selected == undefined ? 0 : $scope.fiscalYear.selected.id;
        $scope.pageData.transTypeId = $scope.transType.selected == undefined ? 0 : $scope.transType.selected.id;
        
        $http({
            method: 'GET',
            url: 'api/report/trans?fiscalYearId=' + $scope.pageData.fiscalYearId +
                '&&codeID=' + $scope.pageData.codeId + '&&transactionTypeId=' + $scope.pageData.transTypeId
        }).then(function successCallback(response) {
            $scope.pageData.trans = response.data.Trans;
            $scope.pageData.totalAllotment = response.data.TotalAllotment;
            $scope.pageData.totalExpense = response.data.TotalExpense;
            $scope.pageData.balance = response.data.Balance;
        }, function errorCallback(response) {
        });
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
}]);