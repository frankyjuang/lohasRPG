var article_index = 0;
var user = {
  FbId: "",
  points : 0,
  name : "", 
  exp : 0, 
  carbons: 0,
  mission1 : {
      mid: "",
      amount: 0,
      checked: 0
      }, 
  mission2 : {
      mid: "",
      amount: 0,
      checked: 0
      },
  mission3 : {
      mid: "",
      amount: 0,
      checked: 0
      }
};
(function(){
    'use strict';
    angular.module('nglohas', ['ngRoute']);

    angular.module('nglohas').factory("srvAuth", ['$rootScope', '$location', '$http',
        function($rootScope, $location, $http) {
            var srvAuth = {};

            srvAuth.fblogin = function() {
                FB.login(function (response) {
                    if (response.status === 'connected') {
                    }
                });        
            }

            srvAuth.watchLoginChange = function() {
                var _self = this;
                FB.Event.subscribe('auth.authResponseChange', function(res) {
                    if (res.status === 'connected') {
                        FB.api('/me', function(res) {
                            $rootScope.$apply(function() {
                                $rootScope.user = _self.user = res;
                                user.FbId = $rootScope.user.id;
                                var fetchUrl = 'http://23.97.67.96:18207/users/' + user.FbId;
                                $('#welcome').css('display', 'none');
                                $('#loading-login').css('display', 'block');
                                $http.get(fetchUrl).
                                    then(function(response){
                                        console.log("User Exists");
                                        user = response.data;
                                        console.log(user);
                                    }, function(error){
                                        console.log("User Doesn't Exists");
                                        user.name = $rootScope.user.name;
                                        $http.post('http://23.97.67.96:18207/users', JSON.stringify(user)).
                                            then(function(response){
                                                console.log("Post User Data");
                                                console.log(response);
                                            }, function(error){
                                                console.log("Post User Data Error");
                                                console.log(error);
                                                $('#loading-login').css('display', 'none');
                                            }).
                                            finally(function(){
                                                $location.path('/index');       // Redirect to Index Page
                                                $('#loading-login').css('display', 'none');
                                            });
                                    }).
                                    finally(function(){
                                        $location.path('/index');
                                        $('#loading-login').css('display', 'none');
                                    }); 
                            });
                        });
                    } else {
                        console.log("Not Connected");
                    }
                });
            }

            srvAuth.logout = function() {
                var _self = this;
                FB.logout(function(response) {
                    $rootScope.$apply(function() {
                        $rootScope.user = _self.user = {};
                    });
                });
            }

            return srvAuth;
        }
    ]);

    angular.module('nglohas').run(['$rootScope', '$window', 'srvAuth', 
        function($rootScope, $window, sAuth) {
            $rootScope.user = {};
            
            $window.fbAsyncInit = function() {
            // Executed when the SDK is loaded

                FB.init({ 
                  appId: '1449832898653639', 
                  channelUrl: '../channel.html', 
                  status: true, 
                  cookie: true, 
                  xfbml: true,
                  version: 'v2.3' 
                });

                sAuth.watchLoginChange();

            };

            (function(d){
                var js, 
                id = 'facebook-jssdk', 
                ref = d.getElementsByTagName('script')[0];

                if (d.getElementById(id)) {
                    return;
                }

                js = d.createElement('script'); 
                js.id = id; 
                js.async = true;
                js.src = "//connect.facebook.net/zh_TW/sdk.js";

                ref.parentNode.insertBefore(js, ref);

            }(document));
        }
    ]);

    angular.module('nglohas').config(function($routeProvider){
        $routeProvider
            .when('/index', {
                templateUrl: 'index.tpl.html'
            }).when('/farm', {
                controller: 'FarmController',
                controllerAs: 'farm',
                templateUrl: 'farm.tpl.html'
            }).when('/school',{
                controller: 'SchoolController',
                controllerAs: 'school',
                templateUrl: 'school.tpl.html'
            }).when('/article',{
                controller: 'ArticleController',
                controllerAs: 'article',
                templateUrl: 'article.tpl.html'
            }).when('/woods',{
                controller: 'WoodsController',
                controllerAs: 'woods',
                templateUrl: 'woods.tpl.html'
            }).when('/login',{
                templateUrl: 'login.tpl.html'
            }).when('/mission',{
                controller: 'MissionController',
                controllerAs: 'mission',
                templateUrl: 'mission.tpl.html'
            }).when('/collection',{
                controller: 'CollectionController',
                controllerAs: 'collection',
                templateUrlAs: 'collection.tpl.htnl'
            }).otherwise({
                // default page
                redirectTo: '/login'
            });
        }
    );
})();
