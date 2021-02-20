angular.module('app').controller("transactionRootCtrl", ['$scope', 'codeService', 'fiscalYearService', 'transTypeService', function ($scope, codeService, fiscalYearService, transTypeService) {
    $scope.codesShort = [];
    $scope.fiscalYearShort = [];
    $scope.transTypeShort = [];
    $scope.code = {};
    $scope.fiscalYear = {};
    $scope.transType = {};
    $scope.code.selected = undefined;
    $scope.fiscalYear.selected = undefined;
    $scope.transType.selected = undefined;

    codeService.getCodesShort().then(function successCallback(response) {
        $scope.codesShort = response.data;
    }, function errorCallback(response) {
    });

    fiscalYearService.getFiscalYearShort().then(function successCallback(response) {
        $scope.fiscalYearShort = response.data;
    }, function errorCallback(response) {
    });

    transTypeService.getTransTypeShort().then(function successCallback(response) {
        $scope.transTypeShort = response.data;
    }, function errorCallback(response) {
    });


}]);