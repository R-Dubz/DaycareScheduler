angular.module('DaycareApp').controller('AddEmployee', ['$scope', '$http', function($scope, $http){


    var controllerFunction = $scope;
    $scope.numOfRows = 1;


    $scope.SaveChanges = function(){
        var Profile = {};
        Profile.FirstName = document.getElementById("FirstName").value;
        Profile.LastName = document.getElementById("LastName").value;
        Profile.DateOfBirth = document.getElementById("DateOfHire").value;
        Profile.EmailAddress = document.getElementById("EmailAddress").value;
        Profile.PhoneNumber = document.getElementById("PhoneNumber").value;
        Profile.PhoneNumber2 = document.getElementById("PhoneNumber2").value;
                
       
        var updates = Profile;
        $http.post('/addEmployee', updates)
        .then(function(response) {
            console.log("Success");
            window.location.href = 'Employees.html';      
        }); 
    }

    $scope.EditClassroomInfo = function(ID){

            alert("We are now trying to update the database!");

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

            Profile.MI1 = document.getElementById('MondayIn').value;
            Profile.MO1 = document.getElementById('MondayOut').value;
            Profile.TI1 = document.getElementById('TuesdayIn').value;
            Profile.TO1 = document.getElementById('TuesdayOut').value;
            Profile.WI1 = document.getElementById('WednesdayIn').value;
            Profile.WO1 = document.getElementById('WednesdayOut').value;
            Profile.THI1 = document.getElementById('ThursdayIn').value;
            Profile.THO1 = document.getElementById('ThursdayOut').value;
            Profile.FI1 = document.getElementById('FridayIn').value;
            Profile.FO1 = document.getElementById('FridayOut').value;

            if(document.getElementById('MondayIn2') !== null){
                Profile.MI2 = document.getElementById('MondayIn2').value;
                Profile.MO2 = document.getElementById('MondayOut2').value;
                Profile.TI2 = document.getElementById('TuesdayIn2').value;
                Profile.TO2 = document.getElementById('TuesdayOut2').value;
                Profile.WI2 = document.getElementById('WednesdayIn2').value;
                Profile.WO2 = document.getElementById('WednesdayOut2').value;
                Profile.THI2 = document.getElementById('ThursdayIn2').value;
                Profile.THO2 = document.getElementById('ThursdayOut2').value;
                Profile.FI2 = document.getElementById('FridayIn2').value;
                Profile.FO2 = document.getElementById('FridayOut2').value;
            } else {
                Profile.MI2 = null;
                Profile.MO2 = null;
                Profile.TI2 = null;
                Profile.TO2 = null;
                Profile.WI2 = null;
                Profile.WO2 = null;
                Profile.THI2 = null;
                Profile.THO2 = null;
                Profile.FI2 = null;
                Profile.FO2 = null;
            }

            if(document.getElementById('MondayIn3') !== null){
                Profile.MI3 = document.getElementById('MondayIn3').value;
                Profile.MO3 = document.getElementById('MondayOut3').value;
                Profile.TI3 = document.getElementById('TuesdayIn3').value;
                Profile.TO3 = document.getElementById('TuesdayOut3').value;
                Profile.WI3 = document.getElementById('WednesdayIn3').value;
                Profile.WO3 = document.getElementById('WednesdayOut3').value;
                Profile.THI3 = document.getElementById('ThursdayIn3').value;
                Profile.THO3 = document.getElementById('ThursdayOut3').value;
                Profile.FI3 = document.getElementById('FridayIn3').value;
                Profile.FO3 = document.getElementById('FridayOut3').value;
            } else {
                Profile.MI3 = null;
                Profile.MO3 = null;
                Profile.TI3 = null;
                Profile.TO3 = null;
                Profile.WI3 = null;
                Profile.WO3 = null;
                Profile.THI3 = null;
                Profile.THO3 = null;
                Profile.FI3 = null;
                Profile.FO3 = null;
            }


            $http.post('/addEmployee', Profile)
            .then(function(response) {
                console.log("Success");      
            }); 
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
