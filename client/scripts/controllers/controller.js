myApp.controller('MainCtrl', ["$scope", "$location", "ShareData", function($scope, $location, ShareData) {
    //part of the ng-sortable
    $scope.sortableOptions = {
        containment: '#sortable-container'
    };

    //set variables
    var catCounter = 0;
    var lastPts = 0;
    //var gameOverCounter = 0;
    var havePointsHere = 0;
    var catTitle;

    //set booleans for ng-hide
    $scope.trueOrFalse = true;
    $scope.showNextArrow = true;
    $scope.showNextCatArrow = true;
    $scope.showSuccessMsg = true;
    $scope.showSolution = true;
    $scope.disableAnswers = false;
    $scope.noPointsMsg = true;
    //$scope.showGameOver = true;

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
        newValue.disabled = true;
        newValue.showRibbon = true;
        $scope.shareData.playCategory(newValue);
    };

    catTitle = $scope.catObject.category;
    $scope.category = catTitle;
    $scope.catPoints = $scope.catObject.points;
    //console.log("GameOverCounter after clicking playcategory link: ", gameOverCounter);

    //on click of the Check Order button, do this///////////////////////////////////
    $scope.checkAnswers = function() {
        $scope.randomArray = $scope.catObject.randomAnswerArray;
        //console.log("catObject Array Order: ", $scope.randomArray);


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

            //once all 5 questions have been played, ask to play new category/////////////
            if(catCounter === 5){
                $scope.showNextArrow = true;
                $scope.showNextCatArrow = false;
            }

            $scope.showSuccessMsg = false;
            $scope.showSolution = false;
            $scope.nextCatObjectIndex = $scope.catObject.idNum;

            //else if the answers are NOT ordered correctly subtract points//////////////////
        } else {
            $scope.catPoints -= 50;
            havePointsHere = $scope.catPoints;

            //if you have 0 points you must move on to next question////////////////////////
            if(havePointsHere === 0){

                //console.log("scope.catPoints after click check answers button: ", $scope.catPoints);
                //reset the page view////////////////////
                $scope.noPointsMsg = false;
                $scope.showSolution = false;
                $scope.disableAnswers = true;
                $scope.showNextArrow = false;
                $scope.trueOrFalse = true;
                $scope.showSuccessMsg = true;
                catCounter++;
                if(catCounter === 5){
                    $scope.showNextArrow = true;
                    $scope.showNextCatArrow = false;
                }
                $scope.nextCatObjectIndex = $scope.catObject.idNum;
            }
        }


        //on click of the next arrow after correctly ordered//////////////////////////////
        $scope.nextQuestion = function(next){
            //gameOverCounter++;
            //console.log("GameOverCounter after clicking next question arrow: ", gameOverCounter);
            lastPts = $scope.catPoints;
            $scope.totalPoints += $scope.catPoints;
            //console.log("Total Points: ", $scope.totalPoints);

            //get shared data to set up new catObject//////////////////////////
            $scope.catObject = $scope.shareData.playCategory(next);
            //make sure category title doesn't change (in db, it is null)
            $scope.category = catTitle;

            $scope.catPoints = $scope.catObject.points;
            //set the new view//////////
            $scope.noPointsMsg = true;
            $scope.showSuccessMsg = true;
            $scope.disableAnswers = false;
            $scope.showSolution = true;
            $scope.trueOrFalse = true;
            $scope.showNextArrow = true;
        };
    };
    //when completed category, set points total and category name to display on page//////////////////////
    $scope.playNewCat = function(pts, cat){
        //gameOverCounter++;
        //console.log("GameOverCounter after clicking playNewcat arrow: ", gameOverCounter);
        $scope.shareData.newCategory(pts, cat);
    };

    $scope.completionObject = $scope.shareData.getNewCat();

    //calculate total category points to show back on completion page/////////
    $scope.totPts = $scope.completionObject.totPts + lastPts;


    //click to play another category - resets category page////////////////////////////////////
    $scope.updateCatPage = function(runningTotalPts, kittyName){
        $scope.shareData.updateCat(runningTotalPts, kittyName);
    };
    $scope.newCatValues = $scope.shareData.getUpdateCatPage();
    //console.log("gameover on catpage: ", + gameOverCounter +  ", trivia length: " + $scope.trivia.length);
    //if(gameOverCounter === $scope.trivia.length){
    //    $scope.showGameOver = false;
    //}

}]);        //end of MainCtrl controller///////////////////////////////////////


//controller only function to show instructions when clicked//////////
myApp.controller('InstructionsCtrl', ["$scope", function($scope) {

    //hide elements
    $scope.flip = true;
    $scope.showCredits = true;

    $scope.showInstructions = function(){
        $scope.flip = !$scope.flip;
    };

    $scope.showLogoCredits = function(){
        $scope.showCredits = !$scope.showCredits;
    }

}]);

//used for registering and logging in/////////////////////////////////////
myApp.controller('AccountCtrl', ["$scope", function($scope){

    $scope.playername = "";
    console.log("username: ", $scope.playername);



    myApp.directive("ngUnique", ['AuthService', function(AuthService) {
        console.log("In myApp directive AccountCtrl");
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.bind('blur', function (e) {
                    if (!ngModel || !element.val()) return;
                    var keyProperty = scope.$eval(attrs.ngUnique);
                    var currentValue = element.val();
                    AuthService.checkUniqueValue(keyProperty.key, keyProperty.property, currentValue)
                        .then(function (unique) {
                            //Ensure value that being checked hasn't changed
                            //since the Ajax call was made
                            if (currentValue == element.val()) {
                                console.log('unique = '+unique);
                                ngModel.$setValidity('unique', unique);
                                scope.$broadcast('show-errors-check-validity');
                            }
                        });
                });
            }
        }
    }]);

    myApp.directive('passwordMatch', [function () {
        console.log("In formApp directive.");
        return {
            restrict: 'A',
            scope:true,
            require: 'ngModel',
            link: function (scope, elem , attrs,control) {
                var checker = function () {

                    //get the value of the first password
                    var e1 = scope.$eval(attrs.ngModel);

                    //get the value of the other password
                    var e2 = scope.$eval(attrs.passwordMatch);
                    return e1 == e2;
                };
                scope.$watch(checker, function (n) {

                    //set the form control to valid if both
                    //passwords are the same, else invalid
                    control.$setValidity("unique", n);
                });
            }
        };
    }]);
}]);


///////////////////////THE END///////////////////////////////////