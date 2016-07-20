requirejs(["app", "api"], function ($app, $api){
	var WebApp = $app.WebApp;

	WebApp.service('BookService', ['$rootScope', '$http', function ($rootScope, $http){
		var Service = {
			//获取全部文章
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
			}
		}
		return Service;
	}]);
});