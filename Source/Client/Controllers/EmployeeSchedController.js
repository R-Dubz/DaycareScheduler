angular.module('DaycareApp').controller('EmployeeSchedController', ['$scope', '$http', function($scope, $http){

        $scope.Employees = [];
        $scope.EmployeeSched = [];
        $scope.Profile = [];   
        $scope.sortType = 'jsFriendlyTimeStamp'; 
        $scope.sortReverse = true;
        $scope.searchText = '';         
        

        $scope.LoadEmployeeList = function() {
            $http.get('/LoadEmployeeList')
            .then(function(response) {
                for(i = 0; i < response.data.length; i++){
                    $scope.ConvertTimesToStrings(response.data[i]);
                }
                $scope.Employees = response.data;
            });
        };

        $scope.LoadEmployeeSchedule = function() {
            $http.get('/loadEmployeeSchedule')
            .then(function(response) {
                $scope.EmployeeSched = response.data;
            });
        };
        
        $scope.storeProfile = function(employee){
            $http.post('/storeTempEmployeeProfile', employee)
            .then(function(response) {
                window.location.href = 'EmployeeDemoDev.html';
            });
        }


    $scope.ConvertTimesToStrings = function(employee){
        if(employee.MondayIn !== "null" && employee.MondayIn !== null ){
            employee.MondayInUF = $scope.timeTo12HrFormat(employee.MondayIn); //UF Stands for User Friendly. Ex: the number 15 will become 3:00PM
            employee.MondayOutUF = $scope.timeTo12HrFormat(employee.MondayOut);
        } else{
            employee.MondayIn = "";
            employee.MondayOut = "";
        }
        if(employee.MondayIn2 !== "null" && employee.MondayIn2 !== null ){
            employee.MondayIn2UF = $scope.timeTo12HrFormat(employee.MondayIn2);
            employee.MondayOut2UF = $scope.timeTo12HrFormat(employee.MondayOut2);  
        } else{
            employee.MondayIn2 = ""
            employee.MondayOut2 = "";
        }
        if(employee.MondayIn3 !== "null" && employee.MondayIn3 !== null ){
            employee.MondayIn3UF = $scope.timeTo12HrFormat(employee.MondayIn3);
            employee.MondayOut3UF = $scope.timeTo12HrFormat(employee.MondayOut3);   
        } else{
            employee.MondayIn3 = ""
            employee.MondayOut3 = "";
        } 
        if(employee.TuesdayIn !== "null" && employee.TuesdayIn !== null ){
            employee.TuesdayInUF = $scope.timeTo12HrFormat(employee.TuesdayIn);
            employee.TuesdayOutUF = $scope.timeTo12HrFormat(employee.TuesdayOut);
        } else{
            employee.TuesdayIn = ""
            employee.TuesdayOut = "";
        }   
        if(employee.TuesdayIn2 !== "null" && employee.TuesdayIn2 !== null ){
            employee.TuesdayIn2UF = $scope.timeTo12HrFormat(employee.TuesdayIn2);
            employee.TuesdayOut2UF = $scope.timeTo12HrFormat(employee.TuesdayOut2);  
        } else{
            employee.TuesdayIn2 = ""
            employee.TuesdayOut2 = "";
        }   
        if(employee.TuesdayIn3 !== "null" && employee.TuesdayIn3 !== null ){
            employee.TuesdayIn3UF = $scope.timeTo12HrFormat(employee.TuesdayIn3);
            employee.TuesdayOut3UF = $scope.timeTo12HrFormat(employee.TuesdayOut3);   
        } else{
            employee.TuesdayIn3 = ""
            employee.TuesdayOut3 = "";
        } 
        if(employee.WednesdayIn !== "null" && employee.WednesdayIn !== null ){
            employee.WednesdayInUF = $scope.timeTo12HrFormat(employee.WednesdayIn);
            employee.WednesdayOutUF = $scope.timeTo12HrFormat(employee.WednesdayOut);
        } else{
            employee.WednesdayIn = ""
            employee.WednesdayOut = "";
        }   
        if(employee.WednesdayIn2 !== "null" && employee.WednesdayIn2 !== null ){
            employee.WednesdayIn2UF = $scope.timeTo12HrFormat(employee.WednesdayIn2);
            employee.WednesdayOut2UF = $scope.timeTo12HrFormat(employee.WednesdayOut2);  
        } else{
            employee.WednesdayIn2 = ""
            employee.WednesdayOut2 = "";
        }   
        if(employee.WednesdayIn3 !== "null" && employee.WednesdayIn3 !== null ){
            employee.WednesdayIn3UF = $scope.timeTo12HrFormat(employee.WednesdayIn3);
            employee.WednesdayOut3UF = $scope.timeTo12HrFormat(employee.WednesdayOut3);   
        } else{
            employee.WednesdayIn3 = ""
            employee.WednesdayOut3 = "";
        } 
        if(employee.ThursdayIn !== "null" && employee.ThursdayIn !== null ){
            employee.ThursdayInUF = $scope.timeTo12HrFormat(employee.ThursdayIn);
            employee.ThursdayOutUF = $scope.timeTo12HrFormat(employee.ThursdayOut);
        } else{
            employee.ThursdayIn = ""
            employee.ThursdayOut = "";
        }   
        if(employee.ThursdayIn2 !== "null" && employee.ThursdayIn2 !== null ){
            employee.ThursdayIn2UF = $scope.timeTo12HrFormat(employee.ThursdayIn2);
            employee.ThursdayOut2UF = $scope.timeTo12HrFormat(employee.ThursdayOut2);  
        } else{
            employee.ThursdayIn2 = ""
            employee.ThursdayOut2 = "";
        }   
        if(employee.ThursdayIn3 !== "null" && employee.ThursdayIn3 !== null ){
            employee.ThursdayIn3UF = $scope.timeTo12HrFormat(employee.ThursdayIn3);
            employee.ThursdayOut3UF = $scope.timeTo12HrFormat(employee.ThursdayOut3);   
        } else{
            employee.ThursdayIn3 = ""
            employee.ThursdayOut3 = "";
        } 
        if(employee.FridayIn !== "null" && employee.FridayIn !== null ){
            employee.FridayInUF = $scope.timeTo12HrFormat(employee.FridayIn);
            employee.FridayOutUF = $scope.timeTo12HrFormat(employee.FridayOut);
        } else{
            employee.FridayIn = ""
            employee.FridayOut = "";
        }   
        if(employee.FridayIn2 !== "null" && employee.FridayIn2 !== null ){
            employee.FridayIn2UF = $scope.timeTo12HrFormat(employee.FridayIn2);
            employee.FridayOut2UF = $scope.timeTo12HrFormat(employee.FridayOut2);  
        } else{
            employee.FridayIn2UF = ""
            employee.FridayOut2UF = "";
        }   
        if(employee.FridayIn3 !== "null" && employee.FridayIn3 !== null ){
            employee.FridayIn3UF = $scope.timeTo12HrFormat(employee.FridayIn3);
            employee.FridayOut3UF = $scope.timeTo12HrFormat(employee.FridayOut3);   
        } else{
            employee.FridayIn3 = ""
            employee.FridayOut3 = "";
        } 
    };

    $scope.timeTo12HrFormat = function(time) {   // Take a time in 24 hour format and format it in 12 hour format
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

        formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;

        return formatted_time;
    };


    }]);