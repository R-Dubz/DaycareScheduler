angular.module('DaycareApp').controller('EmployeeProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];     
    $scope.Editing = false;  
    $scope.ShowModal = false;
	$scope.CurrentEmployee = {};
    var modal = document.getElementById('myModal');
    var controllerFunction = $scope;

    $scope.backToList = function() {
      window.location.href = 'Employees.html';
    }

    $scope.LoadTempEmployeeProfile = function() {
        $http.get('/getTempEmployeeProfile')
        .then(function(response) {
            $scope.Profile.push(response.data[0]);
        });
    };

	/*
    $scope.EditProfile = function(){
        $scope.Editing = !$scope.Editing
    };
	*/
	
	    /* MODAL JUNK */

    $scope.OpenModal = function(index) {
        $scope.ShowModal = true;
        $scope.CurrentEmployee.index = index;
        document.getElementById('textarea').innerHTML = Profile[0].MoreInfo;
    }

    $scope.CloseModal = function() {
        $scope.ShowModal = false;
        document.getElementById('textarea').innerHTML = null;
    }

    $scope.SaveNotes = function(){
        var targetEmployee = {};
        targetEmployee.StaffID = Profile[0].StaffID;
        targetEmployee.MoreInfo = document.getElementById('textarea').innerHTML;
        Profile[0].MoreInfo = document.getElementById('textarea').innerHTML;
        $http.post('/editEmployeeNotes', targetEmployee) //not implemented
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