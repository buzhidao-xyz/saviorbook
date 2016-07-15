//定义模块CommonController
define(["app", "api"], function ($app, $api){
	var WebApp = $app.WebApp;

	WebApp.controller("CommonController", [
    '$scope',
    '$rootScope',
    '$controller',
    '$route',
    '$routeParams',
    '$location',
    '$cookies', function ($scope, $rootScope, $controller, $route, $routeParams, $location, $cookies) {
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

		//写入cookie-userinfo
		$scope.gsuserinfo = function ($userinfo) {
			if ($userinfo && ("sessionid" in $userinfo) && $userinfo.sessionid) {
				$cookies.putObject('sessionid', $userinfo.sessionid);
				$cookies.putObject('userinfo', $userinfo);
			}

			$userinfo = $cookies.getObject('userinfo');

			return $userinfo;
		}
		//获取sessionid
		$rootScope.sessionid = $cookies.getObject('sessionid');
		//获取userinfo
		$rootScope.$userinfo = $scope.gsuserinfo();

		//销毁cookie-userinfo
		$scope.ususerinfo = function () {
			$cookies.remove('userinfo');
			$cookies.remove('sessionid');
		}

		//登录验证
		$scope.checkLogin = function () {
			if (!('current' in $route)) return true;
			if (!$route.current.$$route.cklogon) return true;

			if (!$rootScope.sessionid || !$rootScope.$userinfo) {
				$location.path('/login');
			}
		};

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

		return {
			alertShow: $scope.alertShow,
			gsuserinfo: $scope.gsuserinfo,
			ususerinfo: $scope.ususerinfo,
			apiRequestData: $scope.apiRequestData,
			apiResult: $scope.apiResult
		}
	}]);
});