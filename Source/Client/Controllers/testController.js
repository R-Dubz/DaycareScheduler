angular.module('DaycareApp').controller('testController', ['$scope', '$http', function($scope, $http){

    $scope.test = function() {
        console.log("Hello World!");
    };

}]);

