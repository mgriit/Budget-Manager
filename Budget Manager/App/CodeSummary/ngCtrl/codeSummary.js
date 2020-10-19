app.controller('codeSummaryCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder', '$http', 'codeService', 'fiscalYearService', 'transTypeService', function ($scope, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder, $http, codeService, fiscalYearService, transTypeService) {
    $scope.changeMainTitle('Code Summary Report');
    $scope.changePageTitle('Code Summary Report');
    $scope.changePageSubTitle('Report / Summary');


    $scope.fiscalYearShort = [];
    $scope.fiscalYear = {};
    $scope.fiscalYear.selected = undefined;
    $scope.pageData = {
        codeSum: [],
        TotalAllotment: 0,
        TotalExpense: 0,
        TotalBalance: 0,
        fiscalYearId: $scope.fiscalYear.selected == undefined ? 0 : $scope.fiscalYear.selected.id,
        fiscalYearName: ''
    };

    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0).withClass('text-center').notSortable(),
        DTColumnDefBuilder.newColumnDef(1).withClass('text-center').notSortable(),
        DTColumnDefBuilder.newColumnDef(2).withClass('text-center').notSortable(),
        DTColumnDefBuilder.newColumnDef(3).withClass('text-center').notSortable(),
        DTColumnDefBuilder.newColumnDef(4).withClass('text-center').notSortable(),
        DTColumnDefBuilder.newColumnDef(5).withClass('text-center').notSortable()
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
                    return '<img style="text-align:center" src="../../../img/new.jpg" height="75" width="500"/>' + printTitle;
                },
                className: 'print-font'
            },
            {
                extend: 'excel',
                text: '<i class="fa fa-file-text-o"></i> Excel',
                titleAttr: 'Excel',
                footer: true,
                title: function () {
                    return 'Rajshahi Cadet College <br/> Code Summary Report';
                }
            }
        ]);


    fiscalYearService.getFiscalYearShort().then(function successCallback(response) {
        $scope.fiscalYearShort = response.data;
    }, function errorCallback(response) {
    });

    $scope.getReport = function () {  
        var fiscalYearName = $scope.fiscalYear.selected == undefined ? 'N/A' : $scope.fiscalYear.selected.name;
        printTitle = '<p style="font-size:14px; text-align:center; padding-top:5px;">Fiscal Year:' + fiscalYearName + '</p>';
        $scope.pageData.fiscalYearId = $scope.fiscalYear.selected == undefined ? 0 : $scope.fiscalYear.selected.id;

        $http({
            method: 'GET',
            url: 'api/report/summary?fiscalYearId=' + $scope.pageData.fiscalYearId
        }).then(function successCallback(response) {
            $scope.pageData.codeSum = response.data.CodeSum;
            $scope.pageData.TotalAllotment = response.data.TotalAllotment;
            $scope.pageData.TotalExpense = response.data.TotalExpense;
            $scope.pageData.TotalBalance = response.data.TotalBalance;
        }, function errorCallback(response) {
        });
    }

    $scope.onResetFiscalYear = function () {
        $scope.fiscalYear.selected = undefined;
    }
}]);