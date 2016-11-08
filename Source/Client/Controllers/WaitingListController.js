    angular.module('DaycareApp').controller('WaitingListController', ['$scope', '$http', function($scope, $http){
        $scope.variable = "Refresh List"
        
        $scope.test = function() {
            $http.get('/ThisIsATest')
            .then(function(response) {
                alert("An HTTP request has been sent to the server.\nNow updating DaycareDB.db!");
            });
        };

        $scope.loadWaitingList = function() {
            $http.get('/loadWaitingList')
            .then(function(response) {
                alert("HTTP request set, getting data");
            });
        };

    }]);