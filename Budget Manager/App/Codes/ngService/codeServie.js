app.factory('codeService', ['$http', function ($http) {
    var factory = {};

    factory.getAllCodes = function () {
        return $http({
            method: 'GET',
            url: '/api/code'
        });
    };

    factory.saveProduct = function ($scope) {
        return $http({
            method: 'POST',
            data: {
                'name': $scope.name,
                'description': $scope.description,
                'price': $scope.price,
                'category_id': 1
            },
            url: '/api/code'
        });
    };

    return factory;

}]); 