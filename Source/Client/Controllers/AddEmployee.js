angular.module('DaycareApp').controller('AddEmployee', ['$scope', '$http', function($scope, $http){

    $scope.LoadDB = function(){
        $http.get('/getTempProfile')
        .then(function(response) {
            $scope.Profile.push(response.data[0]);
        });
    };

    $scope.EditProfile = function(){
        $scope.Editing = !$scope.Editing
    };

    $scope.SaveChanges = function(){
        $scope.Profile[0].FirstName = FirstName.value;
        $scope.Profile[0].LastName = LastName.value;
        $scope.Profile[0].DateOfBirth = DateOfBirth.value;
        $scope.Profile[0].EmailAddress = EmailAddress.value;
        $scope.Profile[0].PhoneNumber = PhoneNumber.value;
        $scope.Profile[0].PhoneNumber2 = PhoneNumber2.value;
        $scope.Profile[0].MondayIn = MondayIn.value;
        $scope.Profile[0].MondayOut = MondayOut.value;
        $scope.Profile[0].MondayIn2 = MondayIn.value;
        $scope.Profile[0].MondayOut2 = MondayOut.value;
        $scope.Profile[0].MondayIn3 = MondayIn.value;
        $scope.Profile[0].MondayOut3 = MondayOut.value;
        $scope.Profile[0].TuesdayIn = TuesdayIn.value;
        $scope.Profile[0].TuesdayOut = TuesdayOut.value;
        $scope.Profile[0].TuesdayIn2 = TuesdayIn.value;
        $scope.Profile[0].TuesdayOut2 = TuesdayOut.value;
        $scope.Profile[0].TuesdayIn3 = TuesdayIn.value;
        $scope.Profile[0].TuesdayOut3 = TuesdayOut.value;
        $scope.Profile[0].WednesdayIn = WednesdayIn.value;
        $scope.Profile[0].WedesdayOut = WednesdayOut.value;
        $scope.Profile[0].WednesdayIn2 = WednesdayIn.value;
        $scope.Profile[0].WednesdayOut2 = WednesdayOut.value;
        $scope.Profile[0].WednesdayIn3 = WednesdayIn.value;
        $scope.Profile[0].WednesdayOut3 = WednesdayOut.value;
        $scope.Profile[0].ThursdayIn = ThursdayIn.value;
        $scope.Profile[0].ThursdayOut = ThursdayOut.value;
        $scope.Profile[0].ThursdayIn2 = ThursdayIn.value;
        $scope.Profile[0].ThursdayOut2 = ThursdayOut.value;
        $scope.Profile[0].ThursdayIn3 = ThursdayIn.value;
        $scope.Profile[0].ThursdayOut3 = ThursdayOut.value;
        $scope.Profile[0].FridayIn = FridayIn.value;
        $scope.Profile[0].FridayOut = FridayOut.value;
        $scope.Profile[0].FridayIn2 = FridayIn.value;
        $scope.Profile[0].FridayOut2 = FridayOut.value;
        $scope.Profile[0].FridayIn3 = FridayIn.value;
        $scope.Profile[0].FridayOut3 = FridayOut.value;
        $scope.Profile[0].MoreInfo = MoreInfo.value;
                
       
        var updates = $scope.Profile;
        $http.post('/test', updates)
        .then(function(response) {
            console.log("Success");      
        });
        $scope.Editing = true;  
    };

}]);