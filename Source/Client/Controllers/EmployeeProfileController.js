angular.module('DaycareApp').controller('EmployeeProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];     
    $scope.Editing = false;  
    $scope.ShowNotesModal = false;
    $scope.ShowEditModal = false;    
	$scope.CurrentEmployee = {};
    var modal = document.getElementById('myModal'); 
    var controllerFunction = $scope;

    $scope.backToList = function() {
      window.location.href = 'Employees.html';
    }

    $scope.LoadTempEmployeeProfile = function() {
        $http.get('/getTempEmployeeProfile')
        .then(function(response) {
            $scope.ConvertTimesToStrings(response.data[0]);
            $scope.Profile.push(response.data[0]);
        });
    };
	
	$scope.LoadSchedule = function() {
        $http.get('/getSchedule')
        .then(function(response) {
            $scope.Profile.push(response.data[0]);
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
        $http.post('/editEmployeeInfo', targetEmployee) 
        .then(function(response) {
            $scope.ShowEditModal = false;
        });
    }

    $scope.ConvertTimesToStrings = function(employee){
        if(employee.MondayIn !== "null"){
            employee.MondayIn = $scope.timeTo12HrFormat(employee.MondayIn);
            employee.MondayOut = $scope.timeTo12HrFormat(employee.MondayOut);
        } else{
            employee.MondayIn = ""
            employee.MondayOut = "";
        }
        if(employee.MondayIn2 !== "null"){
            employee.MondayIn2 = $scope.timeTo12HrFormat(employee.MondayIn2);
            employee.MondayOut2 = $scope.timeTo12HrFormat(employee.MondayOut2);  
        } else{
            employee.MondayIn2 = ""
            employee.MondayOut2 = "";
        }
        if(employee.MondayIn3 !== "null"){
            employee.MondayIn3 = $scope.timeTo12HrFormat(employee.MondayIn3);
            employee.MondayOut3 = $scope.timeTo12HrFormat(employee.MondayOut3);   
        } else{
            employee.MondayIn3 = ""
            employee.MondayOut3 = "";
        } 
        if(employee.TuesdayIn !== "null"){
            employee.TuesdayIn = $scope.timeTo12HrFormat(employee.TuesdayIn);
            employee.TuesdayOut = $scope.timeTo12HrFormat(employee.TuesdayOut);
        } else{
            employee.TuesdayIn = ""
            employee.TuesdayOut = "";
        }   
        if(employee.TuesdayIn2 !== "null"){
            employee.TuesdayIn2 = $scope.timeTo12HrFormat(employee.TuesdayIn2);
            employee.TuesdayOut2 = $scope.timeTo12HrFormat(employee.TuesdayOut2);  
        } else{
            employee.TuesdayIn2 = ""
            employee.TuesdayOut2 = "";
        }   
        if(employee.TuesdayIn3 !== "null"){
            employee.TuesdayIn3 = $scope.timeTo12HrFormat(employee.TuesdayIn3);
            employee.TuesdayOut3 = $scope.timeTo12HrFormat(employee.TuesdayOut3);   
        } else{
            employee.TuesdayIn3 = ""
            employee.TuesdayOut3 = "";
        } 
        if(employee.WednesdayIn !== "null"){
            employee.WednesdayIn = $scope.timeTo12HrFormat(employee.WednesdayIn);
            employee.WednesdayOut = $scope.timeTo12HrFormat(employee.WednesdayOut);
        } else{
            employee.WednesdayIn = ""
            employee.WednesdayOut = "";
        }   
        if(employee.WednesdayIn2 !== "null"){
            employee.WednesdayIn2 = $scope.timeTo12HrFormat(employee.WednesdayIn2);
            employee.WednesdayOut2 = $scope.timeTo12HrFormat(employee.WednesdayOut2);  
        } else{
            employee.WednesdayIn2 = ""
            employee.WednesdayOut2 = "";
        }   
        if(employee.WednesdayIn3 !== "null"){
            employee.WednesdayIn3 = $scope.timeTo12HrFormat(employee.WednesdayIn3);
            employee.WednesdayOut3 = $scope.timeTo12HrFormat(employee.WednesdayOut3);   
        } else{
            employee.WednesdayIn3 = ""
            employee.WednesdayOut3 = "";
        } 
        if(employee.ThursdayIn !== "null"){
            employee.ThursdayIn = $scope.timeTo12HrFormat(employee.ThursdayIn);
            employee.ThursdayOut = $scope.timeTo12HrFormat(employee.ThursdayOut);
        } else{
            employee.ThursdayIn = ""
            employee.ThursdayOut = "";
        }   
        if(employee.ThursdayIn2 !== "null"){
            employee.ThursdayIn2 = $scope.timeTo12HrFormat(employee.ThursdayIn2);
            employee.ThursdayOut2 = $scope.timeTo12HrFormat(employee.ThursdayOut2);  
        } else{
            employee.ThursdayIn2 = ""
            employee.ThursdayOut2 = "";
        }   
        if(employee.ThursdayIn3 !== "null"){
            employee.ThursdayIn3 = $scope.timeTo12HrFormat(employee.ThursdayIn3);
            employee.ThursdayOut3 = $scope.timeTo12HrFormat(employee.ThursdayOut3);   
        } else{
            employee.ThursdayIn3 = ""
            employee.ThursdayOut3 = "";
        } 
        if(employee.FridayIn !== "null"){
            employee.FridayIn = $scope.timeTo12HrFormat(employee.FridayIn);
            employee.FridayOut = $scope.timeTo12HrFormat(employee.FridayOut);
        } else{
            employee.FridayIn = ""
            employee.FridayOut = "";
        }   
        if(employee.FridayIn2 !== "null"){
            employee.FridayIn2 = $scope.timeTo12HrFormat(employee.FridayIn2);
            employee.FridayOut2 = $scope.timeTo12HrFormat(employee.FridayOut2);  
        } else{
            employee.FridayIn2 = ""
            employee.FridayOut2 = "";
        }   
        if(employee.FridayIn3 !== "null"){
            employee.FridayIn3 = $scope.timeTo12HrFormat(employee.FridayIn3);
            employee.FridayOut3 = $scope.timeTo12HrFormat(employee.FridayOut3);   
        } else{
            employee.FridayIn3 = ""
            employee.FridayOut3 = "";
        } 
    };

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


    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {  
    //     if (event.target == modal) {
    //         // $scope.ShowModal = false;
    //         controllerFunction.CloseModal();
    //     }
    //     controllerFunction.$apply(); // This makes it so the page "sees" that we changed the variable.
    // }
}]);