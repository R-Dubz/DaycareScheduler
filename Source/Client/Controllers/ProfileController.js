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

    $scope.SaveChanges = function(){
        $scope.Profile[0].ChildName = ChildName.value;
        $scope.Profile[0].MaritalStatus = MaritalStatus.value;
        $scope.Profile[0].ChildAge = ChildAge.value;
        $scope.Profile[0].ChildBirthdate = ChildBirthdate.value;
        $scope.Profile[0].AgeGroup = AgeGroup.value;
        $scope.Profile[0].GaurdianName1 = GaurdianName1.value;
        $scope.Profile[0].GaurdianStatus1 = GaurdianStatus1.value;
        $scope.Profile[0].GaurdianEmail1 = GaurdianEmail1.value;
        $scope.Profile[0].GaurdianPhone1 = GaurdianPhone1.value;
        $scope.Profile[0].GaurdianName2 = GaurdianName2.value;
        $scope.Profile[0].GaurdianStatus2 = GaurdianStatus2.value;
        $scope.Profile[0].GaurdianEmail2 = GaurdianEmail2.value;
        $scope.Profile[0].GaurdianPhone2 = GaurdianPhone2.value;

        var updates = $scope.Profile;
        $http.post('/test', updates)
        .then(function(response) {
            console.log("Success");
            // window.location.href = 'Waiting_list.html';            
        });


        var backToList = function(){
            if($scope.Profile === 'W'){
                window.location.href = 'Waiting_list.html';
            } else {
                window.location.href = 'Children.html';
            }
        }


        $scope.Editing = false;  
    };

}]);