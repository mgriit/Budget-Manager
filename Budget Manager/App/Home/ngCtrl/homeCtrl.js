app.controller("homeCtrl", ['$scope', '$state', '$http', function ($scope, $state, $http) {
    $scope.changePageTitle('Dashboard');   
    $scope.changePageSubTitle('Dashboard'); 
    $scope.labels = ["Expense","Balance"];
    $scope.data = [];
    $scope.totalAmount = 0;
    $scope.totalExpense = 0;
    $scope.balance = 0;
    $scope.colors = ['#FF0000', '#008000', '#ff8e72','#FDB45C', '#949FB1', '#4D5360'];
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
        $scope.data[0] = $scope.totalExpense;
        $scope.data[1] = $scope.balance;
    }, function errorCallback(response) {
    });
}]);