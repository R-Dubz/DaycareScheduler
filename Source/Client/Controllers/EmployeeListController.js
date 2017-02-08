    angular.module('DaycareApp').controller('EmployeeListController', ['$scope', '$http', function($scope, $http){

        $scope.Children = [];
        $scope.Profile = [];   
        $scope.sortType = 'jsFriendlyTimeStamp'; 
        $scope.sortReverse = true;
        $scope.searchText = '';         
        
        $scope.RefreshDatabase = function() {
            $http.get('/RefreshDatabase')
            .then(function(response) {
                alert("An HTTP request has been sent to the server.\nNow updating DaycareDB.db!");
                // location.reload();
            });
        };

        $scope.LoadEmployeeList = function() {
            $http.get('/LoadEmployeeList')
            .then(function(response) {

            });
        };
    }]);