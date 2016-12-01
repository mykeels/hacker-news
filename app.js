var app = angular.module("HackerNewsApp", []);

app.controller("ListingCtrl", function ($scope, $http) {
    $scope.news = new HackerNews();
    $scope.news.getTopStories();
});
