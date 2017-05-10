angular.module('DaycareApp').controller('EmployeeSchedController', ['$scope', '$http', function($scope, $http){

        $scope.Employees = [];
        $scope.EmployeeSched = [];
        $scope.EmployeeSchedMon = [];
        $scope.EmployeeSchedTue = [];
        $scope.EmployeeSchedWed = [];
        $scope.EmployeeSchedThr = [];
        $scope.EmployeeSchedFri = [];

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
                $scope.LoadEmployeeSchedule();
            });
        };

        $scope.LoadEmployeeSchedule = function() {
            $http.get('/loadEmployeeSchedule')
            .then(function(response) {
                $scope.EmployeeSched = response.data;
                $scope.putInBuffer();
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

    }]);