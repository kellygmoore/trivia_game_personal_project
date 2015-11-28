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
            categoryToPlay = {
                category: catData.category,
                points: catData.points,
                difficulty: catData.difficulty,
                question: catData.question,
                answerArray: [
                    {ans: catData.ans1, id: 1},
                    {ans: catData.ans2, id: 2},
                    {ans: catData.ans3, id: 3},
                    {ans: catData.ans4, id: 4},
                    {ans: catData.ans5, id: 5}
                ],
                solutionArray: [catData.sol1, catData.sol2, catData.sol3, catData.sol4, catData.sol5]
            }
        }
    };

    return publicData;

}]);