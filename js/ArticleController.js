angular.module('nglohas').controller('ArticleController', function($scope, $sce){
    this.article_content = schoolposts[article_index]; 
    var words = "";
    $scope.paragraph = '';

    $scope.renderHtml = function(htmlCode) {
        words = "";
        $.each(schoolposts[article_index].article, function(index, value){
            console.log(index+value);
            if( value.substring(0,5) == "IMAGE" )
                words = words + "<img src=\"" + value.substring(5) + "\" >";
            else
                words = words + "<p>" + value + "</p>";
        });
        console.log("aaaa");
        return $sce.trustAsHtml(words);      
    };
});
