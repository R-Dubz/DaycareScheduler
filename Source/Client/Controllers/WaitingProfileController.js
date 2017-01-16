angular.module('DaycareApp').controller('WaitingProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];     
    $scope.Editing = false;  
    $scope.ShowModal = false;
    var modal = document.getElementById('myModal');
    var controllerFunction = $scope;

    $scope.backToList = function() {
      window.location.href = 'Waiting_list.html';
    };


    $scope.LoadTempProfile = function() {
        $http.get('/getTempProfile')
        .then(function(response) {
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
        $scope.Profile[0].GuardianName1 = GuardianName1.value;
        $scope.Profile[0].GuardianStatus1 = GuardianStatus1.value;
        $scope.Profile[0].GuardianEmail1 = GuardianEmail1.value;
        $scope.Profile[0].GuardianPhone1 = GuardianPhone1.value;
        $scope.Profile[0].GuardianName2 = GuardianName2.value;
        $scope.Profile[0].GuardianStatus2 = GuardianStatus2.value;
        $scope.Profile[0].GuardianEmail2 = GuardianEmail2.value;
        $scope.Profile[0].GuardianPhone2 = GuardianPhone2.value;

        var updates = $scope.Profile;
        $http.post('/test', updates)
        .then(function(response) {
            console.log("Success");      
        });
        $scope.Editing = false;  
    };

    $scope.acceptChild = function(ID){
        var sendID = [];
        sendID.push(ID.ChildID);
        ID.Classroom = document.getElementById('Classroom').value;
        ID.MondayIn = document.getElementById('MondayIn').value;
        ID.MondayOut = document.getElementById('MondayOut').value;
        ID.TuesdayIn = document.getElementById('TuesdayIn').value;
        ID.TuesdayOut = document.getElementById('TuesdayOut').value;
        ID.WednesdayIn = document.getElementById('WednesdayIn').value;
        ID.WednesdayOut = document.getElementById('WednesdayOut').value;
        ID.ThursdayIn = document.getElementById('ThursdayIn').value;
        ID.ThursdayOut = document.getElementById('ThursdayOut').value;
        ID.FridayIn = document.getElementById('FridayIn').value;
        ID.FridayOut = document.getElementById('FridayOut').value;
        sendID.push(ID.Classroom);
        if(ID.Classroom !== "null"){
            $http.post('/InsertChildToClass', ID)
            .then(function(response) {
                alert("Child has been inserted into the classroom!"); 

                $http.post('/acceptChild', sendID)
                .then(function(response) {
                    alert("Child has been accepted into the program!");
                    $scope.CloseModal();
                    window.location.href = 'EnrolledDemoPage.html';
                });        
            });
        } else {
            $http.post('/acceptChild', sendID)
            .then(function(response) {
                alert("Child has been accepted into the program!");
                $scope.CloseModal();
                window.location.href = 'EnrolledDemoPage.html';
            });    
        }
    };


    /* MODAL JUNK */

    $scope.OpenModal = function() {
        $scope.ShowModal = true;
    }

    $scope.CloseModal = function() {
        $scope.ShowModal = false;
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {  
        if (event.target == modal) {
            // $scope.ShowModal = false;
            controllerFunction.CloseModal();
        }
        controllerFunction.$apply(); // This makes it so the page "sees" that we changed the variable.
    }

}]);