app.controller('codeHomeCtrl', ['$scope', '$stateParams', '$state', 'codeService', function ($scope, $stateParams, $state, codeService) {
    $scope.changePageTitle('Code');
    $scope.changePageSubTitle('Code / List');
    $scope.pageData = {
        codes:[],
        page: 1 ,
        itemsPerPage: 15,
        search: '',
        sortBy: 'SerialNo',
        totalItems: 0
    };

    var loadCode = function () {
        $scope.isLoading = true;
        var params = {
            page: $scope.pageData.page,
            itemsPerPage: $scope.pageData.itemsPerPage,
            search: $scope.pageData.search,
            sortBy: $scope.pageData.sortBy
        };

        $scope.pageData.codes = [];

        codeService.getAllCodes(params).then(function successCallback(response) {
            $scope.isLoading = false;
            $scope.pageData.codes = response.data;
            $scope.pageData.totalItems = $scope.pageData.codes[0].TotalRow;
        }, function errorCallback(response) {
                $scope.isLoading = false;
                $scope.addAlert({
                    type: 'warning',
                    msg: 'No data found!'
                });
        });
    }

    loadCode();

    $scope.addNew = function () {
        $state.go('code.add');
    }

    $scope.selectPage = function () {
        loadCode();
    }
    $scope.search = function () {
        loadCode();
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
   }]
);