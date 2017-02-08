angular.module('DaycareApp').controller('EmployeeProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];     
    $scope.Editing = false;  
    $scope.ShowModal = false;
    var modal = document.getElementById('myModal');
    var controllerFunction = $scope;

    $scope.backToList = function() {
      window.location.href = 'Employees.html';
    }

    $scope.LoadTempProfile = function() {
        $http.get('/getTempEmployee')
        .then(function(response) {
            $scope.Profile.push(response.data[0]);
        });
    };

    $scope.EditProfile = function(){
        $scope.Editing = !$scope.Editing
    };
}]);