    angular.module('DaycareApp').controller('WaitingListController', ['$scope', '$http', function($scope, $http){

        $scope.Children = [];
        $scope.Profile = [];        
        
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