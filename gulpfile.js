// $GLOBALS
// --------
var config      = {};
var surf        = require('./package.json');
var colors      = require('colors');
var gulp        = require('gulp');
var connect     = require('gulp-connect');
var sass        = require('gulp-sass');
var jade        = require('gulp-jade');
var include     = require('gulp-include');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');


// $CONFIG
// -------
config.prod = false;

// $Server
config.port = 3636;
config.root = './build';

// $Paths
config.surf = {};
config.surf.output     = 'surf-' + surf.version + '.js';
config.surf.outputMin  = 'surf-' + surf.version + '.min.js';
config.surf.src        = './surf/Surf.js';
config.surf.dest       = config.root + '/dist';
config.surf.watch      = './surf/*js';

config.jade = {};
config.jade.src  = './views/*.jade';
config.jade.dest = config.root;

config.scss = {};
config.scss.src  = './scss/*.scss';
config.scss.dest = config.root + '/css';


// $ERROR HANDLER
// --------------
function errorHandler (err) {
	console.log(err.message.red);
	this.emit('end');
}

// $CONCAT SURF STREAM
// -------------------
function concatSurf (min) {
	var output = min ? config.surf.outputMin : config.surf.output;
	var stream = gulp
		.src(config.surf.src)
		.pipe(include())
		.pipe(rename(output));

	if (min) stream.pipe(uglify());

	return stream
		.pipe(connect.reload())
		.pipe(gulp.dest(config.surf.dest));
}


// $TASKS
// ------

// $Compile Jade
gulp.task('compile:jade', function () {
	var stream = gulp
		.src(config.jade.src)
		.pipe(jade({ pretty: true }).on('error', errorHandler))
		.pipe(connect.reload())
		.pipe(gulp.dest(config.jade.dest));
});

// $Compile SCSS
gulp.task('compile:sass', function () {
	var stream = gulp
		.src(config.scss.src)
		.pipe(
			sass({
				errLogToConsole: true,
				includePaths: require('node-bourbon').with(config.scss.dest)
			})
		)
		.pipe(connect.reload())
		.pipe(gulp.dest(config.scss.dest));
});

// $Concat Surf
gulp.task('concat:surf', function () {
	return concatSurf();
});

// $Concat Surf Min
gulp.task('concat:surf-min', function () {
	return concatSurf(true);
});

// $Init Server
gulp.task('connect', ['compile:sass', 'compile:jade', 'concat:surf', 'concat:surf-min'], function() {
	connect.server({
		livereload: true,
		root: config.root,
		port: config.port
	});
});


// $WATCH
// ------
gulp.task('watch', function () {
	gulp.watch(config.jade.src, ['compile:jade']);
	gulp.watch(config.scss.src, ['compile:sass']);
	gulp.watch(config.surf.watch, ['concat:surf', 'concat:surf-min']);
});


// $DEFAULT TASK
// -------------
gulp.task('default', ['connect', 'watch']);
