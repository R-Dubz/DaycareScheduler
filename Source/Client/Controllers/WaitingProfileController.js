angular.module('DaycareApp').controller('WaitingProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];    
    $scope.Editing = false;  
    $scope.ShowModal = false;
    $scope.value = "";
    var modal = document.getElementById('myModal');
    $scope.rooms = ["", "IN", "T1", "T2", "PS3", "PS4", "Progressive", "SA", "Classroom 8"];
    var controllerFunction = $scope;

    $scope.backToList = function() {
      window.location.href = 'Waiting_list.html';
    }

    $scope.LoadTempProfile = function() {
        $http.get('/getTempProfile')
        .then(function(response) {

            response.data[0].jsFriendlyBirthDate = new Date(response.data[0].ChildBirthdate);
            var ChildBirthday = response.data[0].jsFriendlyBirthDate;
            var currentTime = new Date();
            var diff = currentTime - ChildBirthday;
            var age = diff/31557600000;
            if(age >= (6/52) && age < 1){
                response.data[0].ChildAge = "Less than 1 year old";                        
            } else if(age < (6/52)){
                response.data[0].ChildAge = "Less than 6 weeks old";                        
            } else if(age >= 1 && age < 2){
                response.data[0].ChildAge = "1 year old";
            } else if(age >= 2 && age < 3){
                response.data[0].ChildAge = "2 years old";                        
            } else if( age >= 3 && age < 4){
                response.data[0].ChildAge = "3 years old";                        
            } else if( age >= 4 && age < 5){
                response.data[0].ChildAge = "4 years old";                        
            } else if( age >= 5 && age < 6){
                response.data[0].ChildAge = "5 years old";
            } else if( age >= 6 && age < 7){
                response.data[0].ChildAge = "6 years old";
            } else if( age >= 7 && age < 8){
                response.data[0].ChildAge = "7 years old";
            } else if( age >= 8 && age < 9){
                response.data[0].ChildAge = "8 years old";
            } else if( age >= 9 && age < 10){
                response.data[0].ChildAge = "9 years old";
            } else if( age >= 10 && age < 11){
                response.data[0].ChildAge = "10 years old";
            } else if( age >= 11 && age < 12){
                response.data[0].ChildAge = "11 years old";
            } else if( age >= 12 && age < 13){
                response.data[0].ChildAge = "12 years old";
            } else if( age >= 13 && age < 14){
                response.data[0].ChildAge = "13 years old";
            } else if( age >= 14 && age < 15){
                response.data[0].ChildAge = "14 years old";
            } else if( age >= 15 && age < 16){
                response.data[0].ChildAge = "15 years old";
            } else if( age >= 16 && age < 17){
                response.data[0].ChildAge = "16 years old";
            } else if( age >= 17 && age < 18){
                response.data[0].ChildAge = "17 years old";
            } else {
                response.data[0].ChildAge = "Error"; 
            }

            if(response.data[0].AgeGroup === null || response.data[0].AgeGroup === ""){
                if(age >= 1.5 && age < 2){
                    response.data[0].AgeGroup = "T1";         
                } else if(age >= (6/52) && age < 1){
                    response.data[0].AgeGroup = "IN";
                } else if(age >= 1 && age < 1.5){
                    response.data[0].AgeGroup = "IN/T1";                 
                } else if(age >= 2 && age < 3){
                    response.data[0].AgeGroup = "T2";                     
                } else if( age >= 3 && age < 4){
                    response.data[0].AgeGroup = "PS3";             
                } else if( age >= 4 && age < 5){
                    response.data[0].AgeGroup = "PS4";              
                } else if( age >= 5 && age <= 10){
                    response.data[0].AgeGroup = "SA";
                } else {
                    response.data[0].AgeGroup = "None";
                }
            }

            if(response.data[0].Custody !== "Mother" && response.data[0].Custody !== "Father"){
                $scope.value = response.data[0].Custody;
            }
            $scope.Profile.push(response.data[0]);
        });
    };

    $scope.EditProfile = function(){
        $scope.Editing = !$scope.Editing
        // document.getElementById("ChildAge").disabled = true;
    };

        $scope.myFunc = function(target) {
            $scope.Profile[0].AgeGroup = target;
        }; 

        //radio button stuff
        $scope.newValue = function(value) {
            $scope.Profile[0].Custody = value;
        }
        $scope.focusButton = function(){
            var textbox = document.getElementById('otherCustody');
            textbox.focus();
        }
        $scope.focusBox = function(){
            var otherCustodyButton = document.getElementById('otherCustodyButton');
            otherCustodyButton.checked = true;
        }



    $scope.SaveChanges = function(){
        $scope.Profile[0].ChildName = ChildName.value;
        $scope.Profile[0].MaritalStatus = MaritalStatus.value;
        $scope.Profile[0].ChildAge = ChildAge.value;
        $scope.Profile[0].ChildGender = ChildGender.value;
        $scope.Profile[0].ChildBirthdate = ChildBirthdate.value;
        $scope.Profile[0].RequiredDays = RequiredDays.value;        
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

        $scope.Profile[0].jsFriendlyBirthDate = new Date($scope.Profile[0].ChildBirthdate);
        var ChildBirthday = $scope.Profile[0].jsFriendlyBirthDate;
        var currentTime = new Date();
        var diff = currentTime - ChildBirthday;
        var age = diff/31557600000;
        if(age >= (6/52) && age < 1){
            $scope.Profile[0].ChildAge = "Less than 1 year old"; 
            $scope.Editing = !$scope.Editing                       
        } else if(age < (6/52)){
            $scope.Profile[0].ChildAge = "Less than 6 weeks old"; 
            $scope.Editing = !$scope.Editing                       
        } else if(age >= 1 && age < 2){
            $scope.Profile[0].ChildAge = "1 year old";
            $scope.Editing = !$scope.Editing
        } else if(age >= 2 && age < 3){
            $scope.Profile[0].ChildAge = "2 years old"; 
            $scope.Editing = !$scope.Editing                       
        } else if( age >= 3 && age < 4){
            $scope.Profile[0].ChildAge = "3 years old";
            $scope.Editing = !$scope.Editing                        
        } else if( age >= 4 && age < 5){
            $scope.Profile[0].ChildAge = "4 years old";
            $scope.Editing = !$scope.Editing                        
        } else if( age >= 5 && age < 6){
            $scope.Profile[0].ChildAge = "5 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 6 && age < 7){
            $scope.Profile[0].ChildAge = "6 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 7 && age < 8){
            $scope.Profile[0].ChildAge = "7 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 8 && age < 9){
            $scope.Profile[0].ChildAge = "8 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 9 && age < 10){
            $scope.Profile[0].ChildAge = "9 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 10 && age < 11){
            $scope.Profile[0].ChildAge = "10 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 11 && age < 12){
            $scope.Profile[0].ChildAge = "11 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 12 && age < 13){
            $scope.Profile[0].ChildAge = "12 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 13 && age < 14){
            $scope.Profile[0].ChildAge = "13 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 14 && age < 15){
            $scope.Profile[0].ChildAge = "14 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 15 && age < 16){
            $scope.Profile[0].ChildAge = "15 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 16 && age < 17){
            $scope.Profile[0].ChildAge = "16 years old";
            $scope.Editing = !$scope.Editing
        } else if( age >= 17 && age < 18){
            $scope.Profile[0].ChildAge = "17 years old";
            $scope.Editing = !$scope.Editing
        } else {
            $scope.Profile[0].ChildAge = "Error"; 
            $scope.Editing = !$scope.Editing
        } 
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

        sendID.push(ID.ChildID);
        ID.Classroom = document.getElementById('Classroom').value;
        ID.MI1 = document.getElementById('MondayIn').value;
        ID.MO1 = document.getElementById('MondayOut').value;
        ID.TI1 = document.getElementById('TuesdayIn').value;
        ID.TO1 = document.getElementById('TuesdayOut').value;
        ID.WI1 = document.getElementById('WednesdayIn').value;
        ID.WO1 = document.getElementById('WednesdayOut').value;
        ID.THI1 = document.getElementById('ThursdayIn').value;
        ID.THO1 = document.getElementById('ThursdayOut').value;
        ID.FI1 = document.getElementById('FridayIn').value;
        ID.FO1 = document.getElementById('FridayOut').value;

        if(document.getElementById('MondayIn2') !== null){
            ID.MI2 = document.getElementById('MondayIn2').value;
            ID.MO2 = document.getElementById('MondayOut2').value;
            ID.TI2 = document.getElementById('TuesdayIn2').value;
            ID.TO2 = document.getElementById('TuesdayOut2').value;
            ID.WI2 = document.getElementById('WednesdayIn2').value;
            ID.WO2 = document.getElementById('WednesdayOut2').value;
            ID.THI2 = document.getElementById('ThursdayIn2').value;
            ID.THO2 = document.getElementById('ThursdayOut2').value;
            ID.FI2 = document.getElementById('FridayIn2').value;
            ID.FO2 = document.getElementById('FridayOut2').value;
        } else {
            ID.MI2 = null;
            ID.MO2 = null;
            ID.TI2 = null;
            ID.TO2 = null;
            ID.WI2 = null;
            ID.WO2 = null;
            ID.THI2 = null;
            ID.THO2 = null;
            ID.FI2 = null;
            ID.FO2 = null;
        }

        if(document.getElementById('MondayIn3') !== null){
            ID.MI3 = document.getElementById('MondayIn3').value;
            ID.MO3 = document.getElementById('MondayOut3').value;
            ID.TI3 = document.getElementById('TuesdayIn3').value;
            ID.TO3 = document.getElementById('TuesdayOut3').value;
            ID.WI3 = document.getElementById('WednesdayIn3').value;
            ID.WO3 = document.getElementById('WednesdayOut3').value;
            ID.THI3 = document.getElementById('ThursdayIn3').value;
            ID.THO3 = document.getElementById('ThursdayOut3').value;
            ID.FI3 = document.getElementById('FridayIn3').value;
            ID.FO3 = document.getElementById('FridayOut3').value;
        } else {
            ID.MI3 = null;
            ID.MO3 = null;
            ID.TI3 = null;
            ID.TO3 = null;
            ID.WI3 = null;
            ID.WO3 = null;
            ID.THI3 = null;
            ID.THO3 = null;
            ID.FI3 = null;
            ID.FO3 = null;
        }

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