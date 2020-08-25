app.factory('fiscalYearService', ['$http', function ($http) {
    var factory = {};

    factory.getFiscalYearShort = function () {
        return $http({
            method: 'GET',
            url: 'api/FiscalYear/short'
        });
    };

    return factory;
}]); 