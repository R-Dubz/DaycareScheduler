angular.module('DaycareApp').controller('ProfileController', ['$scope', '$http', function($scope, $http){

    $scope.Profile = [];      
    $scope.Editing = false;  

    $scope.LoadTempProfile = function() {
        $http.get('/getTempProfile')
        .then(function(response) {
            // alert("HTTP request set, getting data");
            // $scope.Children.push(response.data);
            $scope.Profile.push(response.data[0]);
        });
    };

    $scope.EditProfile = function(){
        $scope.Editing = !$scope.Editing
    };

}]);