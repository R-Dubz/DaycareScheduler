angular.module('DaycareApp').controller('RoomsController', ['$scope', '$http', function($scope, $http){

        $scope.Children = [];
        $scope.Profile = [];  
        $scope.sortType = 'ChildName'; 
        $scope.sortReverse = false;
        $scope.searchText = '';     


        $scope.callEnrolledList = function() {
            $http.get('/callEnrolledList')
            .then(function(response) {
                // alert("HTTP request set, getting data");
                // $scope.Children.push(response.data);

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

        $scope.storeProfile = function(child){
            $http.post('/storeTempProfile', child)
            .then(function(response) {
                window.location.href = 'EnrolledDemoPage.html';
            });
        }

        $scope.LoadTempProfile = function() {
            $http.get('/getTempProfile')
            .then(function(response) {
                // alert("HTTP request set, getting data");
                // $scope.Children.push(response.data);
                $scope.Profile.push(response);
            });
        };

    }]);