

var myApp = angular.module("myApp", ['as.sortable', 'ngRoute']);

    myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when('/start', {
            templateUrl: "assets/views/routes/start.html",
            controller: "InstructionsCtrl"
        }).
        //when('/login', {
        //    templateUrl: "assets/views/routes/login.html",
        //    controller: "AccountCtrl"
        //}).
        //when('/register', {
        //    templateUrl: "assets/views/routes/register.html",
        //    controller: "AccountCtrl"
        //}).
        when('/category', {
            templateUrl: "assets/views/routes/category.html",
            controller: "MainCtrl"
        }).
        when('/questionpage', {
            templateUrl: "assets/views/routes/questionpage.html",
            controller: "MainCtrl"
        }).
        when('/completion', {
            templateUrl: "assets/views/routes/completion.html",
            controller: "MainCtrl"
        }).
        otherwise({
            redirectTo: 'start'
        })
}]);



