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
                    $scope.Children.push(response.data[i]);
                }

            });
        };

        $scope.storeProfile = function(child){
            $http.post('/storeTempProfile', child)
            .then(function(response) {
                window.location.href = 'DemoPage.html';
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