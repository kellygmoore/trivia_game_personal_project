

var myApp = angular.module("myApp", ['as.sortable', 'ngRoute']);

    myApp.config(["$routeProvider", function($routeProvider){
    $routeProvider.
        when('/start', {
            templateUrl: "assets/views/routes/start.html"
        }).
        when('/login', {
            templateUrl: "assets/views/routes/login.html"
        }).
        when('/register', {
            templateUrl: "assets/views/routes/register.html"
        }).
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



