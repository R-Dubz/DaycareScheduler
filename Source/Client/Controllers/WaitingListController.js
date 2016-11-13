    angular.module('DaycareApp').controller('WaitingListController', ['$scope', '$http', function($scope, $http){
        
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
                console.log(response.data);
            });
        };

    $scope.Children = [
        {
            ChildName: "Jessica Brown",
            DOB: "10/3/20160", 
            PhoneNumber: "555-555-5555", 
            PrimaryParentName: "John Brown", 
            PrimaryParentStatus: "Student", 
            SecondaryParentName: "Jane Brown",
            SecondaryParentStatus: "Community",
            DOA: "10/31/2016",
            DesStart: "10/17/2016",
            Class: "IN",
            Days: "MWF"
        },
        {
            ChildName: "Naruto Uzumaki",
            DOB: "06/04/2007", 
            PhoneNumber: "(123)456-7890", 
            PrimaryParentName: "Kushina Uzumaki", 
            PrimaryParentStatus: "Full-time SUNY student", 
            SecondaryParentName: "Minato Uzumaki",
            SecondaryParentStatus: "Community",
            DOA: "10/31/2016 11:31:22",
            DesStart: "11/4/2016",
            Class: "IN",
            Days: "MWF"
        },
        {
            ChildName: "Edward Elric",
            DOB: "06/04/2007", 
            PhoneNumber: "(123)456-7890", 
            PrimaryParentName: "Blank Blank", 
            PrimaryParentStatus: "Student", 
            SecondaryParentName: "Hoenheim Elric",
            SecondaryParentStatus: "Community",
            DOA: "10/31/2016",
            DesStart: "1/1/2017",
            Class: "IN",
            Days: "MWF"
        },
        {
            ChildName: "Saeki Yagami",
            DOB: "06/04/2007", 
            PhoneNumber: "(123)456-7890", 
            PrimaryParentName: "John Brown", 
            PrimaryParentStatus: "Student", 
            SecondaryParentName: "Jane Brown",
            SecondaryParentStatus: "Community",
            DOA: "10/31/2016",
            DesStart: "1/1/2017",
            Class: "IN",
            Days: "MWF"
        },
        {
            ChildName: "Ryan Black",
            DOB: "06/04/2007", 
            PhoneNumber: "(123)456-7890", 
            PrimaryParentName: "John Brown", 
            PrimaryParentStatus: "Student", 
            SecondaryParentName: "Jane Brown",
            SecondaryParentStatus: "Community",
            DOA: "10/31/2016",
            DesStart: "1/1/2017",
            Class: "IN",
            Days: "MWF"
        },
    ]

    }]);