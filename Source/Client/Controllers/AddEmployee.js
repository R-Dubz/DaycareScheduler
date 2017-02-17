angular.module('DaycareApp').controller('AddEmployee', ['$scope', '$http', function($scope, $http){

    $scope.LoadDB = function(){
        $http.get('/addEmployee')
        .then(function(response) {
            $scope.Profile.push(response.data[0]);
        });
    };


    $scope.SaveChanges = function(){
        $scope.Profile[0].FirstName = document.getElementById("FirstName").value;
        $scope.Profile[0].LastName = document.getElementById("LastName").value;
        $scope.Profile[0].DateOfBirth = document.getElementById("DateOfHire").value;
        $scope.Profile[0].EmailAddress = document.getElementById("EmailAddress").value;
        $scope.Profile[0].PhoneNumber = document.getElementById("PhoneNumber").value;
        $scope.Profile[0].PhoneNumber2 = document.getElementById("PhoneNumber2").value;
                
       
        var updates = $scope.Profile;
        $http.post('/test', updates)
        .then(function(response) {
            console.log("Success");      
        }); 

        
    };



}]);

$scope.acceptChild = function(ID){
        var sendID = [];

        if((document.getElementById('MondayIn').value === "null" && document.getElementById('MondayOut').value !== "null") ||
           (document.getElementById('MondayIn').value !== "null" && document.getElementById('MondayOut').value === "null") ||
           (document.getElementById('TuesdayIn').value === "null" && document.getElementById('TuesdayOut').value !== "null") ||
           (document.getElementById('TuesdayIn').value !== "null" && document.getElementById('TuesdayOut').value === "null") ||
           (document.getElementById('WednesdayIn').value === "null" && document.getElementById('WednesdayOut').value !== "null") ||
           (document.getElementById('WednesdayIn').value !== "null" && document.getElementById('WednesdayOut').value === "null") ||
           (document.getElementById('ThursdayIn').value === "null" && document.getElementById('ThursdayOut').value !== "null") ||
           (document.getElementById('ThursdayIn').value !== "null" && document.getElementById('ThursdayOut').value === "null") ||
           (document.getElementById('FridayIn').value === "null" && document.getElementById('FridayOut').value !== "null") ||
           (document.getElementById('FridayIn').value !== "null" && document.getElementById('FridayOut').value === "null")){
            alert("One of the days is missing an In/Out time. Please try again.");
            return;
        }
        if(document.getElementById('MondayIn2') !== null){
            if((document.getElementById('MondayIn2').value === "null" && document.getElementById('MondayOut2').value !== "null") ||
            (document.getElementById('MondayIn2').value !== "null" && document.getElementById('MondayOut2').value === "null") ||
            (document.getElementById('TuesdayIn2').value === "null" && document.getElementById('TuesdayOut2').value !== "null") ||
            (document.getElementById('TuesdayIn2').value !== "null" && document.getElementById('TuesdayOut2').value === "null") ||
            (document.getElementById('WednesdayIn2').value === "null" && document.getElementById('WednesdayOut2').value !== "null") ||
            (document.getElementById('WednesdayIn2').value !== "null" && document.getElementById('WednesdayOut2').value === "null") ||
            (document.getElementById('ThursdayIn2').value === "null" && document.getElementById('ThursdayOut2').value !== "null") ||
            (document.getElementById('ThursdayIn2').value !== "null" && document.getElementById('ThursdayOut2').value === "null") ||
            (document.getElementById('FridayIn2').value === "null" && document.getElementById('FridayOut2').value !== "null") ||
            (document.getElementById('FridayIn2').value !== "null" && document.getElementById('FridayOut2').value === "null")){
                alert("One of the days is missing an In/Out time. Please try again.");
                return;
            }
        }
        if(document.getElementById('MondayIn3') !== null){
            if((document.getElementById('MondayIn3').value === "null" && document.getElementById('MondayOut3').value !== "null") ||
            (document.getElementById('MondayIn3').value !== "null" && document.getElementById('MondayOut3').value === "null") ||
            (document.getElementById('TuesdayIn3').value === "null" && document.getElementById('TuesdayOut3').value !== "null") ||
            (document.getElementById('TuesdayIn3').value !== "null" && document.getElementById('TuesdayOut3').value === "null") ||
            (document.getElementById('WednesdayIn3').value === "null" && document.getElementById('WednesdayOut3').value !== "null") ||
            (document.getElementById('WednesdayIn3').value !== "null" && document.getElementById('WednesdayOut3').value === "null") ||
            (document.getElementById('ThursdayIn3').value === "null" && document.getElementById('ThursdayOut3').value !== "null") ||
            (document.getElementById('ThursdayIn3').value !== "null" && document.getElementById('ThursdayOut3').value === "null") ||
            (document.getElementById('FridayIn3').value === "null" && document.getElementById('FridayOut3').value !== "null") ||
            (document.getElementById('FridayIn3').value !== "null" && document.getElementById('FridayOut3').value === "null")){
                alert("One of the days is missing an In/Out time. Please try again.");
                return;
            } 
        }

        sendID.push(ID.ChildID);
        ID.Classroom = document.getElementById('Classroom').value;
        ID.MI1 = document.getElementById('MondayIn').value;
        ID.MO1 = document.getElementById('MondayOut').value;
        ID.TI1 = document.getElementById('TuesdayIn').value;
        ID.TO1 = document.getElementById('TuesdayOut').value;
        ID.WI1 = document.getElementById('WednesdayIn').value;
        ID.WO1 = document.getElementById('WednesdayOut').value;
        ID.THI1 = document.getElementById('ThursdayIn').value;
        ID.THO1 = document.getElementById('ThursdayOut').value;
        ID.FI1 = document.getElementById('FridayIn').value;
        ID.FO1 = document.getElementById('FridayOut').value;

        if(document.getElementById('MondayIn2') !== null){
            ID.MI2 = document.getElementById('MondayIn2').value;
            ID.MO2 = document.getElementById('MondayOut2').value;
            ID.TI2 = document.getElementById('TuesdayIn2').value;
            ID.TO2 = document.getElementById('TuesdayOut2').value;
            ID.WI2 = document.getElementById('WednesdayIn2').value;
            ID.WO2 = document.getElementById('WednesdayOut2').value;
            ID.THI2 = document.getElementById('ThursdayIn2').value;
            ID.THO2 = document.getElementById('ThursdayOut2').value;
            ID.FI2 = document.getElementById('FridayIn2').value;
            ID.FO2 = document.getElementById('FridayOut2').value;
        } else {
            ID.MI2 = null;
            ID.MO2 = null;
            ID.TI2 = null;
            ID.TO2 = null;
            ID.WI2 = null;
            ID.WO2 = null;
            ID.THI2 = null;
            ID.THO2 = null;
            ID.FI2 = null;
            ID.FO2 = null;
        }

        if(document.getElementById('MondayIn3') !== null){
            ID.MI3 = document.getElementById('MondayIn3').value;
            ID.MO3 = document.getElementById('MondayOut3').value;
            ID.TI3 = document.getElementById('TuesdayIn3').value;
            ID.TO3 = document.getElementById('TuesdayOut3').value;
            ID.WI3 = document.getElementById('WednesdayIn3').value;
            ID.WO3 = document.getElementById('WednesdayOut3').value;
            ID.THI3 = document.getElementById('ThursdayIn3').value;
            ID.THO3 = document.getElementById('ThursdayOut3').value;
            ID.FI3 = document.getElementById('FridayIn3').value;
            ID.FO3 = document.getElementById('FridayOut3').value;
        } else {
            ID.MI3 = null;
            ID.MO3 = null;
            ID.TI3 = null;
            ID.TO3 = null;
            ID.WI3 = null;
            ID.WO3 = null;
            ID.THI3 = null;
            ID.THO3 = null;
            ID.FI3 = null;
            ID.FO3 = null;
        }

    };