requirejs(["app", "api"], function ($app, $api){
	var WebApp = $app.WebApp;

	WebApp.service('BookService', ['$rootScope', '$http', function ($rootScope, $http){
		var Service = {
			//获取全部文章
			articlelist: [],
			getArticleList: function (params, data){
				var url = $api.host + $api.article.articlelist.u;
				$http({
					method: $api.article.articlelist.m,
					url: url,
					params: params,
					data: data
				}).success(function (data, status){
					Service.articlelist = [];
					for (index in data.articlelist) {
						Service.articlelist.push({
							"id": data.articlelist[index].id,
							"title": data.articlelist[index].title,
							"content": data.articlelist[index].content,
							"publishtime": data.articlelist[index].publishtime,
						});
					}

					$rootScope.$broadcast('getArticleList.success');
				}).error(function (data, status){
					$rootScope.$broadcast('apiRequest.failed');
				});
			}
		}
		return Service;
	}]);
});