    angular.module('DaycareApp').controller('EmployeeListController', ['$scope', '$http', function($scope, $http){

        $scope.Employees = [];
        $scope.Profile = [];   
        $scope.sortType = 'jsFriendlyTimeStamp'; 
        $scope.sortReverse = true;
        $scope.searchText = '';         
        

        $scope.LoadEmployeeList = function() {
            $http.get('/LoadEmployeeList')
            .then(function(response) {
                $scope.Employees = response.data;
            });
        };


        $scope.storeProfile = function(employee){
            $http.post('/storeTempEmployeeProfile', employee)
            .then(function(response) {
                window.location.href = 'EmployeeDemoDev.html';
            });
        }


    }]);