angular.module('DaycareApp').controller('RoomsController', ['$scope', '$http', function($scope, $http){

        $scope.Children = [];
        $scope.Profile = [];   
        $scope.sortType = 'jsFriendlyTimeStamp'; 
        $scope.sortReverse = true;
        $scope.searchText = ''; 
        $scope.ShowModal = false;  
        $scope.names = ["Infant Room", "Toddler 1", "Toddler 2", "Preschool 1", "Preschool 2", "Progressive", "School Age", "Classroom 8"];
        $scope.ClassroomList = [];

        $scope.myFunc = function(target) {
            $scope.Children = [];
            alert(target);            

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

                        var time = $scope.timeTo12HrFormat(element.MO1);
                        console.log(time);                      
                    });
                });
            });
        };   


        $scope.callEnrolledList = function() {
            $http.get('/callEnrolledList')
            .then(function(response) {
                for(var i = 0; i < response.data.length; i++){
                    response.data[i].jsFriendlyBirthDate = new Date(response.data[i].ChildBirthdate);
                    response.data[i].jsFriendlyTimeStamp = new Date(response.data[i].TimeStamp);
                    response.data[i].jsFriendlyDesiredEnrollment = new Date(response.data[i].DesiredEnrollment); 
                    if(response.data[i].Classroom === "InfantRoom"){
                        response.data[i].Classroom = "Infant Room";
                    } else if(response.data[i].Classroom === "Toddler1"){
                       response.data[i].Classroom = "Toddler 1"; 
                    } else if(response.data[i].Classroom === "Toddler2"){
                       response.data[i].Classroom = "Toddler 2"; 
                    } else if(response.data[i].Classroom === "Preschool3"){
                       response.data[i].Classroom = "Preschool 1"; 
                    } else if(response.data[i].Classroom === "Preschool4"){
                       response.data[i].Classroom = "Preschool 2"; 
                    } else if(response.data[i].Classroom === "SchoolAge"){
                       response.data[i].Classroom = "School Age"; 
                    } else if(response.data[i].Classroom === "Classroom8"){
                       response.data[i].Classroom = "Classroom 8"; 
                    } else {
                        //do nothing
                    }
                    $scope.Children.push(response.data[i]);
                }

            });
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


    /* MODAL JUNK */

    $scope.OpenModal = function() {
        $scope.ShowModal = true;
    }

    $scope.CloseModal = function() {
        $scope.ShowModal = false;
        document.getElementById('textarea').innerHTML = null;
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {  
        if (event.target == modal) {
            // $scope.ShowModal = false;
            controllerFunction.CloseModal();
        }
        controllerFunction.$apply(); // This makes it so the page "sees" that we changed the variable.
    }



        $scope.LoadRoomList = function(target) {
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
                    });
                });
            });
        };









    }]);