angular.module('app').factory('roleService', ['$http', function ($http) {
    var factory = {};


    factory.getRolesShort = function () {
        return $http({
            method: 'GET',
            url: '/api/role/short'
        });
    };

    factory.saveRolePermission = function (obj) {
        return $http({
            method: 'POST',
            data: obj,
            url: '/api/menu'
        });
    };

    return factory;

}]); 