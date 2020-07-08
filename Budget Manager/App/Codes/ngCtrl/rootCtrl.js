app.controller("rootCtrl", ['$scope', '$state', '$http', function ($scope, $state, $http) {
    $scope.search = '';
    $scope.tags = [];
    $scope.goSearch = function () {
        $state.go("articles.search", { searchword: $scope.search });
    };
    $http.get('/api/Tags').then(function (response) {
        $scope.tags = response.data;
    },
        function (error) {
        });
}]);