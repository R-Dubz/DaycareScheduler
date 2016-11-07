angular.module('DaycareApp').controller('testController', ['$scope', '$http', function($scope, $http){

    $scope.test = function() {
        // console.log("Hello World!");
        alert("An HTTP request has been sent to the server.\nThis request will check the google sheet for new entires and push them to the database.");
    };

}]);

