angular.module('DaycareApp').controller('EnrolledProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];  
    $scope.ClassroomInfo = {};    
    $scope.Editing = false;  
    $scope.ShowModal = false;
    var modal = document.getElementById('myModal');
    var controllerFunction = $scope;
    $scope.numOfRows = 1;

    $scope.backToList = function() {
        window.location.href = 'Children.html';
    };


    $scope.LoadTempProfile = function() {
        $http.get('/getTempProfile')
        .then(function(response) {
            $scope.Profile.push(response.data[0]);

            if($scope.Profile[0].Classroom !== "" && $scope.Profile[0].Classroom !== "null" && $scope.Profile[0].Classroom !== null){
                $http.get('/getChildClass', {params: {ID: $scope.Profile[0].ChildID, Classroom: $scope.Profile[0].Classroom}})
                .then(function(response) {
                    $scope.ClassroomInfo = response.data[0];
                    console.log("Data received");
                });
            }
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

    $scope.EditClassroomInfo = function(ID){

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
        if(document.getElementById('MondayIn2') !== null){
            if((document.getElementById('MondayIn2').value === "null" && document.getElementById('MondayOut2').value !== "null") ||
            (document.getElementById('MondayIn2').value !== "null" && document.getElementById('MondayOut2').value === "null") ||
            (document.getElementById('TuesdayIn2').value === "null" && document.getElementById('TuesdayOut2').value !== "null") ||
            (document.getElementById('TuesdayIn2').value !== "null" && document.getElementById('TuesdayOut2').value === "null") ||
            (document.getElementById('WednesdayIn2').value === "null" && document.getElementById('WednesdayOut2').value !== "null") ||
            (document.getElementById('WednesdayIn2').value !== "null" && document.getElementById('WednesdayOut2').value === "null") ||
            (document.getElementById('ThursdayIn2').value === "null" && document.getElementById('ThursdayOut2').value !== "null") ||
            (document.getElementById('ThursdayIn2').value !== "null" && document.getElementById('ThursdayOut2').value === "null") ||
            (document.getElementById('FridayIn2').value === "null" && document.getElementById('FridayOut2').value !== "null") ||
            (document.getElementById('FridayIn2').value !== "null" && document.getElementById('FridayOut2').value === "null")){
                alert("One of the days is missing an In/Out time. Please try again.");
                return;
            }
        }
        if(document.getElementById('MondayIn3') !== null){
            if((document.getElementById('MondayIn3').value === "null" && document.getElementById('MondayOut3').value !== "null") ||
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
        }


        var changes = {};
        changes.ChildID = $scope.Profile[0].ChildID;
        changes.oldClassroom = $scope.Profile[0].Classroom;
        changes.Classroom = document.getElementById('Classroom').value;
        changes.MI1 = document.getElementById('MondayIn').value;
        changes.MO1 = document.getElementById('MondayOut').value;
        changes.TI1 = document.getElementById('TuesdayIn').value;
        changes.TO1 = document.getElementById('TuesdayOut').value;
        changes.WI1 = document.getElementById('WednesdayIn').value;
        changes.WO1 = document.getElementById('WednesdayOut').value;
        changes.THI1 = document.getElementById('ThursdayIn').value;
        changes.THO1 = document.getElementById('ThursdayOut').value;
        changes.FI1 = document.getElementById('FridayIn').value;
        changes.FO1 = document.getElementById('FridayOut').value;

        if(document.getElementById('MondayIn2') !== null){
            changes.MI2 = document.getElementById('MondayIn2').value;
            changes.MO2 = document.getElementById('MondayOut2').value;
            changes.TI2 = document.getElementById('TuesdayIn2').value;
            changes.TO2 = document.getElementById('TuesdayOut2').value;
            changes.WI2 = document.getElementById('WednesdayIn2').value;
            changes.WO2 = document.getElementById('WednesdayOut2').value;
            changes.THI2 = document.getElementById('ThursdayIn2').value;
            changes.THO2 = document.getElementById('ThursdayOut2').value;
            changes.FI2 = document.getElementById('FridayIn2').value;
            changes.FO2 = document.getElementById('FridayOut2').value;
        } else {
            changes.MI2 = null;
            changes.MO2 = null;
            changes.TI2 = null;
            changes.TO2 = null;
            changes.WI2 = null;
            changes.WO2 = null;
            changes.THI2 = null;
            changes.THO2 = null;
            changes.FI2 = null;
            changes.FO2 = null;
        }

        if(document.getElementById('MondayIn3') !== null){
            changes.MI3 = document.getElementById('MondayIn3').value;
            changes.MO3 = document.getElementById('MondayOut3').value;
            changes.TI3 = document.getElementById('TuesdayIn3').value;
            changes.TO3 = document.getElementById('TuesdayOut3').value;
            changes.WI3 = document.getElementById('WednesdayIn3').value;
            changes.WO3 = document.getElementById('WednesdayOut3').value;
            changes.THI3 = document.getElementById('ThursdayIn3').value;
            changes.THO3 = document.getElementById('ThursdayOut3').value;
            changes.FI3 = document.getElementById('FridayIn3').value;
            changes.FO3 = document.getElementById('FridayOut3').value;
        } else {
            changes.MI3 = null;
            changes.MO3 = null;
            changes.TI3 = null;
            changes.TO3 = null;
            changes.WI3 = null;
            changes.WO3 = null;
            changes.THI3 = null;
            changes.THO3 = null;
            changes.FI3 = null;
            changes.FO3 = null;
        }

        if (document.getElementById('Classroom').value === "null") {
            $http.post('/deleteChildFromClassroom', changes)
            .then(function(response) {
                alert("Child has been Removed from the classroom");
                $scope.CloseModal();
                window.location.reload(true); 
            });
        }
        else if ($scope.Profile[0].Classroom === document.getElementById('Classroom').value) {
            $http.post('/editChildClassroom', changes)
            .then(function(response) {
                alert("Child's classroom times have been changed");
                $scope.CloseModal();
                window.location.reload(true); 
            });
        }
        else if($scope.Profile[0].Classroom === "" || $scope.Profile[0].Classroom === "null"){
            $http.post('/InsertChildToClass', changes)
            .then(function(response) {
                alert("Child has been inserted into the classroom!"); 
                $scope.CloseModal(); 
                window.location.reload(true);     
            });
        }
        else {
            $http.post('/deleteChildFromClassroom', changes)
            .then(function(response) {
                alert("Child has been removed from the classroom. Beginning to move them to new classroom!");
                $http.post('/InsertChildToClass', changes)
                .then(function(response) {
                    alert("Child has been inserted into the classroom!"); 
                    $scope.CloseModal();  
                    window.location.reload(true);    
                });
            })
        }
    };


    /* MODAL JUNK */

    $scope.OpenModal = function() {
        $scope.ShowModal = true;
        document.getElementById('modalContent').style.width = "270px";
        console.log($scope.numOfRows);
    }

    $scope.CloseModal = function() {
        $scope.ShowModal = false;
        $scope.numOfRows = 1;
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {  
        if (event.target == modal) {
            // $scope.ShowModal = false;
            controllerFunction.CloseModal();
        }
        controllerFunction.$apply(); // This makes it so the page "sees" that we changed the variable.
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
    } 

}]);