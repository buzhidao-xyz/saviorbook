requirejs(["app", "api"], function ($app, $api){
	var WebApp = $app.WebApp;

	WebApp.service('BookService', ['$rootScope', '$http', function ($rootScope, $http){
		var Service = {
			//获取宝典目录
			chapterlist: [],
			getChapterList: function (params, data){
				var url = $api.host + $api.book.chapterlist.u;
				$http({
					method: $api.book.chapterlist.m,
					url: url,
					params: params,
					data: data
				}).success(function (data, status){
					Service.chapterlist = [];

					$rootScope.$broadcast('getChapterList.success');
				}).error(function (data, status){
					$rootScope.$broadcast('apiRequest.failed');
				});
			},

			//获取宝典内容
			chaptercontent: {},
			getChaptercontent: function (params, data){
				var url = $api.host + $api.book.chaptercontent.u;
				$http({
					method: $api.book.chaptercontent.m,
					url: url,
					params: params,
					data: data
				}).success(function (data, status){
					Service.chaptercontent = [];

					$rootScope.$broadcast('getChaptercontent.success');
				}).error(function (data, status){
					$rootScope.$broadcast('apiRequest.failed');
				});
			}
		}
		return Service;
	}]);
});