myApp.controller('MainCtrl', ["$scope", "ShareData", function($scope, ShareData) {
    //part of the ng-sortable
    $scope.sortableOptions = {
        containment: '#sortable-container'
    };

//set variables
    $scope.trueOrFalse = true;
    $scope.showNextArrow = true;
    $scope.trivia = [];

    $scope.shareData = ShareData;

    //get shared data
    if($scope.shareData.triviaData() === undefined){
        $scope.shareData.retrieveData()
            .then(function() {
                $scope.trivia = $scope.shareData.triviaData();
                //console.log("Trivia:", $scope.trivia);
            });
    } else {
        $scope.trivia = $scope.shareData.triviaData();
    }
    //console.log("shareData: ", $scope.trivia[3]);
    //console.log("Base Async: ", $scope.shareData.triviaData());
    //console.log("Scope Trivia: ", $scope.trivia);



    //play a session based on Category clicked on

    $scope.catObject = $scope.shareData.getCategory();
    $scope.playCategory = function(newValue) {
        $scope.shareData.playCategory(newValue);
    };
    console.log("$scope.catObject: ", $scope.catObject);



    $scope.checkAnswers = function() {
        $scope.counter = 0;
        $scope.catObject.points -= 50;
        if($scope.pointsTotal === 0){
            //make it stop
        }

        console.log("Points total here after click:", $scope.pointsTotal);
        $scope.trueOrFalse = false;
        for(i=0; i<$scope.question1.length; i++){
            if ($scope.question1[i].id === (i+1)) {
                console.log(i, " is correct!");
                $scope.counter++;
            }
        }
        if($scope.counter === 5){
            $scope.showNextArrow = false;
            $scope.trueOrFalse = true;
        }
        console.log("The counter is at: ", $scope.counter);
    }

}]);


myApp.controller('InstructionsCtrl', ["$scope", function($scope) {

    $scope.flip = true;

    $scope.showInstructions = function(){
        $scope.flip = !$scope.flip;
    };

}]);