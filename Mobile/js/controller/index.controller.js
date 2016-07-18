//index.controller.js
define([
	"require",
	"app",
	"commoncontroller"
	], function ($require, $app){
		var WebApp = $app.WebApp;

		WebApp.controller('IndexController', ['$scope', '$controller', function ($scope, $controller){
			var CommonController = $controller('CommonController', {$scope: $scope});
			
			//显示-隐藏followuslink
			$scope.toggleFollowUSLink = function () {
				setInterval(function () {
					$(".followuslink").toggle();
				}, 800);
			}

		}]);

		return {
			
		}
	}
);