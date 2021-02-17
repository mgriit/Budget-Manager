app.factory('mainService', ['$http', function ($http) {
    var factory = {};

    factory.getPermittedMenu = function () {
        return $http({
            method: 'GET',
            url: '/api/menu'
        });
    };

    return factory;

}]); 