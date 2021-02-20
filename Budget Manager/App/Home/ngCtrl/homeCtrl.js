angular.module('app').controller("homeCtrl", ['$scope', '$state', '$http', function ($scope, $state, $http) {
    $scope.changePageTitle('Dashboard');   
    $scope.changePageSubTitle('Dashboard');
    //--------------------CHART_ONE-----------------------------------
    $scope.labels_one = ["Expense", "Balance"];
    $scope.data_one = [];
    $scope.totalAmount = 0;
    $scope.totalExpense = 0;
    $scope.balance = 0;
    $scope.colors_one = ['#FF0000', '#008000', '#ff8e72','#FDB45C', '#949FB1', '#4D5360'];
    $http({
        method: 'GET',
        url: '/api/dashboard/one'
    }).then(function successCallback(response) {
        if (response.data[0].Type == 'Credit') {
            $scope.totalAmount = response.data[0].Amount;
            $scope.totalExpense = response.data[1].Amount;
        }
        else {
            $scope.totalAmount = response.data[1].Amount;
            $scope.totalExpense = response.data[0].Amount;
        }
        $scope.balance = $scope.totalAmount - $scope.totalExpense;
        $scope.data_one[0] = $scope.totalExpense;
        $scope.data_one[1] = $scope.balance;
    }, function errorCallback(response) {
    });

    //--------------CHART TWO-----------------------------------------------------------------------
    $scope.override_two = [{ barThickness: 15 }, { barThickness: 15 }]
    $scope.colors_two = ['#008000', '#FF0000'];
    $scope.labels_two = [];
    $scope.series_two = ['Series A', 'Series B'];
    $scope.data_two = [];
    $scope.data_two_sub1 = [];
    $scope.data_two_sub2 = [];
    $scope.options_two = {
        maintainAspectRatio: false,
        tooltips: {
            mode: 'index',
            intersect: false
        },
        hover: {
            mode: 'index',
            intersect: false
        }
    };

    $http({
        method: 'GET',
        url: '/api/dashboard/two?fiscalYearId=2'
    }).then(function successCallback(response) {
        response.data.forEach(function myFunction(item, index) {
            $scope.labels_two.push(item.CodeName) 
            $scope.data_two_sub1.push(item.Total);
            $scope.data_two_sub2.push(item.Expense);
        });
        $scope.data_two[0] = $scope.data_two_sub1;
        $scope.data_two[1] = $scope.data_two_sub2;
    }, function errorCallback(response) {
    });
}]);