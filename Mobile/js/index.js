//index.js
requirejs(['./config'], function (){
	requirejs(["app", "indexcontroller"], function (){
		//文档加载完成 启动angular.module-WebApp
	    angular.element(document).ready(function() {
	        angular.bootstrap(document, ['WebApp']);
	    });
	});
});