angular.module('DaycareApp').controller('RoomsController', ['$scope', '$http', '$sce', function($scope, $http, $sce){

        $scope.Children = [];
        $scope.Profile = [];   
        $scope.sortType = 'jsFriendlyTimeStamp'; 
        $scope.sortReverse = true;
        $scope.searchText = ''; 
        $scope.ShowModal = false;  
        $scope.names = ["Infant Room", "Toddler 1", "Toddler 2", "Preschool 1", "Preschool 2", "Progressive", "School Age", "Classroom 8"];
        $scope.ClassroomList = [];
        $scope.CurrentChild = {};

        $scope.myFunc = function(target) {
            $scope.ClassroomList = [];  
            var index = 0;      

            if(target === "Infant Room"){
                target = "InfantRoom";
            } else if(target === "Toddler 1"){
                target = "Toddler1"; 
            } else if(target === "Toddler 2"){
                target = "Toddler2"; 
            } else if(target === "Preschool 1"){
                target = "Preschool3"; 
            } else if(target === "Preschool 2"){
                target = "Preschool4"; 
            } else if(target === "School Age"){
                target = "SchoolAge"; 
            } else if(target === "Classroom 8"){
                target = "Classroom8"; 
            } else {
                //do nothing
            }

            targetClassroom = {Classroom: target}; 

            $http.post('/callAllClass', targetClassroom)
            .then(function(response) {
                $scope.ClassroomList = response.data;
                $scope.ClassroomList.forEach(function(element) {
                    $http({
                        url: '/getChildInfo',
                        method: "POST",
                        data: { 'ChildID': element.ChildID }
                    })
                    .then(function(response) {
                        element.ChildName = response.data[0].ChildName;
                        element.ChildBirthdate = response.data[0].ChildBirthdate;  
                        element.ChildNotes = response.data[0].ChildNotes;
                        element.RoomIndex = index;
                        $scope.ConvertTimesToStrings(element);     
                        if((response.data[0].GuardianStatus1 === "Full-time SUNY student") || 
                        (response.data[0].GuardianStatus1 === "Part-time SUNY student") || 
                        (response.data[0].GuardianStatus2 === "Full-time SUNY student") || 
                        (response.data[0].GuardianStatus2 === "Part-time SUNY student")){
                            if(response.data[0].GuardianStatus1 === "Full-time SUNY student" || response.data[0].GuardianStatus2 === "Full-time SUNY student"){
                                element.Affiliation = "Full-time SUNY student";
                            } else{
                                element.Affiliation = "Part-time SUNY student";
                            }
                        } else if((response.data[0].GuardianStatus1 === "UUP") || 
                        (response.data[0].GuardianStatus1 === "CSEA")|| 
                        (response.data[0].GuardianStatus1 === "PEF") || 
                        (response.data[0].GuardianStatus1 === "NYSCOPBA") ||
                        (response.data[0].GuardianStatus2 === "UUP") || 
                        (response.data[0].GuardianStatus2 === "CSEA")|| 
                        (response.data[0].GuardianStatus2 === "PEF") || 
                        (response.data[0].GuardianStatus2 === "NYSCOPBA")){
                            element.Affiliation = GuardianStatus1 + "/" + GuardianStatus2;
                        } else if((response.data[0].GuardianStatus1 === "Other State") || 
                        (response.data[0].GuardianStatus2 === "Other State")){
                            element.Affiliation = "Other State";                     
                        } else {
                            element.Affiliation = "None";   
                        }
                        index++;          
                    });
                });
            });
        };   

        $scope.ConvertTimesToStrings = function(child){
            child.MondayString = "";
            child.TuesdayString = "";
            child.WednesdayString = "";
            child.ThursdayString = "";
            child.FridayString = "";
            
            if(child.MI1 !== "null"){
                child.MI1 = $scope.timeTo12HrFormat(child.MI1);
                child.MO1 = $scope.timeTo12HrFormat(child.MO1);
                child.MondayString = child.MI1 + "-" + child.MO1 + "<br />";
            }   
            if(child.MI2 !== "null"){
                child.MI2 = $scope.timeTo12HrFormat(child.MI2);
                child.MO2 = $scope.timeTo12HrFormat(child.MO2);  
                child.MondayString = child.MondayString + child.MI2 + "-" + child.MO2 + "<br />";          
            }   
            if(child.MI3 !== "null"){
                child.MI3 = $scope.timeTo12HrFormat(child.MI3);
                child.MO3 = $scope.timeTo12HrFormat(child.MO3);   
                child.MondayString = child.MondayString + child.MI3 + "-" + child.MO3;          
            } 
            if(child.TI1 !== "null"){
                child.TI1 = $scope.timeTo12HrFormat(child.TI1);
                child.TO1 = $scope.timeTo12HrFormat(child.TO1);
                child.TuesdayString = child.TI1 + "-" + child.TO1 + "<br />";           
            }   
            if(child.TI2 !== "null"){
                child.TI2 = $scope.timeTo12HrFormat(child.TI2);
                child.TO2 = $scope.timeTo12HrFormat(child.TO2);  
                child.TuesdayString = child.TuesdayString + child.TI2 + "-" + child.TO2 + "<br />";          
            }   
            if(child.TI3 !== "null"){
                child.TI3 = $scope.timeTo12HrFormat(child.TI3);
                child.TO3 = $scope.timeTo12HrFormat(child.TO3);   
                child.TuesdayString = child.TuesdayString + child.TI3 + "-" + child.TO3;          
            } 
            if(child.WI1 !== "null"){
                child.WI1 = $scope.timeTo12HrFormat(child.WI1);
                child.WO1 = $scope.timeTo12HrFormat(child.WO1);
                child.WednesdayString = child.WI1 + "-" + child.WO1 + "<br />";           
            }   
            if(child.WI2 !== "null"){
                child.WI2 = $scope.timeTo12HrFormat(child.WI2);
                child.WO2 = $scope.timeTo12HrFormat(child.WO2);  
                child.WednesdayString = child.WednesdayString + child.WI2 + "-" + child.WO2 + "<br />";          
            }   
            if(child.WI3 !== "null"){
                child.WI3 = $scope.timeTo12HrFormat(child.WI3);
                child.WO3 = $scope.timeTo12HrFormat(child.WO3);   
                child.WednesdayString = child.WednesdayString + child.WI3 + "-" + child.WO3;          
            } 
            if(child.THI1 !== "null"){
                child.THI1 = $scope.timeTo12HrFormat(child.THI1);
                child.THO1 = $scope.timeTo12HrFormat(child.THO1);
                child.ThursdayString = child.THI1 + "-" + child.THO1 + "<br />";           
            }   
            if(child.THI2 !== "null"){
                child.THI2 = $scope.timeTo12HrFormat(child.THI2);
                child.THO2 = $scope.timeTo12HrFormat(child.THO2);  
                child.ThursdayString = child.ThursdayString + child.THI2 + "-" + child.THO2 + "<br />";          
            }   
            if(child.THI3 !== "null"){
                child.THI3 = $scope.timeTo12HrFormat(child.THI3);
                child.THO3 = $scope.timeTo12HrFormat(child.THO3);   
                child.ThursdayString = child.ThursdayString + child.THI3 + "-" + child.THO3;          
            } 
            if(child.FI1 !== "null"){
                child.FI1 = $scope.timeTo12HrFormat(child.FI1);
                child.FO1 = $scope.timeTo12HrFormat(child.FO1);
                child.FridayString = child.FI1 + "-" + child.FO1 + "<br />";           
            }   
            if(child.FI2 !== "null"){
                child.FI2 = $scope.timeTo12HrFormat(child.FI2);
                child.FO2 = $scope.timeTo12HrFormat(child.FO2);  
                child.FridayString = child.FridayString + child.FI2 + "-" + child.FO2 + "<br />";          
            }   
            if(child.FI3 !== "null"){
                child.FI3 = $scope.timeTo12HrFormat(child.FI3);
                child.FO3 = $scope.timeTo12HrFormat(child.FO3);   
                child.FridayString = child.FridayString + child.FI3 + "-" + child.FO3;          
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

    $scope.storeProfile = function(child){
        $http.post('/storeTempProfile', child)
        .then(function(response) {
            window.location.href = 'EnrolledDemoPage.html';
        });
    }


    /* MODAL JUNK */

    $scope.OpenModal = function(index) {
        $scope.ShowModal = true;
        $scope.CurrentChild.index = index;
        document.getElementById('textarea').innerHTML = $scope.ClassroomList[index].ChildNotes;
    }

    $scope.CloseModal = function() {
        $scope.ShowModal = false;
        document.getElementById('textarea').innerHTML = null;
    }

    $scope.SaveNotes = function(){
        var targetChild = {};
        targetChild.ChildID = $scope.ClassroomList[$scope.CurrentChild.index].ChildID;
        targetChild.ChildNotes = document.getElementById('textarea').innerHTML;
        $scope.ClassroomList[$scope.CurrentChild.index].ChildNotes = document.getElementById('textarea').innerHTML;
        $http.post('/editChildNotes', targetChild)
        .then(function(response) {
            $scope.ShowModal = false;
        });
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