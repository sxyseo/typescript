var gulp = require('gulp');
var gulpConnect = require('gulp-connect');

// 启动一个本地调试服务器
gulp.task('server', function () {
	gulpConnect.server({
		root: '',
		port: 8800
	});
});