angular.module('DaycareApp').controller('EnrollmentController', ['$scope', '$http', function($scope, $http){

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