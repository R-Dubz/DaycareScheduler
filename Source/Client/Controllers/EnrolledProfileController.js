angular.module('DaycareApp').controller('EnrolledProfileController', ['$scope', '$http', function($scope, $http){
    $scope.Profile = [];  
    $scope.ClassroomInfo = {};    
    $scope.Editing = false;  
    $scope.ShowModal = false;
    var modal = document.getElementById('myModal');
    var controllerFunction = $scope;

    $scope.backToList = function() {
        window.location.href = 'Children.html';
    };


    $scope.LoadTempProfile = function() {
        $http.get('/getTempProfile')
        .then(function(response) {
            $scope.Profile.push(response.data[0]);


            $http.get('/getChildClass', {params: {ID: $scope.Profile[0].ChildID, Classroom: $scope.Profile[0].Classroom}})
            .then(function(response) {
                $scope.ClassroomInfo = response.data[0];
                console.log("Data received");
            });
        });
    };

    // $scope.LoadChildClassroomInfo = function() {
    //     $http.get('/getChildClass', Profile)
    //     .then(function(response) {
    //         $scope.Profile.push(response.data[0]);
    //     });
    // };

    $scope.EditProfile = function(){
        $scope.Editing = !$scope.Editing
    };

    $scope.SaveChanges = function(){
        $scope.Profile[0].ChildName = ChildName.value;
        $scope.Profile[0].MaritalStatus = MaritalStatus.value;
        $scope.Profile[0].ChildAge = ChildAge.value;
        $scope.Profile[0].ChildBirthdate = ChildBirthdate.value;
        $scope.Profile[0].AgeGroup = AgeGroup.value;
        $scope.Profile[0].GuardianName1 = GuardianName1.value;
        $scope.Profile[0].GuardianStatus1 = GuardianStatus1.value;
        $scope.Profile[0].GuardianEmail1 = GuardianEmail1.value;
        $scope.Profile[0].GuardianPhone1 = GuardianPhone1.value;
        $scope.Profile[0].GuardianName2 = GuardianName2.value;
        $scope.Profile[0].GuardianStatus2 = GuardianStatus2.value;
        $scope.Profile[0].GuardianEmail2 = GuardianEmail2.value;
        $scope.Profile[0].GuardianPhone2 = GuardianPhone2.value;

        var updates = $scope.Profile;
        $http.post('/test', updates)
        .then(function(response) {
            console.log("Success");        
        });


        $scope.Editing = false;  
    };

    $scope.EditClassroomInfo = function(ID){
        //console.log("We're sorry, this button has been disabled until we figure out what to do with it...");
        console.log(document.getElementById('Classroom').value);
        if (document.getElementById('Classroom').value == null) {
            $http.post('/deleteChildFromClassroom', ID)
            .then(function(response) {
                alert("Child has been Removed from the classroom");
                $scope.CloseModal();
            });
        }
        else if ($scope.Profile[0].Classroom === document.getElementById('Classroom').value) {
            $http.post('/editChildClassroom', ID)
            .then(function(response) {
                alert("Child's classroom times have been changed");
                $scope.CloseModal();
            });
        }
        else {
            $http.post('/deleteChildFromClassroom', ID)
            .then(function(response) {
                alert("Child has been removed from the classroom. Beginning to move them to new classroom!");
                $http.post('/InsertChildToClass', ID)
                .then(function(response) {
                    alert("Child has been inserted into the classroom!"); 
                    $scope.CloseModal();     
                });
            })
        }

        // var sendID = [];
        // sendID.push(ID.ChildID);
        // ID.Classroom = document.getElementById('Classroom').value;
        // ID.MondayIn = document.getElementById('MondayIn').value;
        // ID.MondayOut = document.getElementById('MondayOut').value;
        // ID.TuesdayIn = document.getElementById('TuesdayIn').value;
        // ID.TuesdayOut = document.getElementById('TuesdayOut').value;
        // ID.WednesdayIn = document.getElementById('WednesdayIn').value;
        // ID.WednesdayOut = document.getElementById('WednesdayOut').value;
        // ID.ThursdayIn = document.getElementById('ThursdayIn').value;
        // ID.ThursdayOut = document.getElementById('ThursdayOut').value;
        // ID.FridayIn = document.getElementById('FridayIn').value;
        // ID.FridayOut = document.getElementById('FridayOut').value;
        // sendID.push(ID.Classroom);
        // $http.post('/InsertChildToClass', ID)
        // .then(function(response) {
        //     alert("Child has been inserted into the classroom!"); 

        //     $http.post('/acceptChild', sendID)
        //     .then(function(response) {
        //         // var acceptedChild = [];
        //         alert("Child has been accepted into the program!");
        //         $scope.CloseModal();
        //     });        
        // });
    };


    /* MODAL JUNK */

    $scope.OpenModal = function() {
        $scope.ShowModal = true;
    }

    $scope.CloseModal = function() {
        $scope.ShowModal = false;
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