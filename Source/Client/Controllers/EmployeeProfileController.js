angular.module('DaycareApp').controller('EmployeeProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];     
    $scope.Editing = false;  
    $scope.ShowNotesModal = false;
    $scope.ShowEditModal = false;    
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
            debugger;
        });
    };
	
	$scope.LoadSchedule = function() {
        $http.get('/getSchedule')
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

    $scope.OpenNotesModal = function(index) {
        $scope.ShowNotesModal = true;
        $scope.CurrentEmployee.index = index;
        document.getElementById('textarea').innerHTML = $scope.Profile[0].MoreInfo;
    }

    $scope.CloseNotesModal = function() {
        $scope.ShowNotesModal = false;
        document.getElementById('textarea').innerHTML = null;
    }

    $scope.SaveNotes = function(){
        var targetEmployee = {};
        targetEmployee.StaffID = Profile[0].StaffID;
        targetEmployee.MoreInfo = document.getElementById('textarea').innerHTML;
        Profile[0].MoreInfo = document.getElementById('textarea').innerHTML;
        $http.post('/editEmployeeNotes', targetEmployee) //not implemented
        .then(function(response) {
            $scope.ShowNotesModal = false;
        });
    }

    $scope.OpenEditModal = function() {
        $scope.ShowEditModal = true;
    }

    $scope.CloseEditModal = function() {
        $scope.ShowEditModal = false;
    }

    $scope.SaveChanges = function(){
        // var targetEmployee = {};
        // targetEmployee.StaffID = Profile[0].StaffID;
        // targetEmployee.MoreInfo = document.getElementById('textarea').innerHTML;
        // Profile[0].MoreInfo = document.getElementById('textarea').innerHTML;
        // $http.post('/editEmployeeNotes', targetEmployee) //not implemented
        // .then(function(response) {
        //     $scope.ShowNotesModal = false;
        // });
    }



    // // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {  
    //     if (event.target == modal) {
    //         // $scope.ShowModal = false;
    //         controllerFunction.CloseModal();
    //     }
    //     controllerFunction.$apply(); // This makes it so the page "sees" that we changed the variable.
    // }
}]);