myApp.factory('ShareData', ["$http", function($http){
    var data = undefined;
    var categoryToPlay = {};
    var newCat = {};
    var updateVals = {};
    var runningTot = 0;

    console.log("In Factory");

    //PRIVATE///////////////////////////////////////////////////////
    var getTriviaData = function(){
        var promise = $http.get('/data').then(function(response){
            data = response.data;
            //console.log("Async data response: ", data);
        });
        return promise;
    };

    var play = function(catData){

        var answerArray =  [
            {ans: catData.ans1, id: 1, sol: catData.sol1},
            {ans: catData.ans2, id: 2, sol: catData.sol2},
            {ans: catData.ans3, id: 3, sol: catData.sol3},
            {ans: catData.ans4, id: 4, sol: catData.sol4},
            {ans: catData.ans5, id: 5, sol: catData.sol5}
        ];

        //send back category data///////////////////
        categoryToPlay = {
            idNum: catData.id,
            category: catData.category,
            points: catData.points,
            difficulty: catData.difficulty,
            question: catData.question,
            randomAnswerArray: shuffleArray(answerArray)
            //solutionArray: [catData.sol1, catData.sol2, catData.sol3, catData.sol4, catData.sol5]
        };
        //console.log("In factory in playCategory, here is categoryToPlay: ", categoryToPlay);

        //put answers in random order//////////////
        function shuffleArray(array) {
            //console.log("passed in array: ", array);
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
        return categoryToPlay;
    };

    //change view back on category page to update total points from game///////
    var update = function(runPts, cName){
        runningTot += runPts;
        updateVals = {runningTotal: runningTot, catPlayed: cName};
        return updateVals;
    };


    //PUBLIC///////////////////////////////////////////////
    var publicData = {
        retrieveData: function(){
            return getTriviaData();
        },
        triviaData: function(){
            return data;
        },
        getCategory: function(){
            return categoryToPlay;
        },
        playCategory: function(catData){
            return play(catData);
        },
        getNewCat: function(){
            return newCat;
        },
        newCategory: function(points, categoryName){
            newCat = {totPts: points, cat: categoryName};
        },
        getUpdateCatPage: function(){
            return updateVals;
        },
        updateCat: function(runPts, cName){
            return update(runPts, cName);
        }
    };

    return publicData;

}]);


myApp.factory('AuthService', ['$http', function($http) {
console.log("In factory AuthService");
    var serverCheckUniqueValue = function (id, property, value) {
        var data = {
            id: id,
            property: property,
            value: value
        };
        return $http.post("/login", data).then(function (res) {
            return res.data.isUnique;
        });
    };

    var publicAPI = {
        checkUniqueValue: serverCheckUniqueValue
    };

    return publicAPI;

}]);