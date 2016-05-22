var gulp = require('gulp');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');

gulp.task('serve', function() {
    gulp.src('app')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            port: 9090
        }));
});

gulp.task('lint', function() {
    return gulp.src('./lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('html-lint', function () {
    var options = {
        customattrs: ['*'],
        customtags: ['*'],
        emitError: true,
        reportFn:function(fileFailures){
            for (var i = 0; i < fileFailures.length; i++) {
                var fileResult = fileFailures[i];
                gutil.log(fileResult.filepath);
                for (var j = 0; j < fileResult.errors.length; j++) {
                    var err = fileResult.errors[j];
                    if (err.line !== undefined) {
                        gutil.log('[line' +err.line +', col: ' + err.col +'] ' +err.msg);
                    } else {
                        gutil.log(err.msg);
                    }
                }
            }
        }
    };
});

gulp.task('default', ['lint', 'html-lint', 'serve']);

var watcher = gulp.watch(['app/js/*.js', 'app/css/*.css'], function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});