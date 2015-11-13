var 	gulp = require('gulp'),
		mainBowerFiles = require('main-bower-files'),
		del = require('del'),
		browserSync = require('browser-sync').create(),
		browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer'),
		$ = require('gulp-load-plugins')();

gulp.task('sass', function() {
	return 	gulp.src(["../_assets/styles/*.sass", "../_assets/styles/*.scss"])
			.pipe($.sourcemaps.init())
			.pipe($.sass())
			.pipe($.autoprefixer({
				browsers: ['> 1%', 'last 15 versions', 'Firefox ESR', 'Opera 12.1', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 4'],
				remove: true
			}))
			.pipe($.cssnano({zindex: false}))
			.pipe($.sourcemaps.write("../_sourcemaps"))
			.pipe(gulp.dest("../_site/css/"))
			.pipe(browserSync.stream({match: '**/*.css'}))
			.pipe($.notify("Browser reloaded"));
});

gulp.task('jade', function() {
	return 	gulp.src('../_assets/views/*.jade')
			.pipe($.jade())
			.pipe(browserSync.stream({match: '**/*.html'}))
			.pipe(gulp.dest('../_site'));
});

gulp.task('clean:sourcemaps', function() {
	del('../_site/_sourcemaps/*.map', {force: true});
});

gulp.task('clean:js', function() {
	del('../_site/js/*.js', {force: true});
});

gulp.task('clean:libs', function() {
	del('../_site/js/lib/*.js', {force: true});
});

gulp.task('clean:dependencies', function() {
	del('../_assets/scripts/bower/*.js', {force: true});
});

gulp.task('clean:css', function() {
	del('../_site/css/*.css', {force: true});
});

gulp.task('clean', ['clean:sourcemaps', 'clean:libs', 'clean:dependencies', 'clean:js', 'clean:css']);

gulp.task('javascript', function() {
	return 	browserify('../_assets/scripts/app.js')
			.bundle()
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe($.sourcemaps.init())
			.pipe($.plumber())
			.pipe($.addSrc('../_assets/scripts/lib/*.js'))
			.pipe($.uglify())
			.pipe($.concat('app.js'))
			.pipe($.plumber.stop())
			.pipe($.sourcemaps.write("../_sourcemaps"))
			.pipe(gulp.dest('../_site/js'))
			.pipe(browserSync.stream({match: '**/*.js'}));
			//.pipe($.notify("Browser reloaded"));
});

gulp.task('server:start', function() {
	browserSync.init({
		server: {
			baseDir: '../_site/'
		}
	});
});

gulp.task('watch', ['server:start'], function() {
	gulp.watch(["../_assets/styles/**/*.sass", "../_assets/styles/**/*.scss"], ['sass']);
	gulp.watch("../_assets/scripts/*.js", ['javascript']);
	gulp.watch('../_assets/views/*.jade', ['jade']);
});

gulp.task('default', [
	'sass',
	'jade',
	'javascript',
	'watch'
]);
