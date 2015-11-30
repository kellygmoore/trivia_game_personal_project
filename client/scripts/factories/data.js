myApp.factory('ShareData', ["$http", function($http){
    var data = undefined;
    var categoryToPlay = {};
    console.log("In Factory");

    //PRIVATE
    var getTriviaData = function(){
        var promise = $http.get('/data').then(function(response){
            data = response.data;
            //console.log("Async data response: ", data);
        });
        return promise;
    };

    var play = function(catData){
    //console.log("Play function here is catData: ", catData);
        var answerArray =  [
            {ans: catData.ans1, id: 1},
            {ans: catData.ans2, id: 2},
            {ans: catData.ans3, id: 3},
            {ans: catData.ans4, id: 4},
            {ans: catData.ans5, id: 5}
        ];

        //send back category data
        categoryToPlay = {
            idNum: catData.id,
            category: catData.category,
            points: catData.points,
            difficulty: catData.difficulty,
            question: catData.question,
            randomAnswerArray: shuffleArray(answerArray),
            solutionArray: [catData.sol1, catData.sol2, catData.sol3, catData.sol4, catData.sol5]
        };
        console.log("In factory in playCategory, here is categoryToPlay: ", categoryToPlay);
        //return categoryToPlay;

        //put answers in random order
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

    //PUBLIC
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
            //console.log("In playCategory, here is object:", catData);
            return play(catData);
        //console.log("In factory in playCategory, here is catData as passed in: ", catData);

        }
    };

    return publicData;

}]);