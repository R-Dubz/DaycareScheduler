    angular.module('DaycareApp').controller('WaitingListController', ['$scope', '$http', function($scope, $http){

        $scope.Children = [];
        $scope.Profile = [];   
        $scope.sortType = 'jsFriendlyTimeStamp'; 
        $scope.sortReverse = true;
        $scope.searchText = '';         
        
        $scope.RefreshDatabase = function() {
            $http.get('/RefreshDatabase')
            .then(function(response) {
                alert("An HTTP request has been sent to the server.\nNow updating DaycareDB.db!");
                // location.reload();
            });
        };

        $scope.LoadWaitingList = function() {
            $http.get('/LoadWaitingList')
            .then(function(response) {
                // alert("HTTP request set, getting data");
                // $scope.Children.push(response.data);

                for(var i = 0; i < response.data.length; i++){
                    var jsFriendlyTimeStampObject = response.data[i].TimeStamp.split(" ");
                    response.data[i].jsFriendlyTimeStamp = jsFriendlyTimeStampObject[0];
                    response.data[i].jsFriendlyBirthDate = new Date(response.data[i].ChildBirthdate);
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
                    var age = diff/31557600000;

                    response.data[i].AgeGroup = age;

                    if(age >= 1 && age < 2){
                        response.data[i].AgeGroup = "IN/T1";
                        response.data[i].AgeValue = 1;                        
                    }
                    else if(age >= (6/52) && age < 1){
                        response.data[i].AgeGroup = "IN";
                        response.data[i].AgeValue = 0;
                    } else if(age >= 2 && age < 3){
                        response.data[i].AgeGroup = "T2";
                        response.data[i].AgeValue = 2;                        
                    } else if( age >= 3 && age < 4){
                        response.data[i].AgeGroup = "PS3";
                        response.data[i].AgeValue = 3;                        
                    } else if( age >= 4 && age < 5){
                        response.data[i].AgeGroup = "PS4";
                        response.data[i].AgeValue = 4;                        
                    } else if( age >= 5 && age <= 10){
                        response.data[i].AgeGroup = "SA";
                        response.data[i].AgeValue = 5;
                    } else {
                        response.data[i].AgeGroup = "Unknown";
                        response.data[i].AgeValue = 1000; 
                    }





                    $scope.Children.push(response.data[i]);
                    // $scope.Children[i].push(jsFriendlyBirthDate);                    
                }

                if($scope.Children.length === 0){
                alert("It appears there are no children on the waiting list.\nPlease refresh the database and reload the page.");                
                }

            });
        };

        $scope.storeProfile = function(child){
            $http.post('/storeTempProfile', child)
            .then(function(response) {
                window.location.href = 'WaitingDemoPage.html';
            });
        };

        $scope.LoadTempProfile = function() {
            $http.get('/getTempProfile')
            .then(function(response) {
                // alert("HTTP request set, getting data");
                // $scope.Children.push(response.data);
                $scope.Profile.push(response);
            });
        };

    }]);