app.controller("homeCtrl", ['$scope', '$http', '$state', '$stateParams','$log',
function ($scope, $http, $state, $stateParams) {
       $scope.codes = [];

       $scope.pagingInfo = {
           page: angular.isUndefined($stateParams.page) ? 1 : $stateParams.page,
           itemsPerPage: angular.isUndefined($stateParams.items) ? 15 : $stateParams.items,
           search: '',
           sortBy: 0,
           totalItems: 0
       };

       $scope.pageChange = function () {
           $state.go("codes.home", { page: $scope.pagingInfo.page, items: $scope.pagingInfo.itemsPerPage });
       };

       $http.get('/api/tutorial/', { params: $scope.pagingInfo}).then(function (response) {
           $scope.tutorials = response.data.Tutorials;
           $scope.pagingInfo.totalItems = response.data.TotalCount;
       });
   }]
);