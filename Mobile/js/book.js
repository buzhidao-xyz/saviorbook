//book.js
requirejs(['./config'], function (){
    requirejs(["bookservice"], function (){
    	requirejs(["app", "bookcontroller"], function (){
    		//文档加载完成 启动angular.module-WebApp
    	    angular.element(document).ready(function() {
    	        angular.bootstrap(document, ['WebApp']);
    	    });
        });
    });
});