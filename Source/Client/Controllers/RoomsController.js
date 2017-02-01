angular.module('DaycareApp').controller('RoomsController', ['$scope', '$http', function($scope, $http){

        $scope.Children = [];
        $scope.Profile = [];   
        $scope.sortType = 'jsFriendlyTimeStamp'; 
        $scope.sortReverse = true;
        $scope.searchText = ''; 
        $scope.ShowModal = false;  
        $scope.names = ["Infant Room", "Toddler 1", "Toddler 2", "Preschool 1", "Preschool 2", "Progressive", "School Age", "Classroom 8"];

        $scope.myFunc = function(item) {
            alert(item);
            $scope.Children = [];
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


        // $scope.storeProfile = function(child){
        //     $http.post('/storeTempProfile', child)
        //     .then(function(response) {
        //         window.location.href = 'EnrolledDemoPage.html';
        //     });
        // }

        // $scope.LoadTempProfile = function() {
        //     $http.get('/getTempProfile')
        //     .then(function(response) {
        //         // alert("HTTP request set, getting data");
        //         // $scope.Children.push(response.data);
        //         $scope.Profile.push(response);
        //     });
        // };










        $scope.LoadWaitingList = function() {
            $http.get('/LoadWaitingList')
            .then(function(response) {
                // alert("HTTP request set, getting data");
                // $scope.Children.push(response.data);

                for(var i = 0; i < response.data.length; i++){
                    response.data[i].jsFriendlyBirthDate = new Date(response.data[i].ChildBirthdate);
                    response.data[i].jsFriendlyTimeStamp = new Date(response.data[i].TimeStamp);
                    response.data[i].jsFriendlyDesiredEnrollment = new Date(response.data[i].DesiredEnrollment);      


                    if((response.data[i].GuardianStatus1 === "Full-time SUNY student") || 
                    (response.data[i].GuardianStatus1 === "Part-time SUNY student") || 
                    (response.data[i].GuardianStatus2 === "Full-time SUNY student") || 
                    (response.data[i].GuardianStatus2 === "Part-time SUNY student")){
                        response.data[i].Priority = 4;
                        response.data[i].PriorityText = "High";                        
                    } else if(
                        (response.data[i].GuardianStatus1 === "UUP") || 
                        (response.data[i].GuardianStatus1 === "CSEA")|| 
                        (response.data[i].GuardianStatus1 === "PEF") || 
                        (response.data[i].GuardianStatus1 === "NYSCOPBA") ||
                        (response.data[i].GuardianStatus2 === "UUP") || 
                        (response.data[i].GuardianStatus2 === "CSEA")|| 
                        (response.data[i].GuardianStatus2 === "PEF") || 
                        (response.data[i].GuardianStatus2 === "NYSCOPBA")){
                        response.data[i].Priority = 3;
                        response.data[i].PriorityText = "Medium";    
                    } else if((response.data[i].GuardianStatus1 === "Other State") || 
                    (response.data[i].GuardianStatus2 === "Other State")){
                        response.data[i].Priority = 2;
                        response.data[i].PriorityText = "Low";                        
                    } else {
                        response.data[i].Priority = 1;
                        response.data[i].PriorityText = "None";   
                    }

                    if((response.data[i].GuardianStatus1 === "Full-time SUNY student") || 
                    (response.data[i].GuardianStatus1 === "Part-time SUNY student") || 
                    (response.data[i].GuardianStatus2 === "Full-time SUNY student") || 
                    (response.data[i].GuardianStatus2 === "Part-time SUNY student")){
                        response.data[i].Priority = 4;
                        response.data[i].PriorityText = "High";                        
                    } else if(
                        (response.data[i].GuardianStatus1 === "UUP") || 
                        (response.data[i].GuardianStatus1 === "CSEA")|| 
                        (response.data[i].GuardianStatus1 === "PEF") || 
                        (response.data[i].GuardianStatus1 === "NYSCOPBA") ||
                        (response.data[i].GuardianStatus2 === "UUP") || 
                        (response.data[i].GuardianStatus2 === "CSEA")|| 
                        (response.data[i].GuardianStatus2 === "PEF") || 
                        (response.data[i].GuardianStatus2 === "NYSCOPBA")){
                        response.data[i].Priority = 3;
                        response.data[i].PriorityText = "Medium";    
                    } else if((response.data[i].GuardianStatus1 === "Other State") || 
                    (response.data[i].GuardianStatus2 === "Other State")){
                        response.data[i].Priority = 2;
                        response.data[i].PriorityText = "Low";                        
                    } else {
                        response.data[i].Priority = 1;
                        response.data[i].PriorityText = "None";   
                    }

                    var ChildBirthday = response.data[i].jsFriendlyBirthDate;
                    var currentTime = new Date();
                    var diff = currentTime - ChildBirthday;
                    var age = Math.floor(diff/31557600000);

                    response.data[i].AgeGroup = age;

                    // if(age < 1){
                    //     response.data[i].AgeGroup = "IN";
                    // } else if(age >= 1 && age < 2){

                    // } else if( age >= 3 && age <4){

                    // } else if( age >= 3 && age <4){

                    // } else





                    $scope.Children.push(response.data[i]);
                    // $scope.Children[i].push(jsFriendlyBirthDate);                    
                }

                if($scope.Children.length === 0){
                alert("It appears there are no children on the waiting list.\nPlease refresh the database and reload the page.");                
                }

            });
        };









    }]);