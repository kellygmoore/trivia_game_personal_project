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
        //playCategory: function(catData){
        //    console.log("CatData: ", catData);
        //    categoryToPlay = catData.category;
        //}
        playCategory: function(catData){
            categoryToPlay = {
                category: catData.category,
                points: catData.points,
                difficulty: catData.difficulty,
                question: catData.question
            }
        }
    };

    return publicData;

}]);