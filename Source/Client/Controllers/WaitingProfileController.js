angular.module('DaycareApp').controller('WaitingProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];     
    $scope.Editing = false;  
    $scope.ShowModal = false;
    var modal = document.getElementById('myModal');
    var controllerFunction = $scope;

    $scope.backToList = function() {
      window.location.href = 'Waiting_list.html';
    }

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

        if((document.getElementById('MondayIn').value === "null" && document.getElementById('MondayOut').value !== "null") ||
           (document.getElementById('MondayIn').value !== "null" && document.getElementById('MondayOut').value === "null") ||
           (document.getElementById('TuesdayIn').value === "null" && document.getElementById('TuesdayOut').value !== "null") ||
           (document.getElementById('TuesdayIn').value !== "null" && document.getElementById('TuesdayOut').value === "null") ||
           (document.getElementById('WednesdayIn').value === "null" && document.getElementById('WednesdayOut').value !== "null") ||
           (document.getElementById('WednesdayIn').value !== "null" && document.getElementById('WednesdayOut').value === "null") ||
           (document.getElementById('ThursdayIn').value === "null" && document.getElementById('ThursdayOut').value !== "null") ||
           (document.getElementById('ThursdayIn').value !== "null" && document.getElementById('ThursdayOut').value === "null") ||
           (document.getElementById('FridayIn').value === "null" && document.getElementById('FridayOut').value !== "null") ||
           (document.getElementById('FridayIn').value !== "null" && document.getElementById('FridayOut').value === "null")){
            alert("One of the days is missing an In/Out time. Please try again.");
            return;
        }

        sendID.push(ID.ChildID);
        ID.Classroom = document.getElementById('Classroom').value;
        ID.MI1 = document.getElementById('MondayIn').value;
        ID.MO1 = document.getElementById('MondayOut').value;
        ID.TI1 = document.getElementById('TuesdayIn').value;
        ID.TO1 = document.getElementById('TuesdayOut').value;
        ID.WI1 = document.getElementById('WednesdayIn').value;
        ID.WO1 = document.getElementById('WednesdayOut').value;
        ID.ThI1 = document.getElementById('ThursdayIn').value;
        ID.ThO1 = document.getElementById('ThursdayOut').value;
        ID.FI1 = document.getElementById('FridayIn').value;
        ID.FO1 = document.getElementById('FridayOut').value;
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

    $scope.numOfRows = 1;

    $scope.OpenModal = function() {
        $scope.ShowModal = true;
    }

    $scope.CloseModal = function() {
        $scope.ShowModal = false;
    }

    $scope.addSetOfDays = function(){
        if($scope.numOfRows < 3){
        $scope.numOfRows = $scope.numOfRows+1;
        }
    } 

    $scope.subSetOfDays = function(){
        if($scope.numOfRows > 0){
        $scope.numOfRows = $scope.numOfRows-1;
        }
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