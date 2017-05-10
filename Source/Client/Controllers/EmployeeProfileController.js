angular.module('DaycareApp').controller('EmployeeProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];     
    $scope.Editing = false;  
    $scope.ShowNotesModal = false;
    $scope.ShowEditModal = false;   
    $scope.ShowAvailabilityModal = false;  
	$scope.CurrentEmployee = {};
    var notesModal = document.getElementById('myNotesModal'); 
    var controllerFunction = $scope;
    $scope.numOfRows = 1;
    $scope.ScheduledDates = [];

    $scope.backToList = function() {
      window.location.href = 'Employees.html';
    }

    $scope.LoadTempEmployeeProfile = function() {
        $http.get('/getTempEmployeeProfile')
        .then(function(response) {
            $scope.ConvertTimesToStrings(response.data[0]);
            $scope.Profile.push(response.data[0]);

            if(($scope.Profile[0].MI2 !== null && $scope.Profile[0].MI2 !== "null") || 
                ($scope.Profile[0].TI2 !== null && $scope.Profile[0].TI2 !== "null") ||  
                ($scope.Profile[0].WI2 !== null && $scope.Profile[0].WI2 !== "null") ||  
                ($scope.Profile[0].THI2 !== null && $scope.Profile[0].THI2 !== "null") || 
                ($scope.Profile[0].FI2 !== null && $scope.Profile[0].FI2 !== "null")){
                    if(($scope.Profile[0].MI3 !== null && $scope.Profile[0].MI3 !== "null") || 
                    ($scope.Profile[0].TI3 !== null && $scope.Profile[0].TI3 !== "null") ||  
                    ($scope.Profile[0].WI3 !== null && $scope.Profile[0].WI3 !== "null") ||  
                    ($scope.Profile[0].THI3 !== null && $scope.Profile[0].THI3 !== "null") || 
                    ($scope.Profile[0].FI3 !== null && $scope.Profile[0].FI3 !== "null")){
                        $scope.numOfRows = 3;
                    } else {
                        $scope.numOfRows = 2;
                    }
            }
            // This is where we will determine the date, the next 4 days, and then load the week schedule into an array
            var currentDate = new Date();
            var sendID = {StaffID: $scope.Profile[0].StaffID};
            $http.post('/callIndivEmployeeSchedule', sendID)
            .then(function(response) {
                debugger;
            });
        });
    };
	

	/*
    $scope.EditProfile = function(){
        $scope.Editing = !$scope.Editing
    };
	*/
	
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
        var targetEmployee = {};
        targetEmployee.StaffID = $scope.Profile[0].StaffID;
        targetEmployee.MoreInfo = document.getElementById('textarea').innerHTML;
        $scope.Profile[0].MoreInfo = document.getElementById('textarea').innerHTML;
        $http.post('/editEmployeeNotes', targetEmployee) 
        .then(function(response) {
            $scope.ShowNotesModal = false;
        });
    }

    $scope.OpenEditModal = function() {
        $scope.ShowEditModal = true;
    }

    $scope.CloseEditModal = function() {
        $scope.ShowEditModal = false;
    }

    $scope.SaveChanges = function(){
        var targetEmployee = {};
        targetEmployee.StaffID = $scope.Profile[0].StaffID;
        targetEmployee.FirstName = $scope.Profile[0].FirstName
        targetEmployee.LastName = $scope.Profile[0].LastName
        targetEmployee.PhoneNumber = $scope.Profile[0].PhoneNumber
        targetEmployee.PhoneNumber2 = $scope.Profile[0].PhoneNumber2
        targetEmployee.EmailAddress = $scope.Profile[0].EmailAddress
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


        targetEmployee.MI1 = document.getElementById('MondayIn').value;
        targetEmployee.MO1 = document.getElementById('MondayOut').value;
        targetEmployee.TI1 = document.getElementById('TuesdayIn').value;
        targetEmployee.TO1 = document.getElementById('TuesdayOut').value;
        targetEmployee.WI1 = document.getElementById('WednesdayIn').value;
        targetEmployee.WO1 = document.getElementById('WednesdayOut').value;
        targetEmployee.THI1 = document.getElementById('ThursdayIn').value;
        targetEmployee.THO1 = document.getElementById('ThursdayOut').value;
        targetEmployee.FI1 = document.getElementById('FridayIn').value;
        targetEmployee.FO1 = document.getElementById('FridayOut').value;

        if(document.getElementById('MondayIn2') !== null){
            targetEmployee.MI2 = document.getElementById('MondayIn2').value;
            targetEmployee.MO2 = document.getElementById('MondayOut2').value;
            targetEmployee.TI2 = document.getElementById('TuesdayIn2').value;
            targetEmployee.TO2 = document.getElementById('TuesdayOut2').value;
            targetEmployee.WI2 = document.getElementById('WednesdayIn2').value;
            targetEmployee.WO2 = document.getElementById('WednesdayOut2').value;
            targetEmployee.THI2 = document.getElementById('ThursdayIn2').value;
            targetEmployee.THO2 = document.getElementById('ThursdayOut2').value;
            targetEmployee.FI2 = document.getElementById('FridayIn2').value;
            targetEmployee.FO2 = document.getElementById('FridayOut2').value;
        } else {
            targetEmployee.MI2 = null;
            targetEmployee.MO2 = null;
            targetEmployee.TI2 = null;
            targetEmployee.TO2 = null;
            targetEmployee.WI2 = null;
            targetEmployee.WO2 = null;
            targetEmployee.THI2 = null;
            targetEmployee.THO2 = null;
            targetEmployee.FI2 = null;
            targetEmployee.FO2 = null;
        }

        if(document.getElementById('MondayIn3') !== null){
            targetEmployee.MI3 = document.getElementById('MondayIn3').value;
            targetEmployee.MO3 = document.getElementById('MondayOut3').value;
            targetEmployee.TI3 = document.getElementById('TuesdayIn3').value;
            targetEmployee.TO3 = document.getElementById('TuesdayOut3').value;
            targetEmployee.WI3 = document.getElementById('WednesdayIn3').value;
            targetEmployee.WO3 = document.getElementById('WednesdayOut3').value;
            targetEmployee.THI3 = document.getElementById('ThursdayIn3').value;
            targetEmployee.THO3 = document.getElementById('ThursdayOut3').value;
            targetEmployee.FI3 = document.getElementById('FridayIn3').value;
            targetEmployee.FO3 = document.getElementById('FridayOut3').value;
        } else {
            targetEmployee.MI3 = null;
            targetEmployee.MO3 = null;
            targetEmployee.TI3 = null;
            targetEmployee.TO3 = null;
            targetEmployee.WI3 = null;
            targetEmployee.WO3 = null;
            targetEmployee.THI3 = null;
            targetEmployee.THO3 = null;
            targetEmployee.FI3 = null;
            targetEmployee.FO3 = null;
        }
        $http.post('/editEmployeeInfo', targetEmployee) 
        .then(function(response) {
            $scope.ShowAvailabilityModal = false;
        });
    }

    $scope.ConvertTimesToStrings = function(employee){
        if(employee.MI1 !== "null"){
            employee.MI1JSF = $scope.timeTo12HrFormat(employee.MI1);
            employee.MO1JSF = $scope.timeTo12HrFormat(employee.MO1);
        } else{
            employee.MI1JSF = "";
            employee.MO1JSF = "";
        }
        if(employee.MI2 !== "null"){
            employee.MI2JSF = $scope.timeTo12HrFormat(employee.MI2);
            employee.MO2JSF = $scope.timeTo12HrFormat(employee.MO2);  
        } else{
            employee.MI2JSF = "";
            employee.MO2JSF = "";
        }
        if(employee.MI3 !== "null"){
            employee.MI3JSF = $scope.timeTo12HrFormat(employee.MI3);
            employee.MO3JSF = $scope.timeTo12HrFormat(employee.MO3);   
        } else{
            employee.MI3JSF = "";
            employee.MO3JSF = "";
        } 
        if(employee.TI1 !== "null"){
            employee.TI1JSF = $scope.timeTo12HrFormat(employee.TI1);
            employee.TO1JSF = $scope.timeTo12HrFormat(employee.TO1);
        } else{
            employee.TI1JSF = "";
            employee.TO1JSF = "";
        }   
        if(employee.TI2 !== "null"){
            employee.TI2JSF = $scope.timeTo12HrFormat(employee.TI2);
            employee.TO2JSF = $scope.timeTo12HrFormat(employee.TO2);  
        } else{
            employee.TI2JSF = "";
            employee.TO2JSF = "";
        }   
        if(employee.TI3 !== "null"){
            employee.TI3JSF = $scope.timeTo12HrFormat(employee.TI3);
            employee.TO3JSF = $scope.timeTo12HrFormat(employee.TO3);   
        } else{
            employee.TI3JSF = "";
            employee.TO3JSF = "";
        } 
        if(employee.WI1 !== "null"){
            employee.WI1JSF = $scope.timeTo12HrFormat(employee.WI1);
            employee.WO1JSF = $scope.timeTo12HrFormat(employee.WO1);
        } else{
            employee.WI1JSF = "";
            employee.WO1JSF = "";
        }   
        if(employee.WI2 !== "null"){
            employee.WI2JSF = $scope.timeTo12HrFormat(employee.WI2);
            employee.WO2JSF = $scope.timeTo12HrFormat(employee.WO2);  
        } else{
            employee.WI2JSF = "";
            employee.WO2JSF = "";
        }   
        if(employee.WI3 !== "null"){
            employee.WI3JSF = $scope.timeTo12HrFormat(employee.WI3);
            employee.WO3JSF = $scope.timeTo12HrFormat(employee.WO3);   
        } else{
            employee.WI3JSF = "";
            employee.WO3JSF = "";
        } 
        if(employee.THI1 !== "null"){
            employee.THI1JSF = $scope.timeTo12HrFormat(employee.THI1);
            employee.THO1JSF = $scope.timeTo12HrFormat(employee.THO1);
        } else{
            employee.THI1JSF = "";
            employee.THO1JSF = "";
        }   
        if(employee.THI2 !== "null"){
            employee.THI2JSF = $scope.timeTo12HrFormat(employee.THI2);
            employee.THO2JSF = $scope.timeTo12HrFormat(employee.THO2);  
        } else{
            employee.THI2JSF = "";
            employee.THO2JSF = "";
        }   
        if(employee.THI3 !== "null"){
            employee.THI3JSF = $scope.timeTo12HrFormat(employee.THI3);
            employee.THO3JSF = $scope.timeTo12HrFormat(employee.THO3);   
        } else{
            employee.THI3JSF = "";
            employee.THO3JSF = "";
        } 
        if(employee.FI1 !== "null"){
            employee.FI1JSF = $scope.timeTo12HrFormat(employee.FI1);
            employee.FO1JSF = $scope.timeTo12HrFormat(employee.FO1);
        } else{
            employee.FI1JSF = "";
            employee.FO1JSF = "";
        }   
        if(employee.FI2 !== "null"){
            employee.FI2JSF = $scope.timeTo12HrFormat(employee.FI2);
            employee.FO2JSF = $scope.timeTo12HrFormat(employee.FO2);  
        } else{
            employee.FI2JSF = "";
            employee.FO2JSF = "";
        }   
        if(employee.FI3 !== "null"){
            employee.FI3JSF = $scope.timeTo12HrFormat(employee.FI3);
            employee.FO3JSF = $scope.timeTo12HrFormat(employee.FO3);   
        } else{
            employee.FI3JSF = "";
            employee.FO3JSF = "";
        } 
    };

    $scope.timeTo12HrFormat = function(time) {   // Take a time in 24 hour format and format it in 12 hour format
        if(time){
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

    $scope.OpenAvailabilityModal = function() {
        $scope.ShowAvailabilityModal = true;
        document.getElementById('availabilityModalContent').style.width = "650px";
    }

    $scope.CloseAvailabilityModal = function() {
        $scope.ShowAvailabilityModal = false;
    }

    $scope.addSetOfDays = function(){
        if($scope.numOfRows < 3){
            $scope.numOfRows = $scope.numOfRows+1;
        }

        if($scope.numOfRows === 2){
        document.getElementById('availabilityModalContent').style.width = "850px";
        }
        if($scope.numOfRows === 3){
            document.getElementById('availabilityModalContent').style.width = "1050px";
        }
    } 

    $scope.subSetOfDays = function(){
        if($scope.numOfRows > 1){
            $scope.numOfRows = $scope.numOfRows-1;
        }

        if($scope.numOfRows === 2){
            document.getElementById('availabilityModalContent').style.width = "850px";
        }
        if($scope.numOfRows === 1){
            document.getElementById('availabilityModalContent').style.width = "650px";
        }
    } 

    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {  
    //     if (event.target == modal) {
    //         // $scope.ShowModal = false;
    //         controllerFunction.CloseModal();
    //     }
    //     controllerFunction.$apply(); // This makes it so the page "sees" that we changed the variable.
    // }
}]);