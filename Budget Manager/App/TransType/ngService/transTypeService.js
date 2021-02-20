angular.module('app').factory('transTypeService', ['$http', function ($http) {
    var factory = {};

    factory.getTransTypeShort = function () {
        return $http({
            method: 'GET',
            url: 'api/TransactionType/short'
        });
    };

    return factory;
}]); 