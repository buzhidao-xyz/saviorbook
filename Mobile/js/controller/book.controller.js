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
				$("#ChapterBox").removeClass('pt-page-moveToTop').addClass('pt-page-moveFromTop').show();

				//service交互 - getChapterList
				$BookService.getChapterList();
				//监听事件 - getChapterList.success
				$scope.$on('getChapterList.success', function (event, d){
					$scope.$chapterlist = $BookService.chapterlist;
				});
			};

			//页面逻辑
			var path = $route.current.originalPath;
			switch (path) {
				case '/book':
					break;
				default:
					break;
			}
		}
	]);

	return {
		
	}
});