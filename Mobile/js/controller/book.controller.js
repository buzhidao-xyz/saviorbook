//article.controller.js
define(["require", "app", "commoncontroller"], function ($require, $app){
	var WebApp = $app.WebApp;

	WebApp.controller('BookController', [
		'$scope',
		'$controller',
		'$route',
		'$routeParams',
		'$location',
		'BookService',
		function ($scope, $controller, $route, $routeParams, $location, $BookService){
			var CommonController = $controller('CommonController', {$scope: $scope});

			//显示-隐藏followuslink
			$scope.toggleFollowUSLink = function () {
				setInterval(function () {
					$(".followuslink").toggle();
				}, 800);
			}

			//显示章节列表
			$scope.showBookChapter = function (e){
				alert(1);
				//service交互 - getArticleList
				$BookService.getArticleList();
				//监听事件 - getArticleList.success
				$scope.$on('getArticleList.success', function (event, d){
					$scope.$articlelist = $BookService.articlelist;
				});
			};

			//页面逻辑
			var path = $route.current.originalPath;
			switch (path) {
				case '/arclist':
					$scope.getArticleList();
					break;
				default:
					break;
			}
		}
	]);

	return {
		
	}
});