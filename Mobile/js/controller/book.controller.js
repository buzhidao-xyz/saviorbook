//article.controller.js
define(["require", "app", "commoncontroller"], function ($require, $app){
	var WebApp = $app.WebApp;

	WebApp.controller('BookController', [
		'$scope',
		'$controller',
		'$route',
		'$routeParams',
		'$location',
		'$sce',
		'BookService',
		function ($scope, $controller, $route, $routeParams, $location, $sce, $BookService){
			$scope.bookid = 0;
			$scope.chapterid = 0;
			$scope.$chapterlist = {};

			$scope.IntervalId;

			var CommonController = $controller('CommonController', {$scope: $scope});

			//book-显示章节列表
			$scope.showBookChapter = function (e, bookid){
				var bookid = bookid ? bookid : $scope.bookid;
				if (!bookid) return false;

				$("#ChapterBox").removeClass('pt-page-moveToTop').addClass('pt-page-moveFromTop').show();
				//显示不同目录的bustimg
				$("#ChapterBox").find("img.chapterbox_bust").attr("src", "Mobile/images/book/bust"+bookid+".png");

				//service交互 - getChapterList
				var params = {
					bookid: bookid
				}
				$BookService.getChapterList(params);
				//监听事件 - getChapterList.success
				$scope.$on('getChapterList.success', function (event, d){
					$scope.$chapterlist = $scope.apiResult($BookService.chapterlist);
				});
			};

			//获取目录内容
			$scope.getChapterContent = function () {
				//service交互 - getChaptercontent
				var params = {
					chapterid: $scope.chapterid
				}
				$BookService.getChaptercontent(params);
				//监听事件 - getChaptercontent.success
				$scope.$on('getChaptercontent.success', function (event, d){
					$scope.$chaptercontent = $scope.apiResult($BookService.chaptercontent);
					for (index in $scope.$chaptercontent.content) {
						$scope.$chaptercontent.content[index].iconclass = 'show';
						$scope.$chaptercontent.content[index].iconhoverclass = '';
						$scope.$chaptercontent.content[index].contentclass = '';
						if (index == 0) {
							$scope.$chaptercontent.content[index].iconclass = '';
							$scope.$chaptercontent.content[index].iconhoverclass = 'show';
							$scope.$chaptercontent.content[index].contentclass = 'show';
						}

						$scope.$chaptercontent.content[index].content = $sce.trustAsHtml($scope.$chaptercontent.content[index].content);
					}
				});
			}

			//chapter-章节tab切换
			$scope.showChapterContent = function (e) {
				var $this = $(e.target);
				var $that = $this.parent();
				var index = $that.index();

				//tab选中更新
				$("#ContentBox").find("img.content_tab_item_img_hover").removeClass('show');
				$("#ContentBox").find("img.content_tab_item_img").addClass('show');
				$that.find("img.content_tab_item_img").removeClass('show');
				$that.find("img.content_tab_item_img_hover").addClass('show');

				//content对应显示
				$("#ContentBox").find(".content_body_item").removeClass('show');
				$("#ContentBox").find(".content_body_item:eq("+index+")").addClass('show');
			}

			//aboutus-textscroll
			$scope.aboutusTextScroll = function () {
				$.fn.myScroll = function(options){
					var flag = 1;
					var defaults = {
						speed: 1,
						rowHeight: 481.41
					};
				
					clearInterval($scope.IntervalId);

					var opts = $.extend({}, defaults, options);

					function marquee(obj, step){
						obj.find("ul").animate({
							marginTop: '-=1'
						},50,function(){
							var s = Math.abs(parseInt($(this).css("margin-top")));
							if (s >= step) {
								$(this).find("li").slice(0, 1).appendTo($(this));
								$(this).css("margin-top", 0);
							}
						});
					}
					
					var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
					$scope.IntervalId = setInterval(function(){
						if (_this.find("ul").height()<=_this.height()) {
							clearInterval($scope.IntervalId);
						} else {
							marquee(_this, sh);
						}
					}, speed);

					_this.click(function(){
						if (flag) {
							flag = 0;
							clearInterval($scope.IntervalId);
						} else {
							flag = 1;
							$scope.IntervalId = setInterval(function(){
								if (_this.find("ul").height()<=_this.height()) {
									clearInterval($scope.IntervalId);
								} else {
									marquee(_this, sh);
								}
							}, speed);
						}
					});
				}

				$("#aboutus_text_img").load(function (){
					setTimeout(function (){
						var liHeight = $('.aboutus_text_box').find("img.aboutus_text").height()+10;
						if (liHeight < 10) liHeight = 481.41;
						$('.aboutus_text_box').myScroll({
							speed: 1, //数值越大，速度越慢
							rowHeight: liHeight //li的高度
						});
					}, 100);
				});
			}

			//页面逻辑
			var path = $route.current.originalPath;
			switch (path) {
				case '/book':
					break;
				case '/book/bookid/:bookid':
					$scope.bookid = $routeParams.bookid;
					$scope.showBookChapter();
					break;
				case '/chapter/bookid/:bookid/chapterid/:chapterid':
					$scope.bookid = $routeParams.bookid;
					$scope.chapterid = $routeParams.chapterid;
					$scope.getChapterContent();
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