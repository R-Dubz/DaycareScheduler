    angular.module('DaycareApp').controller('WaitingListController', ['$scope', '$http', function($scope, $http){

        $scope.Children = [];
        $scope.Profile = [];   
        $scope.sortType = 'ChildName'; 
        $scope.sortReverse = false;
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
                    $scope.Children.push(response.data[i]);
                }

                if($scope.Children.length === 0){
                alert("It appears there are no children on the waiting list.\nPlease refresh the database and reload the page.");                
                }

            });
        };

        $scope.storeProfile = function(child){
            $http.post('/storeTempProfile', child)
            .then(function(response) {
                window.location.href = 'DemoPage.html';
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

        $scope.acceptChild = function(ID){
            var sendID = [];
            sendID.push(ID);
            $http.post('/acceptChild', sendID)
            .then(function(response) {
                var acceptedChild = [];
                for(var i = 0; i < $scope.Children.length; i++){
                    if($scope.Children[i].ChildID === ID){
                        $scope.Children.splice(i, 1);
                        return;
                    }
                }
                console.log("Child has been accepted into the program!");
            });
        };

    }]);