    angular.module('DaycareApp').controller('WaitingListController', ['$scope', '$http', function($scope, $http){
        $scope.test = function() {
            // console.log("Hello World!");
            // alert("An HTTP request has been sent to the server.\nThis request will check the google sheet for new entires and push them to the database.");
            $http.get('/ThisIsATest')
            .then(function(response) {
                alert(response.data);
            });
        };
    }]);