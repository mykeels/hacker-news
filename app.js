var app = angular.module("HackerNewsApp", []);

app.controller("ListingCtrl", function ($scope, $http) {
    $scope.news = new HackerNews($http);
    $scope.news.getTopStories();
});

app.directive("lazyLoad", function ($window) {
    return { 
        restrict: 'A',
        link: function ($scope, element, attrs) {
            var $w = angular.element($window);
            $w.on("scroll", function (ev) {
                //console.log(document.documentElement.scrollHeight, window.innerHeight, window.pageYOffset);
                if ((document.documentElement.scrollHeight - window.innerHeight) == window.pageYOffset) {
                    //console.log(ev);
                    $scope.news.showNext();
                }
            });
        }
    }
});