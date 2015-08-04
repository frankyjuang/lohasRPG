(function(){
   angular.module('nglohas').controller('MissionController', Controller); 
    
    function Controller($scope,$http){
        this.missions = [];
        var fetchurl = "http://23.97.67.96:18207/cards/"+user.mission1.mid;
        $http.get(fetchurl).success(function(response){
            if( user.mission1.checked != 1 ){
                response.amount = user.mission1.amount;
                $scope.mission.missions.push(response);
            }
        });
        fetchurl = "http://23.97.67.96:18207/cards/"+user.mission2.mid;
        $http.get(fetchurl).success(function(response){
            if( user.mission2.checked != 1 ){
                response.amount = user.mission2.amount;
                $scope.mission.missions.push(response);
            }
        });
        fetchurl = "http://23.97.67.96:18207/cards/"+user.mission3.mid;
        $http.get(fetchurl).success(function(response){
            if( user.mission3.checked != 1 ){
                response.amount = user.mission3.amount;
                $scope.mission.missions.push(response);
            }
        });

        $scope.finishmission = function(mission){
            console.log(mission);
            console.log("aaa");
            user.exp += 30;
            user.carbons += mission.amount*mission.effect/mission.base;  
            if(mission._id == user.mission1.mid)
                user.mission1.checked = 1;
            if(mission._id == user.mission2.mid)
                user.mission2.checked = 1;
            if(mission._id == user.mission3.mid)
                user.mission3.checked = 1;
            $scope.mission.missions.splice($scope.mission.missions.indexOf(mission), 1);
            $.ajax({
                url: 'http://23.97.67.96:18207/users/' + user.FbId,
                data: JSON.stringify(user),
                type: 'PUT',
                contentType: 'application/json'});
        };

        $scope.closemission = function(mission){
            if(mission._id == user.mission1.mid)
                user.mission1.checked = 1;
            if(mission._id == user.mission2.mid)
                user.mission2.checked = 1;
            if(mission._id == user.mission3.mid)
                user.mission3.checked = 1;
            $scope.mission.missions.splice($scope.mission.missions.indexOf(mission), 1);
            var fetchurl = "http://23.97.67.96:18207/users/"+ user.FbId;
            $.ajax({
                url: 'http://23.97.67.96:18207/users/' + user.FbId,
                data: JSON.stringify(user),
                type: 'PUT',
                contentType: 'application/json'});
        };
    };
    
})();
