var schoolposts = [];
var farmcards = [];
(function() {
    'use strict';
angular.module('nglohas').controller('HomeController', Controller);

Controller.$inject = [
    '$location',
    '$route',
    '$routeParams',
    '$scope',
    'srvAuth',
    '$http'
];

function Controller($location, $route, $routeParams, $scope, srvAuth, $http) {
    $scope.user = user;
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
    var counter = 0;
    $scope.fblogin = function(){
        srvAuth.fblogin();
    }
    $scope.logout = function(){
        srvAuth.logout();
    };
    $scope.sidebartoggle = function(){
        counter += 1;
        $(".home-points").html("風獅幣: "+user.points);
        if(user.exp < 1000){
            $(".home-exp").html("經驗值: LV1");
            $(".progress").css("width", (user.exp/10).toString()+"%");
            $(".value").html(user.exp+"/1000");
        }
        else if(user.exp < 3000 && user.exp >= 1000){
            $(".home-exp").html("經驗值: LV2");
            $(".progress").css("width", ((user.exp-1000)/3000).toString()+"%");
            $(".value").html(user.exp+"/3000");
        }
        else if(user.exp < 6000 && user.exp >=3000){
            $(".home-exp").html("經驗值: LV3");
            $(".progress").css("width", ((user.exp-3000)/6000).toString()+"%");
            $(".value").html(user.exp+"/6000");
        }
        else{
            $(".home-exp").html("經驗值: LV4");
            $(".progress").css("width", ((user.exp-6000)/10000).toString()+"%");
            $(".value").html(user.exp+"/10000");
        }
        
        $("#carbonwords").html("已經少"+user.carbons+"公斤的碳足跡");

        if (counter%2 == 1){
            $.sidr('open', 'home-sidr');      
        }
        else{
            $.sidr('close', 'home-sidr');
        }
    };
    $scope.$on('$locationChangeSuccess', function(event, next, current){
        var name = next.split("/")[4];
        var prev_name = current.split("/")[4];
        console.log("Location: " + prev_name + " -> " + name);
        var cssname = "#css-" + name;
        var prev_cssname = "#css-" + prev_name;
        $(prev_cssname).attr('disabled', 'disabled');
        $(cssname).removeAttr('disabled');

        counter = 1;
        $scope.sidebartoggle();

        if (name == "index" && schoolposts.length == 0) {
            $('#css-loading-school').removeAttr('disabled');
            $http.get("http://23.97.67.96:18207/posts").
                then(function(response){
                    console.log("Cheating~~~Fetch Posts at Index");
                    schoolposts = response.data.objects;
                }, function(error){
                    console.log("Fetch Posts Error");
                }).
                finally(function(){
                    console.log(schoolposts);
                    $('#css-loading-school').attr('disabled', 'disabled');
                    console.log("Posts Loaded");
                });
        }
        if (name == "index" && farmcards.length == 0) {
            $('#css-loading-farm').removeAttr('disabled');
            $http.get("http://23.97.67.96:18207/cards").
                then(function(response){
                    console.log("Cheating~~~Fetch Cards at Index");
                    farmcards = response.data.objects;
                }, function(error){
                    console.log("Fetch Cards Error");
                    $scope.loading = false;
                }).
                finally(function(){
                    console.log(farmcards);
                    $('#css-loading-farm').attr('disabled', 'disabled');
                    console.log("Cards Loaded");
                });
        }
    });
};

})();
