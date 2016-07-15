//appjs
define(["require", "angular", "angular-route", "angular-cookies"], function (require, angular){
    //注册angular.module-WebApp
	var WebApp = angular.module("WebApp", ["ngRoute", "ngCookies"]);

	//配置angularmodule
	WebApp.config(['$routeProvider', function($routeProvider) {
		//router路由
		$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'IndexController'
		})
		.when('/arcprofile', {
			templateUrl: 'views/arcprofile.html',
			controller: 'ArticleController'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);

	//运行angularmodule
	WebApp.run(['$rootScope', '$window', '$location', '$log', function ($rootScope, $window, $location, $log) {
		//监听事件 - 路由切换开始
		$rootScope.$on('$routeChangeStart', function (){
			//显示loading
			$("#loadingbox").show();
		});
		//监听事件 - 路由切换成功
		$rootScope.$on('$routeChangeSuccess', function (){
			//隐藏loading
			$("#loadingbox").hide();
		});
	}]);

	//返回模块对象
	return {
		WebApp: WebApp
	}
});