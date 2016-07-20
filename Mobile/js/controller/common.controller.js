//定义模块CommonController
define(["app", "api"], function ($app, $api){
	var WebApp = $app.WebApp;

	WebApp.controller("CommonController", [
    '$scope',
    '$rootScope',
    '$controller',
    '$route',
    '$routeParams',
    '$location', function ($scope, $rootScope, $controller, $route, $routeParams, $location) {
		//预定义变量
		$scope.errormsg = "网络错误 请求失败！";

		//path
		$rootScope.path = ('current' in $route) ? $route.current.$$route.originalPath : '';

		//页面msg提示
		$scope.alertShow = function (msg, flag) {
			alert(msg);
		}

		//监听事件 - apiRequest.failed
		$scope.$on('apiRequest.failed', function (event, d) {
			$scope.alertShow($scope.errormsg);
		});

		//统一API请求数据处理方法
		$scope.apiRequestData = function (data) {
			var data = data ? data : {
				sessionid: ""
			}

			var sessionid = $cookies.getObject('sessionid');
			data.sessionid = sessionid;

			return data;
		}

		//统一API返回数据处理方法
		$scope.apiResult = function (data, params) {
			//如果status==0 成功
			if (data.status == 0) {
				return data.data;
			} else if (data.status == -4) {
				//未登录用户
				$location.path('/login');
			} else {
				$scope.alertShow($scope.errormsg);
			}
		}

		//显示关注我们
		$scope.showFollowus = function (e) {
			var $this = $(e.target);
			
			$("#FollowUS").show();
		}
		//隐藏关注我们
		$scope.hideFollowus = function (e) {
			var $this = $(e.target);
			
			$("#FollowUS").hide();
		}

		//显示收藏
		$scope.showFav = function (e) {
			var $this = $(e.target);

			$("#FavBox").show();
		}
		//隐藏收藏
		$scope.hideFav = function (e) {
			var $this = $(e.target);

			$("#FavBox").hide();
		}

		//隐藏章节
		$scope.hideChapterbox = function (e) {
			var $this = $(e.target);

			$("#ChapterBox").removeClass('pt-page-moveFromTop').addClass('pt-page-moveToTop');
		}

		return {
			alertShow: $scope.alertShow,
			apiRequestData: $scope.apiRequestData,
			apiResult: $scope.apiResult
		}
	}]);
});