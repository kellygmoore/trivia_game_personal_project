myApp.controller('MainCtrl', ["$scope", "$location", "ShareData", function($scope, $location, ShareData) {
    //part of the ng-sortable
    $scope.sortableOptions = {
        containment: '#sortable-container'
    };

    //set variables
    var catCounter = 0;
    var lastPts = 0;
    var havePointsHere = 0;
    var catTitle;

    $scope.showRibbon = true;
    $scope.trueOrFalse = true;
    $scope.showNextArrow = true;
    $scope.showNextCatArrow = true;
    $scope.showSuccessMsg = true;
    $scope.showSolution = true;
    $scope.disableAnswers = false;
    $scope.noPointsMsg = true;
    $scope.disableCat = false;

    $scope.catPlayed = "";
    $scope.trivia = [];
    $scope.totalPoints = 0;
    $scope.runningTotalPts = 0;

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

    //talk to factory to get shared data and load first question in category/////////////////////
    $scope.playCategory = function(newValue){
        $location.path('/questionpage');
        $scope.shareData.playCategory(newValue);
    };

    catTitle = $scope.catObject.category;
    $scope.category = catTitle;
    $scope.catPoints = $scope.catObject.points;

    //on click of the Check Order button, do this
    $scope.checkAnswers = function() {
        //console.log("In checkAnswers catTitle: ", catTitle);
        $scope.counter = 0;
        $scope.trueOrFalse = false;
        //check to see if the answers are ordered correctly by looping through each
        for(i=0; i<$scope.catObject.randomAnswerArray.length; i++){
            if ($scope.catObject.randomAnswerArray[i].id === (i+1)) {
                //console.log(i, " is correct!");
                $scope.counter++;
            }
        }
        //if all answers are ordered correctly/////////////////////////////////
        if($scope.counter === 5){
            catCounter++;
            $scope.disableAnswers = true;
            //console.log("catCounter: ", catCounter);
            $scope.showNextArrow = false;

            //once all 5 questions have been played, ask to play new category
            if(catCounter === 5){
                $scope.showNextArrow = true;
                $scope.showNextCatArrow = false;
            }

            $scope.showSuccessMsg = false;
            $scope.showSolution = false;
            $scope.nextCatObjectIndex = $scope.catObject.idNum;
            //console.log("next question button index: ", $scope.nextCatObjectIndex);

            //else if the answers are NOT ordered correctly subtract points
        } else {
            $scope.catPoints -= 50;
            havePointsHere = $scope.catPoints;
            //console.log("Points total here after click:", havePointsHere);
            if(havePointsHere === 0){
                //if no points left, must go on to next question
                //console.log("scope.catPoints after click check answers button: ", $scope.catPoints);
                $scope.noPointsMsg = false;
                $scope.showSolution = false;
                $scope.disableAnswers = true;
                $scope.showNextArrow = false;
                $scope.trueOrFalse = true;
                $scope.showSuccessMsg = true;
                catCounter++;
                $scope.nextCatObjectIndex = $scope.catObject.idNum;
            }
        }


        //console.log("The counter is at: ", $scope.counter);

        //on click of the next arrow after correctly ordered
        $scope.nextQuestion = function(next){

            //console.log("In nextQuestion catTitle: ", catTitle);
            lastPts = $scope.catPoints;
            $scope.totalPoints += $scope.catPoints;
            //console.log("Total Points: ", $scope.totalPoints);
            //get shared data to set up new catObject
            $scope.catObject = $scope.shareData.playCategory(next);
            //make sure category title doesn't change (in db, it is null)
            $scope.category = catTitle;

            $scope.catPoints = $scope.catObject.points;
            //hide the next arrow

            $scope.noPointsMsg = true;
            $scope.showSuccessMsg = true;
            $scope.disableAnswers = false;
            $scope.showSolution = true;
            $scope.trueOrFalse = true;
            $scope.showNextArrow = true;
            //console.log("CatObject-Next: ", $scope.catObject);
        };


    };
    //when completed category, set points total and category name to display on page
    $scope.playNewCat = function(pts, cat){
        //console.log("In playNewCat catTitle: ", catTitle);
        $scope.shareData.newCategory(pts, cat);
    };
    //$scope.showRibbon = false;
    $scope.completionObject = $scope.shareData.getNewCat();
    $scope.totPts = $scope.completionObject.totPts + lastPts;
    //console.log("scope completionObject after getting shared data ", $scope.completionObject);

    //click to play another category - resets page////////////////////////////////////
    //console.log("scope.showribbon: ", $scope.showRibbon);
    $scope.updateCatPage = function(runningTotalPts, kittyName){
        //console.log("In updateCatPage catTitle: ", catTitle);
        //console.log("In controller function updateCatPage!", runningTotalPts, badge, kittyName);
        $scope.shareData.updateCat(runningTotalPts, kittyName);
    };
    $scope.newCatValues = $scope.shareData.getUpdateCatPage();

    console.log("var catTitle: ", $scope.category + ", scope.newCatValues.catPlayed: ", $scope.newCatValues.catPlayed);
    if($scope.category === $scope.newCatValues.cat){
        $scope.disableCat = true;
        $scope.showRibbon = false;
    }



}]);



myApp.controller('InstructionsCtrl', ["$scope", function($scope) {

    $scope.flip = true;

    $scope.showInstructions = function(){
        $scope.flip = !$scope.flip;
    };

}]);