angular.module('nglohas').controller('FarmController', function($scope, $http){
    $.each(farmcards, function(index, value){
        value.amount = 0;
    });
    
    this.cards = farmcards;         

    $scope.minusamount = function(farmcard){
        if(farmcard.amount > 0)
            farmcard.amount--;
        console.log(farmcard.amount);
    }

    $scope.plusamount = function(farmcard){
        farmcard.amount++;    
        console.log(farmcard.amount);
    }

    $scope.missionadd = function(farmcard){
        if(user.mission1.mid == ""){
            user.mission1.mid = farmcard._id;
            user.mission1.amount = farmcard.amount;
            $.ajax({
                url: 'http://23.97.67.96:18207/users/' + user.FbId,
                data: JSON.stringify(user),
                type: 'PUT',
                contentType: 'application/json'});
        }
        else if(user.mission2.mid == "" && user.mission1.mid != farmcard._id){
            user.mission2.mid = farmcard._id;
            user.mission2.amount = farmcard.amount;
            $.ajax({
                url: 'http://23.97.67.96:18207/users/' + user.FbId,
                data: JSON.stringify(user),
                type: 'PUT',
                contentType: 'application/json'});
        }
        else if(user.mission3.mid == "" && user.mission2.mid != farmcard._id && user.mission1.mid != farmcard._id){
            user.mission3.mid = farmcard._id;
            user.mission3.amount = farmcard.amount;
            $.ajax({
                url: 'http://23.97.67.96:18207/users/' + user.FbId,
                data: JSON.stringify(user),
                type: 'PUT',
                contentType: 'application/json'});
        } else {
            alert("一天任務最多只能接三個喔而且不能重複接喔！");    
        }
    }

});
