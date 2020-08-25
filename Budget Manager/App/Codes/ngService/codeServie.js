app.factory('codeService', ['$http', function ($http) {
    var factory = {};

    factory.getAllCodes = function (obj) {
        return $http({
            method: 'GET',
            url: '/api/code?page=' + obj.page + '&&itemsPerPage=' + obj.itemsPerPage + '&&search=' + obj.search + '&&sortBy=' + obj.sortBy + '&&reverse=' + obj.reverse
        });
    };

    factory.getCode = function (id) {
        return $http({
            method: 'GET',
            url: '/api/code?codeId=' + id
        });
    };

    factory.getCodesShort = function () {
        return $http({
            method: 'GET',
            url: '/api/code/short'
        });
    };

    factory.saveCode = function (obj) {
        return $http({
            method: 'POST',
            data: obj,
            url: '/api/code'
        });
    };

    factory.deleteCode = function (id) {
        return $http({
            method: 'DELETE',
            url: '/api/code?codeId=' + id
        });
    };

    return factory;

}]); 