angular.module('DaycareApp').controller('EnrolledProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];  
    $scope.ClassroomInfo = {};    
    $scope.Editing = false;  
    $scope.ShowModal = false;
    var modal = document.getElementById('myModal');
    var controllerFunction = $scope;
    $scope.numOfRows = 1;
    $scope.JSFClassroom = "";
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
                    if($scope.Profile[0].Classroom === "InfantRoom"){
                        $scope.JSFClassroom = "Infant Room";
                    } else if($scope.Profile[0].Classroom === "Toddler1"){
                        $scope.JSFClassroom = "Toddler 1";
                    } else if($scope.Profile[0].Classroom === "Toddler2"){
                        $scope.JSFClassroom = "Toddler 2";
                    } else if($scope.Profile[0].Classroom === "Preschool3"){
                        $scope.JSFClassroom = "Preschool 3";
                    } else if($scope.Profile[0].Classroom === "Preschool4"){
                        $scope.JSFClassroom = "Preschool 4";
                    } else if($scope.Profile[0].Classroom === "SchoolAge"){
                        $scope.JSFClassroom = "School Age";
                    } else if($scope.Profile[0].Classroom === "Classroom8"){
                        $scope.JSFClassroom = "Classroom 8";
                    } else{
                        $scope.JSFClassroom = "";
                    }
                    $scope.ClassroomInfo = response.data[0];
                    $scope.ClassroomInfo.MI1JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.MI1);
                    $scope.ClassroomInfo.MI2JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.MI2);
                    $scope.ClassroomInfo.MI3JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.MI3);
                    $scope.ClassroomInfo.MO1JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.MO1);
                    $scope.ClassroomInfo.MO2JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.MO2);
                    $scope.ClassroomInfo.MO3JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.MO3);
                    $scope.ClassroomInfo.TI1JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.TI1);
                    $scope.ClassroomInfo.TI2JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.TI2);
                    $scope.ClassroomInfo.TI3JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.TI3);
                    $scope.ClassroomInfo.TO1JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.TO1);
                    $scope.ClassroomInfo.TO2JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.TO2);
                    $scope.ClassroomInfo.TO3JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.TO3);
                    $scope.ClassroomInfo.WI1JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.WI1);
                    $scope.ClassroomInfo.WI2JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.WI2);
                    $scope.ClassroomInfo.WI3JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.WI3);
                    $scope.ClassroomInfo.WO1JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.WO1);
                    $scope.ClassroomInfo.WO2JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.WO2);
                    $scope.ClassroomInfo.WO3JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.WO3);
                    $scope.ClassroomInfo.THI1JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.THI1);
                    $scope.ClassroomInfo.THI2JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.THI2);
                    $scope.ClassroomInfo.THI3JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.THI3);
                    $scope.ClassroomInfo.THO1JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.THO1);
                    $scope.ClassroomInfo.THO2JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.THO2);
                    $scope.ClassroomInfo.THO3JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.THO3);
                    $scope.ClassroomInfo.FI1JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.FI1);
                    $scope.ClassroomInfo.FI2JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.FI2);
                    $scope.ClassroomInfo.FI3JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.FI3);
                    $scope.ClassroomInfo.FO1JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.FO1);
                    $scope.ClassroomInfo.FO2JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.FO2);
                    $scope.ClassroomInfo.FO3JSF = $scope.timeTo12HrFormat($scope.ClassroomInfo.FO3);

                    if(($scope.ClassroomInfo.MI2 !== null && $scope.ClassroomInfo.MI2 !== "null") || 
                        ($scope.ClassroomInfo.TI2 !== null && $scope.ClassroomInfo.TI2 !== "null") ||  
                        ($scope.ClassroomInfo.WI2 !== null && $scope.ClassroomInfo.WI2 !== "null") ||  
                        ($scope.ClassroomInfo.THI2 !== null && $scope.ClassroomInfo.THI2 !== "null") || 
                        ($scope.ClassroomInfo.FI2 !== null && $scope.ClassroomInfo.FI2 !== "null")){
                            if(($scope.ClassroomInfo.MI3 !== null && $scope.ClassroomInfo.MI3 !== "null") || 
                            ($scope.ClassroomInfo.TI3 !== null && $scope.ClassroomInfo.TI3 !== "null") ||  
                            ($scope.ClassroomInfo.WI3 !== null && $scope.ClassroomInfo.WI3 !== "null") ||  
                            ($scope.ClassroomInfo.THI3 !== null && $scope.ClassroomInfo.THI3 !== "null") || 
                            ($scope.ClassroomInfo.FI3 !== null && $scope.ClassroomInfo.FI3 !== "null")){
                                $scope.numOfRows = 3;
                            } else {
                                $scope.numOfRows = 2;
                            }
                    }

                    if($scope.numOfRows === 2){
                    document.getElementById('classroomModalContent').style.width = "850px";
                    }
                    if($scope.numOfRows === 3){
                        document.getElementById('classroomModalContent').style.width = "1050px";
                    }


                    console.log("Data received");
                });
            }
            if($scope.Profile[0].Classroom === ""){
                $scope.JSFClassroom = "Classroom: None"
            }
        });
    };

    // $scope.LoadTempProfile = function() {
    //     $http.get('/getTempProfile')
    //     .then(function(response) {
    //         $scope.Profile.push(response.data[0]);
    //     });
    // };

    $scope.EditProfile = function(){
        $scope.Editing = !$scope.Editing
    };

    $scope.SaveChanges = function(){
        $scope.Profile[0].ChildName = ChildName.value;
        //$scope.Profile[0].MaritalStatus = MaritalStatus.value;
        //$scope.Profile[0].ChildAge = ChildAge.value;
        $scope.Profile[0].ChildBirthdate = ChildBirthdate.value;
        $scope.Profile[0].AgeGroup = AgeGroup.value;
        $scope.Profile[0].GuardianName1 = GuardianName1.value;
        //$scope.Profile[0].GuardianStatus1 = GuardianStatus1.value;
        $scope.Profile[0].GuardianEmail1 = GuardianEmail1.value;
        $scope.Profile[0].GuardianPhone1 = GuardianPhone1.value;
        $scope.Profile[0].GuardianName2 = GuardianName2.value;
        //$scope.Profile[0].GuardianStatus2 = GuardianStatus2.value;
        $scope.Profile[0].GuardianEmail2 = GuardianEmail2.value;
        $scope.Profile[0].GuardianPhone2 = GuardianPhone2.value;
        $scope.Profile[0].ChildHomeAddress = ChildHomeAddress.value;
        $scope.Profile[0].HomePhone = HomePhone.value;
        
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
        if ((document.getElementById('Classroom').value === "null" || document.getElementById('Classroom').value === null) && ($scope.Profile[0].Classroom === "" || $scope.Profile[0].Classroom === null || $scope.Profile[0].Classroom === "null")) {
            $scope.CloseModal();
            alert("It appears you are trying to save information for a child who has no classroom\nPlease assign a classroom and try again.\nIf you are attempting to save times for future enrollment, please save this information in the 'Notes' section."); 
        } else if ((document.getElementById('Classroom').value === "null" || document.getElementById('Classroom').value === null) && $scope.Profile[0].Classroom !== "") {
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
        else if($scope.Profile[0].Classroom === "" || $scope.Profile[0].Classroom === "null" || $scope.Profile[0].Classroom === null){
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

    $scope.terminateEnrollment = function(){
         if($scope.Profile[0].Classroom !== "" && $scope.Profile[0].Classroom !== null){ //Check to see if child is in a classroom before unenrolling from the program
            var target = {};
            target.oldClassroom = $scope.Profile[0].Classroom;
            target.ChildID = $scope.Profile[0].ChildID;
            $http.post('/deleteChildFromClassroom', target) // remove from classroom
            .then(function(response) {
                alert("Child has been Removed from the classroom"); 
                var target = {};
                target.ChildID = $scope.Profile[0].ChildID;
                target.Date = new Date();                
                $http.post('/terminateChild', target) // unenroll from program
                .then(function(response) {
                    alert("Child has been unenrolled and is now inactive.\n Those with inactive status for more than 5 years will be permanently deleted from the system."); 
                    window.location.href = 'Children.html';
                });
            });
        } else{
            // There weren't enrolled in a classroom. So only unenroll from the program.
                var target = {};
                target.ChildID = $scope.Profile[0].ChildID;
                target.Date = new Date();                
                $http.post('/terminateChild', target)
                .then(function(response) {
                    alert("Child has been unenrolled and is now inactive.\n Those with inactive status for more than 5 years will be permanently deleted from the system."); 
                    window.location.href = 'Children.html';
                });
        }
    }

    $scope.timeTo12HrFormat = function(time) {   // Take a time in 24 hour format and format it in 12 hour format
        if(time !== "" && time !== null && time !== "null"){
            var time_part_array = time.split(".");
            var ampm = 'AM';

            if (time_part_array[0] >= 12) {
                ampm = 'PM';
            }

            if (time_part_array[0] > 12) {
                time_part_array[0] = time_part_array[0] - 12;
            }

            if(time_part_array[1] == 0){
                time_part_array[1] = "00";
            } else if(time_part_array[1] == 25){
                time_part_array[1] = "15";
            } else if(time_part_array[1] == 5){
                time_part_array[1] = "30";
            } else if(time_part_array[1] == 75){
                time_part_array[1] = "45";
            } else {
                time_part_array[1] = "00";
            }

            var formatted_time = time_part_array[0] + ':' + time_part_array[1] + ampm;

            return formatted_time;
        } else {
            var formatted_time = "";
            return formatted_time;
        }
    };


    /* MODAL JUNK */

    $scope.OpenNotesModal = function(index) {
        $scope.ShowNotesModal = true;
        $scope.CurrentEmployee.index = index;
        document.getElementById('textarea').innerHTML = $scope.Profile[0].MoreInfo;
    }

    $scope.CloseNotesModal = function() {
        $scope.ShowNotesModal = false;
        document.getElementById('textarea').innerHTML = null;
    }

    $scope.SaveNotes = function(){
        var targetChild = {};
        targetChild.ChildID = $scope.Profile[0].ChildID;
        targetChild.ChildNotes = document.getElementById('textarea').innerHTML;
        $scope.Profile[0].ChildNotes = document.getElementById('textarea').innerHTML;
        $http.post('/editChildNotes', targetChild) 
        .then(function(response) {
            $scope.ShowNotesModal = false;
        });
    }

    $scope.OpenModal = function() {
        $scope.ShowModal = true;
        document.getElementById('modalContent').style.width = "600px";
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
        document.getElementById('classroomModalContent').style.width = "850px";
        }
        if($scope.numOfRows === 3){
            document.getElementById('classroomModalContent').style.width = "1050px";
        }
    } 

    $scope.subSetOfDays = function(){
        if($scope.numOfRows > 1){
            $scope.numOfRows = $scope.numOfRows-1;
        }

        if($scope.numOfRows === 2){
            document.getElementById('classroomModalContent').style.width = "850px";
        }
        if($scope.numOfRows === 1){
            document.getElementById('classroomModalContent').style.width = "650px";
        }
    } 

}]);