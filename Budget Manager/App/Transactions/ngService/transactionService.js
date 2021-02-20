angular.module('app').factory('transactionService', ['$http', function ($http) {
    var factory = {};

    factory.getAll = function (obj) {
        return $http({
            method: 'GET',
            url: '/api/transaction?page=' + obj.page + '&&itemsPerPage=' + obj.itemsPerPage + '&&search=' + obj.search + '&&sortBy=' + obj.sortBy +
                '&&reverse=' + obj.reverse + '&&codeID=' + obj.codeID + '&&fiscalYearId=' + obj.fiscalYearId + '&&transactionTypeId=' + obj.transactionTypeId
        });
    };

    factory.get = function (id) {
        return $http({
            method: 'GET',
            url: '/api/transaction?transactionId=' + id
        });
    };

    factory.save = function (obj) {
        return $http({
            method: 'POST',
            data: obj,
            url: '/api/transaction'
        });
    };

    factory.delete = function (id) {
        return $http({
            method: 'DELETE',
            url: '/api/transaction?transactionId=' + id
        });
    };

    return factory;

}]); 