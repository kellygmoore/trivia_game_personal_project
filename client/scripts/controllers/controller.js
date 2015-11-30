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

    //get shared data from db store in trivia////////////////////////////////
    if($scope.shareData.triviaData() === undefined){
        $scope.shareData.retrieveData()
            .then(function() {
                $scope.trivia = $scope.shareData.triviaData();
                //console.log("Trivia:", $scope.trivia);
            });
    } else {
        $scope.trivia = $scope.shareData.triviaData();
    }

    //console.log("Here is trivia array: ", $scope.trivia);

    //play a session based on Category clicked on/////////////////////////////
    $scope.catObject = $scope.shareData.getCategory();
    console.log("CatObject1: ", $scope.catObject);

    //talk to factory to get shared data
    $scope.playCategory = function(newValue){
        $scope.shareData.playCategory(newValue);
    };

    //$scope.points = $scope.catObject.points;
    //$scope.solutionArray = $scope.catObject.solutionArray;
    //$scope.randomAnswerArray = $scope.catObject.randomAnswerArray;


    //on click of the Check Order button, do this
    $scope.checkAnswers = function() {
        $scope.counter = 0;

        console.log("Points total here after click:", $scope.points);

        $scope.trueOrFalse = false;
        //check to see if the answers are ordered correctly by looping through each
        for(i=0; i<$scope.catObject.randomAnswerArray.length; i++){
            if ($scope.catObject.randomAnswerArray[i].id === (i+1)) {
                console.log(i, " is correct!");
                $scope.counter++;
            }
        }
        //if all answers are ordered correctly
        if($scope.counter === 5){
            $scope.showNextArrow = false;
            $scope.trueOrFalse = true;
            $scope.nextCatObjectIndex = $scope.catObject.idNum;
            console.log("next question button index: ", $scope.nextCatObjectIndex);

            //on click of the next arrow after correctly ordered


            //else if the answers are NOT ordered correctly subtract points
        } else {
            $scope.points -= 50;
            if($scope.points === 0){
                //make it stop
            }
        }
        //console.log("The counter is at: ", $scope.counter);
        //$scope.catObject = $scope.shareData.getCategory();
        $scope.nextQuestion = function(next){

            $scope.catObject = $scope.shareData.playCategory(next);
            $scope.showNextArrow = true;
            console.log("CatObject-Next: ", $scope.catObject);
        };
        //$scope.catObject = $scope.shareData.getCategory();

    }

}]);



myApp.controller('InstructionsCtrl', ["$scope", function($scope) {

    $scope.flip = true;

    $scope.showInstructions = function(){
        $scope.flip = !$scope.flip;
    };

}]);