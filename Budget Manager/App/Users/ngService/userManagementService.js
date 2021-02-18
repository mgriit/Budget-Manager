app.factory('userManagementService', ['$http', function ($http) {
    var factory = {};

    factory.getAllUsers = function (obj) {
        return $http({
            method: 'GET',
            url: '/api/user?page=' + obj.page + '&&itemsPerPage=' + obj.itemsPerPage + '&&search=' + obj.search + '&&sortBy=' + obj.sortBy + '&&reverse=' + obj.reverse
        });
    };

    factory.getUser = function (id) {
        return $http({
            method: 'GET',
            url: '/api/user?userId=' + id
        });
    };

    factory.getMyProfile = function () {
        return $http({
            method: 'GET',
            url: '/api/myprofile'
        });
    }

    factory.save = function (obj) {
        return $http({
            method: 'POST',
            data: obj,
            url: '/api/user'
        });
    };

    factory.updateprofile = function (obj) {
        return $http({
            method: 'POST',
            data: obj,
            url: '/api/myprofile'
        });
    };

    factory.delete = function (id) {
        return $http({
            method: 'DELETE',
            url: '/api/user?userId=' + id
        });
    };

    factory.getRoles = function () {
        return $http({
            method: 'GET',
            url: '/api/user/role'
        });
    };

    return factory;

}]); 