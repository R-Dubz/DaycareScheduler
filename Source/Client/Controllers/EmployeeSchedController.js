angular.module('DaycareApp').controller('EmployeeSchedController', ['$scope', '$http', function($scope, $http){

        $scope.Employees = [];
        $scope.EmployeeSched = [];
        $scope.EmployeeSchedMon = [];
        $scope.EmployeeSchedTue = [];
        $scope.EmployeeSchedWed = [];
        $scope.EmployeeSchedThr = [];
        $scope.EmployeeSchedFri = [];

        $scope.Profile = {};   
        $scope.sortType = 'jsFriendlyTimeStamp'; 
        $scope.sortReverse = true;
        $scope.searchText = '';   
        $scope.ShowEditModal = false;       
        

        $scope.LoadEmployeeList = function() {
            $http.get('/LoadEmployeeList')
            .then(function(response) {
                for(i = 0; i < response.data.length; i++){
                    $scope.ConvertTimesToStrings(response.data[i]);
                }
                $scope.Employees = response.data;
                $scope.LoadEmployeeSchedule();
            });
        };

        $scope.openModal = function(given){
            $scope.Profile = given;
            $scope.ShowEditModal = true; 
        }

        $scope.CloseEditModal = function() {
            $scope.ShowEditModal = false;
        }

        $scope.LoadEmployeeSchedule = function() {
            $http.get('/loadEmployeeSchedule')
            .then(function(response) {
                $scope.EmployeeSched = response.data;
                for( var i = 0; i < $scope.EmployeeSched.length; i++ ){
                    if($scope.EmployeeSched[i].Classroom === "InfantRoom"){
                        $scope.EmployeeSched[i].JSFClassroom = "Infant Room";
                    } else if($scope.EmployeeSched[i].Classroom === "Toddler1"){
                        $scope.EmployeeSched[i].JSFClassroom = "Toddler 1";
                    } else if($scope.EmployeeSched[i].Classroom === "Toddler2"){
                        $scope.EmployeeSched[i].JSFClassroom = "Toddler 2";
                    } else if($scope.EmployeeSched[i].Classroom === "Preschool3"){
                        $scope.EmployeeSched[i].JSFClassroom = "Preschool 1";
                    } else if($scope.EmployeeSched[i].Classroom === "Preschool4"){
                        $scope.EmployeeSched[i].JSFClassroom = "Preschool 2";
                    } else if($scope.EmployeeSched[i].Classroom === "SchoolAge"){
                        $scope.EmployeeSched[i].JSFClassroom = "School Age";
                    } else if($scope.EmployeeSched[i].Classroom === "Classroom8"){
                        $scope.EmployeeSched[i].JSFClassroom = "Classroom 8";
                    } else{
                        $scope.EmployeeSched[i].JSFClassroom = "";
                    }
                    $scope.EmployeeSched[i].TimeStart = $scope.timeTo12HrFormat( $scope.EmployeeSched[i].TimeStart );
                    $scope.EmployeeSched[i].TimeEnd = $scope.timeTo12HrFormat( $scope.EmployeeSched[i].TimeEnd );
                }
                $scope.putInBuffer();
            });
        };
        
        $scope.storeProfile = function(employee){
            $http.post('/storeTempEmployeeProfile', employee)
            .then(function(response) {
                window.location.href = 'EmployeeDemoDev.html';
            });
        }

        
        $scope.SaveChanges = function(){
        var targetEmployee = {};
        targetEmployee.StaffID = $scope.Profile.StaffID;
        targetEmployee.Staff_Name = $scope.Profile.FirstName + " " + $scope.Profile.LastName;
        targetEmployee.TimeStart = document.getElementById( "start" ).value;
        targetEmployee.TimeEnd = document.getElementById( "end" ).value;
        var myDates = new Date(document.getElementById( "datepicker" ).value);
        targetEmployee.Date = myDates.getMonth()+1 + "/" + myDates.getDate() + "/" + myDates.getFullYear();
        targetEmployee.Classroom = document.getElementById( "room" ).value;
        console.log( targetEmployee );
        $http.post('/InsertSchedule', targetEmployee) 
        .then(function(response) {
            $scope.LoadEmployeeSchedule();
            $scope.ShowEditModal = false;
        });
    }


    $scope.ConvertTimesToStrings = function(employee){
        if(employee.MI1 !== "null" && employee.MI1 !== null ){
            employee.MondayInUF = $scope.timeTo12HrFormat(employee.MI1); //UF Stands for User Friendly. Ex: the number 15 will become 3:00PM
            employee.MondayOutUF = $scope.timeTo12HrFormat(employee.MO1);
        } else{
            employee.MI1 = "";
            employee.MO1 = "";
        }
        if(employee.MI2 !== "null" && employee.MI2 !== null ){
            employee.MondayIn2UF = $scope.timeTo12HrFormat(employee.MI2);
            employee.MondayOut2UF = $scope.timeTo12HrFormat(employee.MO2);  
        } else{
            employee.MI2 = "";
            employee.MO2 = "";
        }
        if(employee.MI3 !== "null" && employee.MI3 !== null ){
            employee.MondayIn3UF = $scope.timeTo12HrFormat(employee.MI3);
            employee.MondayOut3UF = $scope.timeTo12HrFormat(employee.MO3);   
        } else{
            employee.MI3 = "";
            employee.MO3 = "";
        } 
        if(employee.TI1 !== "null" && employee.TI1 !== null ){
            employee.TuesdayInUF = $scope.timeTo12HrFormat(employee.TI1);
            employee.TuesdayOutUF = $scope.timeTo12HrFormat(employee.TO1);
        } else{
            employee.TI1 = "";
            employee.TO1 = "";
        }   
        if(employee.TI2 !== "null" && employee.TI2 !== null ){
            employee.TuesdayIn2UF = $scope.timeTo12HrFormat(employee.TI2);
            employee.TuesdayOut2UF = $scope.timeTo12HrFormat(employee.TO2);  
        } else{
            employee.TI2 = "";
            employee.TO2 = "";
        }   
        if(employee.TI3 !== "null" && employee.TI3 !== null ){
            employee.TuesdayIn3UF = $scope.timeTo12HrFormat(employee.TI3);
            employee.TuesdayOut3UF = $scope.timeTo12HrFormat(employee.TO3);   
        } else{
            employee.TI3 = "";
            employee.TO3 = "";
        } 
        if(employee.WI1 !== "null" && employee.WI1 !== null ){
            employee.WednesdayInUF = $scope.timeTo12HrFormat(employee.WI1);
            employee.WednesdayOutUF = $scope.timeTo12HrFormat(employee.WO1);
        } else{
            employee.WI1 = "";
            employee.WO1 = "";
        }   
        if(employee.WI2 !== "null" && employee.WI2 !== null ){
            employee.WednesdayIn2UF = $scope.timeTo12HrFormat(employee.WI2);
            employee.WednesdayOut2UF = $scope.timeTo12HrFormat(employee.WO2);  
        } else{
            employee.WI2 = "";
            employee.WO2 = "";
        }   
        if(employee.WI3 !== "null" && employee.WI3 !== null ){
            employee.WednesdayIn3UF = $scope.timeTo12HrFormat(employee.WI3);
            employee.WednesdayOut3UF = $scope.timeTo12HrFormat(employee.WO3);   
        } else{
            employee.WI3 = "";
            employee.WO3 = "";
        } 
        if(employee.THI1 !== "null" && employee.THI1 !== null ){
            employee.ThursdayInUF = $scope.timeTo12HrFormat(employee.THI1);
            employee.ThursdayOutUF = $scope.timeTo12HrFormat(employee.THO1);
        } else{
            employee.THI1 = "";
            employee.THO1 = "";
        }   
        if(employee.THI2 !== "null" && employee.THI2 !== null ){
            employee.ThursdayIn2UF = $scope.timeTo12HrFormat(employee.THI2);
            employee.ThursdayOut2UF = $scope.timeTo12HrFormat(employee.THO2);  
        } else{
            employee.THI2 = "";
            employee.THO2 = "";
        }   
        if(employee.THI3 !== "null" && employee.THI3 !== null ){
            employee.ThursdayIn3UF = $scope.timeTo12HrFormat(employee.THI3);
            employee.ThursdayOut3UF = $scope.timeTo12HrFormat(employee.THO3);   
        } else{
            employee.THI3 = "";
            employee.THO3 = "";
        } 
        if(employee.FI1 !== "null" && employee.FI1 !== null ){
            employee.FridayInUF = $scope.timeTo12HrFormat(employee.FI1);
            employee.FridayOutUF = $scope.timeTo12HrFormat(employee.FO1);
        } else{
            employee.FI1 = "";
            employee.FO1 = "";
        }   
        if(employee.FI2 !== "null" && employee.FI2 !== null ){
            employee.FridayIn2UF = $scope.timeTo12HrFormat(employee.FI2);
            employee.FridayOut2UF = $scope.timeTo12HrFormat(employee.FO2);  
        } else{
            employee.FI2 = "";
            employee.FO2 = "";
        }   
        if(employee.FI3 !== "null" && employee.FI3 !== null ){
            employee.FridayIn3UF = $scope.timeTo12HrFormat(employee.FI3);
            employee.FridayOut3UF = $scope.timeTo12HrFormat(employee.FO3);   
        } else{
            employee.FI3 = "";
            employee.FO3 = "";
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

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var myYear, myMonth, myDay, myDayOfWeek;

    $scope.subDays = function( toSub ){
        for( var i = 0; i < toSub; i++ ){
            myDay-=1;
            if( myDay <= 0 ){
                myMonth-=1;
                if( myMonth < 0 ){
                    myYear-=1;
                    myMonth = 11;
                }
                if( myYear%4 == 0 ){
                    daysInMonth[1] = 29;
                }else{
                    daysInMonth[1] = 28;
                }
                myDay = daysInMonth[myMonth];
            }
        }
    }

    $scope.addDays = function( toAdd ){
        for( var i = 0; i < toAdd; i++ ){
            myDay+=1;
            if( myYear%4 == 0 ){
                daysInMonth[1] = 29;
            }else{
                daysInMonth[1] = 28;
            }
            if( myDay > daysInMonth[myMonth] ){
                myMonth+=1;
                myDay = 0;
                if( myMonth > 11 ){
                    myYear+=1;
                    myMonth = 0;
                    if( myYear%4 == 0 ){
                        daysInMonth[1] = 29;
                    }else{
                        daysInMonth[1] = 28;
                    }
                }
            }
        }
    }

    $scope.computeDay = function( dayWant, weekFromNow ){
        var n = new Date();
        myYear = n.getFullYear();
        myMonth = n.getMonth();
        myDay = n.getDate();
        myDayOfWeek = n.getDay();
        if( myYear%4 == 0 ){
            daysInMonth[1] = 29;
        }else{
            daysInMonth[1] = 28;
        }
        if( weekFromNow < 0 ){
            while( weekFromNow < 0 ){
                $scope.subDays( 7 );
                weekFromNow+=1;
            }
        }
        if( weekFromNow > 0 ){
            while( weekFromNow > 0 ){
                $scope.addDays( 7 );
                weekFromNow-=1;
            }
        }
        if( dayWant < myDayOfWeek ){
            $scope.subDays( myDayOfWeek - dayWant );
        }
        if( dayWant > myDayOfWeek ){
            $scope.addDays( dayWant - myDayOfWeek );
        }

        return myMonth+1 + "/" + myDay + "/" + myYear;
    }
    var theWeekToLook = 0;
    var Mons = 0;
    var Tues = 0;
    var Weds = 0;
    var Thrs = 0;
    var Fris = 0;

    var Mon = $scope.computeDay( 1, theWeekToLook );
    var Tue = $scope.computeDay( 2, theWeekToLook );
    var Wed = $scope.computeDay( 3, theWeekToLook );
    var Thr = $scope.computeDay( 4, theWeekToLook );
    var Fri = $scope.computeDay( 5, theWeekToLook );
    document.getElementById("monday").innerHTML = Mon;
    document.getElementById("tuesday").innerHTML = Tue;
    document.getElementById("wednesday").innerHTML = Wed;
    document.getElementById("thursday").innerHTML = Thr;
    document.getElementById("friday").innerHTML = Fri;

    $scope.putInBuffer = function(){
        $scope.EmployeeSchedMon = [];
        $scope.EmployeeSchedTue = [];
        $scope.EmployeeSchedWed = [];
        $scope.EmployeeSchedThr = [];
        $scope.EmployeeSchedFri = [];
        for( var i = 0; i < $scope.EmployeeSched.length; i++ ){
            if( $scope.EmployeeSched[i].Date == Mon ){
                $scope.EmployeeSchedMon.push( $scope.EmployeeSched[i] );
            }
            if( $scope.EmployeeSched[i].Date == Tue ){
                $scope.EmployeeSchedTue.push( $scope.EmployeeSched[i] );
            }
            if( $scope.EmployeeSched[i].Date == Wed ){
                $scope.EmployeeSchedWed.push( $scope.EmployeeSched[i] );
            }
            if( $scope.EmployeeSched[i].Date == Thr ){
                $scope.EmployeeSchedThr.push( $scope.EmployeeSched[i] );
            }
            if( $scope.EmployeeSched[i].Date == Fri ){
                $scope.EmployeeSchedFri.push( $scope.EmployeeSched[i] );
            }
        }
    }

    $scope.subDay = function(){
        theWeekToLook-=1;
        Mon = $scope.computeDay( 1, theWeekToLook );
        Tue = $scope.computeDay( 2, theWeekToLook );
        Wed = $scope.computeDay( 3, theWeekToLook );
        Thr = $scope.computeDay( 4, theWeekToLook );
        Fri = $scope.computeDay( 5, theWeekToLook );
        document.getElementById("monday").innerHTML = Mon;
        document.getElementById("tuesday").innerHTML = Tue;
        document.getElementById("wednesday").innerHTML = Wed;
        document.getElementById("thursday").innerHTML = Thr;
        document.getElementById("friday").innerHTML = Fri;
        $scope.putInBuffer();
    }

    $scope.addDay = function(){
        theWeekToLook+=1;
        Mon = $scope.computeDay( 1, theWeekToLook );
        Tue = $scope.computeDay( 2, theWeekToLook );
        Wed = $scope.computeDay( 3, theWeekToLook );
        Thr = $scope.computeDay( 4, theWeekToLook );
        Fri = $scope.computeDay( 5, theWeekToLook );
        document.getElementById("monday").innerHTML = Mon;
        document.getElementById("tuesday").innerHTML = Tue;
        document.getElementById("wednesday").innerHTML = Wed;
        document.getElementById("thursday").innerHTML = Thr;
        document.getElementById("friday").innerHTML = Fri;
        $scope.putInBuffer();
    }

    $scope.deleteInstance = function(employee){
        for(var i = 0; i < $scope.EmployeeSched.length; i++){
            if($scope.EmployeeSched[i].ScheduleID === employee.ScheduleID){
                $scope.EmployeeSched.splice(i, 1);
            }
        }
        for(var i = 0; i < $scope.EmployeeSchedMon.length; i++){
            if($scope.EmployeeSchedMon[i].ScheduleID === employee.ScheduleID){
                $scope.EmployeeSchedMon.splice(i, 1);
            }
        }
        for(var i = 0; i < $scope.EmployeeSchedTue.length; i++){
            if($scope.EmployeeSchedTue[i].ScheduleID === employee.ScheduleID){
                $scope.EmployeeSchedTue.splice(i, 1);
            }
        }
        for(var i = 0; i < $scope.EmployeeSchedWed.length; i++){
            if($scope.EmployeeSchedWed[i].ScheduleID === employee.ScheduleID){
                $scope.EmployeeSchedWed.splice(i, 1);
            }
        }
        for(var i = 0; i < $scope.EmployeeSchedThr.length; i++){
            if($scope.EmployeeSchedThr[i].ScheduleID === employee.ScheduleID){
                $scope.EmployeeSchedThr.splice(i, 1);
            }
        }
        for(var i = 0; i < $scope.EmployeeSchedFri.length; i++){
            if($scope.EmployeeSchedFri[i].ScheduleID === employee.ScheduleID){
                $scope.EmployeeSchedFri.splice(i, 1);
            }
        }

        var sendID = {};
        sendID.ScheduleID = employee.ScheduleID;
        $http.post('/deleteSchedule', sendID)
        .then(function(response) {
            // do nothing
        })
    }

    var tday = new Date();
    var picker = new Pikaday(
    {
        field: document.getElementById('datepicker'),
        firstDay: 0,
        minDate: new Date(),
        
        maxDate: new Date(tday.getFullYear()+10, 12, 31),
        yearRange: [2000,2020]
    });

    }]);