app.controller('codeHomeCtrl', ['$scope', '$stateParams', '$state', 'codeService', function ($scope, $stateParams, $state, codeService) {

        $scope.pageData = {
           codes:[],
           page: $stateParams.page ? 1 : $stateParams.page,
           itemsPerPage: $stateParams.items ? 15 : $stateParams.items,
           search: '',
           sortBy: 0,
           totalItems: 0
       };

        codeService.getAllCodes().then(function successCallback(response) {
            $scope.pageData.codes = response.data;
        }, function errorCallback(response) {
        });

        $scope.addNew = function () {
            $state.go('code.add');
        }
   }]
);