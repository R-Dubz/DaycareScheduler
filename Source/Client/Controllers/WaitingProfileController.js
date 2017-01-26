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
           (document.getElementById('FridayIn').value !== "null" && document.getElementById('FridayOut').value === "null")
           (document.getElementById('MondayIn2').value === "null" && document.getElementById('MondayOut2').value !== "null") ||
           (document.getElementById('MondayIn2').value !== "null" && document.getElementById('MondayOut2').value === "null") ||
           (document.getElementById('TuesdayIn2').value === "null" && document.getElementById('TuesdayOut2').value !== "null") ||
           (document.getElementById('TuesdayIn2').value !== "null" && document.getElementById('TuesdayOut2').value === "null") ||
           (document.getElementById('WednesdayIn2').value === "null" && document.getElementById('WednesdayOut2').value !== "null") ||
           (document.getElementById('WednesdayIn2').value !== "null" && document.getElementById('WednesdayOut2').value === "null") ||
           (document.getElementById('ThursdayIn2').value === "null" && document.getElementById('ThursdayOut2').value !== "null") ||
           (document.getElementById('ThursdayIn2').value !== "null" && document.getElementById('ThursdayOut2').value === "null") ||
           (document.getElementById('FridayIn2').value === "null" && document.getElementById('FridayOut2').value !== "null") ||
           (document.getElementById('FridayIn2').value !== "null" && document.getElementById('FridayOut2').value === "null")
           (document.getElementById('MondayIn3').value === "null" && document.getElementById('MondayOut3').value !== "null") ||
           (document.getElementById('MondayIn3').value !== "null" && document.getElementById('MondayOut3').value === "null") ||
           (document.getElementById('TuesdayIn3').value === "null" && document.getElementById('TuesdayOut3').value !== "null") ||
           (document.getElementById('TuesdayIn3').value !== "null" && document.getElementById('TuesdayOut3').value === "null") ||
           (document.getElementById('WednesdayIn3').value === "null" && document.getElementById('WednesdayOut3').value !== "null") ||
           (document.getElementById('WednesdayIn3').value !== "null" && document.getElementById('WednesdayOut3').value === "null") ||
           (document.getElementById('ThursdayIn3').value === "null" && document.getElementById('ThursdayOut3').value !== "null") ||
           (document.getElementById('ThursdayIn3').value !== "null" && document.getElementById('ThursdayOut3').value === "null") ||
           (document.getElementById('FridayIn3').value === "null" && document.getElementById('FridayOut3').value !== "null") ||
           (document.getElementById('FridayIn3').value !== "null" && document.getElementById('FridayOut3').value === "null")){
            alert("One of the days is missing an In/Out time. Please try again.");
            return;
        }

        sendID.push(ID.ChildID);
        ID.Classroom = document.getElementById('Classroom').value;
        ID.MI1 = document.getElementById('MondayIn').value;
        ID.MI2 = document.getElementById('MondayIn2').value;
        ID.MI3 = document.getElementById('MondayIn3').value;
        ID.MO1 = document.getElementById('MondayOut').value;
        ID.MO2 = document.getElementById('MondayOut2').value;
        ID.MO3 = document.getElementById('MondayOut3').value;
        ID.TI1 = document.getElementById('TuesdayIn').value;
        ID.TI2 = document.getElementById('TuesdayIn2').value;
        ID.TI3 = document.getElementById('TuesdayIn3').value;
        ID.TO1 = document.getElementById('TuesdayOut').value;
        ID.TO2 = document.getElementById('TuesdayOut2').value;
        ID.TO3 = document.getElementById('TuesdayOut3').value;
        ID.WI1 = document.getElementById('WednesdayIn').value;
        ID.WI2 = document.getElementById('WednesdayIn2').value;
        ID.WI3 = document.getElementById('WednesdayIn3').value;
        ID.WO1 = document.getElementById('WednesdayOut').value;
        ID.WO2 = document.getElementById('WednesdayOut2').value;
        ID.WO3 = document.getElementById('WednesdayOut3').value;
        ID.THI1 = document.getElementById('ThursdayIn').value;
        ID.THI2 = document.getElementById('ThursdayIn2').value;
        ID.THI3 = document.getElementById('ThursdayIn3').value;
        ID.THO1 = document.getElementById('ThursdayOut').value;
        ID.THO2 = document.getElementById('ThursdayOut2').value;
        ID.THO3 = document.getElementById('ThursdayOut3').value;
        ID.FI1 = document.getElementById('FridayIn').value;
        ID.FI2 = document.getElementById('FridayIn2').value;
        ID.FI3 = document.getElementById('FridayIn3').value;
        ID.FO1 = document.getElementById('FridayOut').value;
        ID.FO2 = document.getElementById('FridayOut2').value;
        ID.FO3 = document.getElementById('FridayOut3').value;
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
        document.getElementById('modalContent').style.width = "270px";
//        document.getElementById('inModal').style.empty-cells = "hide";
    }

    $scope.CloseModal = function() {
        $scope.ShowModal = false;
        $scope.numOfRows = 1;
    }

    $scope.addSetOfDays = function(){
        if($scope.numOfRows < 3){
        $scope.numOfRows = $scope.numOfRows+1;
        }

        if($scope.numOfRows === 2){
        document.getElementById('modalContent').style.width = "450px";
        }
        if($scope.numOfRows === 3){
        document.getElementById('modalContent').style.width = "650px";
        }
    } 

    $scope.subSetOfDays = function(){
        if($scope.numOfRows > 1){
        $scope.numOfRows = $scope.numOfRows-1;
        }

        if($scope.numOfRows === 2){
        document.getElementById('modalContent').style.width = "450px";
        }
        if($scope.numOfRows === 1){
        document.getElementById('modalContent').style.width = "270px";
        }
     //   document.getElementById('hideCells').style.empty-cells = "hide";
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