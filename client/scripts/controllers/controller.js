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

    //get shared data from db store in trivia
    if($scope.shareData.triviaData() === undefined){
        $scope.shareData.retrieveData()
            .then(function() {
                $scope.trivia = $scope.shareData.triviaData();
                //console.log("Trivia:", $scope.trivia);
            });
    } else {
        $scope.trivia = $scope.shareData.triviaData();
    }

    //play a session based on Category clicked on
    $scope.catObject = $scope.shareData.getCategory();
    $scope.playCategory = function(newValue) {
        $scope.shareData.playCategory(newValue);
    };
    console.log("$scope.catObject: ", $scope.catObject);

    $scope.points = $scope.catObject.points;
    $scope.answerArray = $scope.catObject.answerArray;
    $scope.solutionArray = $scope.catObject.solutionArray;

    //on click of the Check Order button, do this
    $scope.checkAnswers = function() {
        $scope.counter = 0;
        $scope.points -= 50;
        if($scope.points === 0){
            //make it stop
        }
        console.log("Points total here after click:", $scope.points);

        $scope.trueOrFalse = false;
        for(i=0; i<$scope.answerArray.length; i++){
            if ($scope.answerArray[i].id === (i+1)) {
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