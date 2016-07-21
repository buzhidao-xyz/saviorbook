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

			//aboutus-text
			$scope.aboutusTextScroll = function () {
				$.fn.myScroll = function(options){
					var defaults = {
						speed: 40,
						rowHeight: 24
					};
				
					var opts = $.extend({}, defaults, options),intId = [];
				
					function marquee(obj, step){
						obj.find("ul").animate({
							marginTop: '-=1'
						},0,function(){
							var s = Math.abs(parseInt($(this).css("margin-top")));
							if(s >= step){
								$(this).find("li").slice(0, 1).appendTo($(this));
								$(this).css("margin-top", 0);
							}
						});
					}
					this.each(function(i){
						var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
						intId[i] = setInterval(function(){
							if(_this.find("ul").height()<=_this.height()){
								clearInterval(intId[i]);
							}else{
								marquee(_this, sh);
							}
						}, speed);

						_this.hover(function(){
							clearInterval(intId[i]);
						},function(){
							intId[i] = setInterval(function(){
								if(_this.find("ul").height()<=_this.height()){
									clearInterval(intId[i]);
								}else{
									marquee(_this, sh);
								}
							}, speed);
						});
					});
				}

				setTimeout(function () {
					var liHeight = parseInt($('.aboutus_text_box').find("ul li").css("height"));
					$('.aboutus_text_box').myScroll({
						speed: 50, //数值越大，速度越慢
						rowHeight: liHeight //li的高度
					});
				}, 500);
			}

			//页面逻辑
			var path = $route.current.originalPath;
			switch (path) {
				case '/book':
					break;
				case '/chapter/chapterid/:chapterid':
					break;
				case '/aboutus':
					$scope.aboutusTextScroll();
					break;
				default:
					break;
			}
		}
	]);

	return {
		
	}
});