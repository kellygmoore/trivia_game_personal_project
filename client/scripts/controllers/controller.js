myApp.controller('MainCtrl', ["$scope", "ShareData", function($scope, ShareData) {
    //part of the ng-sortable
    $scope.sortableOptions = {
        containment: '#sortable-container'
    };

    //set variables
    var catCounter = 0;
    $scope.showRibbon = true;
    $scope.trueOrFalse = true;
    $scope.showNextArrow = true;
    $scope.showNextCatArrow = true;
    $scope.showSolution = true;
    $scope.disableAnswers = false;

    $scope.trivia = [];
    //$scope.catPoints = 0;
    $scope.totalPoints = 0;

    $scope.shareData = ShareData;

    //get shared data from db store in trivia////////////////////////////////
    if($scope.shareData.triviaData() === undefined){
        $scope.shareData.retrieveData()
            .then(function() {
                $scope.trivia = $scope.shareData.triviaData();
            });
    } else {
        $scope.trivia = $scope.shareData.triviaData();
    }

    //play a session based on Category clicked on/////////////////////////////
    $scope.catObject = $scope.shareData.getCategory();
    //console.log("CatObject1: ", $scope.catObject);

    //talk to factory to get shared data
    $scope.playCategory = function(newValue){
        $scope.shareData.playCategory(newValue);
    };
    var catTitle = $scope.catObject.category;
    $scope.catPoints = $scope.catObject.points;
    $scope.category = catTitle;
    //on click of the Check Order button, do this
    $scope.checkAnswers = function() {
        $scope.counter = 0;
        $scope.trueOrFalse = false;
        //check to see if the answers are ordered correctly by looping through each
        for(i=0; i<$scope.catObject.randomAnswerArray.length; i++){
            if ($scope.catObject.randomAnswerArray[i].id === (i+1)) {
                //console.log(i, " is correct!");
                $scope.counter++;
            }
        }
        //if all answers are ordered correctly
        if($scope.counter === 5){
            catCounter++;
            $scope.disableAnswers = true;
            console.log("catCounter: ", catCounter);
            if(catCounter === 5){
                $scope.showNextArrow = true;
                $scope.showNextCatArrow = false;
            }

            $scope.showNextArrow = false;
            $scope.showSolution = false;

            $scope.nextCatObjectIndex = $scope.catObject.idNum;
            //console.log("next question button index: ", $scope.nextCatObjectIndex);

            //else if the answers are NOT ordered correctly subtract points
        } else {
            $scope.catPoints -= 50;
            console.log("Points total here after click:", $scope.catPoints);
            if($scope.points === 0){
                //make it stop
            }
        }
        //console.log("The counter is at: ", $scope.counter);

        //on click of the next arrow after correctly ordered
        $scope.nextQuestion = function(next){
            console.log("In function nextQuestion click!");
            $scope.totalPoints += $scope.catPoints;
            console.log("Total Points: ", $scope.totalPoints);
            //get shared data to set up new catObject
            $scope.catObject = $scope.shareData.playCategory(next);
            //make sure category title doesn't change (in db, it is null)
            $scope.category = catTitle;

            $scope.catPoints = $scope.catObject.points;
            //hide the next arrow
            //$scope.showNextArrow = true;
            $scope.disableAnswers = false;
            $scope.showSolution = true;
            $scope.trueOrFalse = true;
            $scope.showNextArrow = true;
            //console.log("CatObject-Next: ", $scope.catObject);
        };


    };

    $scope.playNewCat = function(pts, cat){
        console.log("In function playNewCat!", pts + ", " + cat);
        $scope.shareData.newCategory(pts, cat);
    };
    $scope.completionObject = $scope.shareData.getNewCat();
    console.log("scope completionObject after getting shared data ", $scope.completionObject);
}]);



myApp.controller('InstructionsCtrl', ["$scope", function($scope) {

    $scope.flip = true;

    $scope.showInstructions = function(){
        $scope.flip = !$scope.flip;
    };

}]);