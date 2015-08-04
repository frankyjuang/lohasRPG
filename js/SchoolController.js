angular.module('nglohas').controller('SchoolController', function($scope){
    this.posts = schoolposts;
    $scope.articleappear = function(){
        console.log(this.$index)
        article_index = this.$index;    
    }

    $scope.headerwords = function(){
        if(schoolposts[this.$index].header.length > 18)
            return schoolposts[this.$index].header.substring(0,18) + "...";
        else
            return schoolposts[this.$index].header;
    }

});
