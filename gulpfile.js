// npm i gulp gulp-stylus autoprefixer-stylus gulp-postcss gulp-pug
var gulp = require('gulp'),
		pug = require('gulp-pug'),
		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer-stylus'),
    stylus = require('gulp-stylus'),
    //sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');


function onError(err) {
		var exec = require('child_process').exec;
		exec('afplay ./error_2.mp3');
		//console.log(err.toString());
		console.log(err);
		this.emit("end");
}


gulp.task('views', function buildHTML() {
  return gulp.src('./app/index.pug')
  .pipe(pug({
    // Your options in here.
    pretty: true
  }))
  .on("error", onError)
	.pipe(gulp.dest('./'));
});



//CSS (stylus)
gulp.task('stylusTask', function() {
	gulp.src('./app/main.styl')
		//.pipe(sourcemaps.init())
		.pipe(stylus({
			use: [autoprefixer()],
			compress: true
		}))
		.on("error", onError)
		//.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./'));
});




// BrowserSync
gulp.task('browserSyncTask', function() {
		browserSync.init(['./index.html', './*.css'], {
				server: {
						baseDir: "./"
				}
		});
});


// WATCH
gulp.task('watchTask', function() {
		gulp.watch('./app/index.pug', ['views']);
		gulp.watch('./app/main.styl', ['stylusTask']);
		//gulp.watch('./app/**/*.styl', ['stylusTask']);
		//gulp.watch('./app/*.js', ['compressJS']);
});


gulp.task('default', ['views', 'stylusTask', 'watchTask', 'browserSyncTask']);