requirejs.config({
	//lib基础路径
	baseUrl: "Mobile/js",
	//加载超时时间
	waitSeconds: 30,
	//包名-路径
	paths: {
		"app": "app",
		"jquery": "../assets/jquery/jquery-2.1.4.min",
		"angular": "../assets/angular-1.4.2/angular.min",
		"angular-route": "../assets/angular-1.4.2/angular-route.min",
		"angular-sanitize": "../assets/angular-1.4.2/angular-sanitize.min",
		"commoncontroller": "controller/common.controller",
		"bookcontroller": "controller/book.controller",
		"bookservice": "service/book.service"
	},
	//包依赖
	shim: {
		"angular": {
			exports: "angular"
		},
		"angular-route": {
			deps: ["angular"],
			exports: "angular-route"
		},
		"angular-sanitize": {
			deps: ["angular"],
			exports: "angular-sanitize"
		}
	}
	//不缓存js
	// urlArgs: "bust=" +  (new Date()).getTime()
});