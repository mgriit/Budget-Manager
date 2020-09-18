app.factory('codeTransferService', ['$http', function ($http) {
    var factory = {};

    factory.save = function (obj) {
        return $http({
            method: 'POST',
            data: obj,
            url: '/api/codetransfer'
        });
    };

    return factory;

}]); 