var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    gulpTypings = require("gulp-typings"),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    Config = require('./gulpfile.config'),
    tsProject = tsc.createProject('tsconfig.json'),
    browserSync = require('browser-sync'),
    superstatic = require( 'superstatic' );

var config = new Config();

gulp.task("install",function(){
    return gulp.src("./typings.json").pipe(gulpTypings());
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    // compile app .ts files and pipe .js/.map files to dist
    gulp.src([config.source + '*.ts'])
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject))
        .pipe(gulp.dest(config.distJs))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.distJs));

    // copy phaser dist files to dist
    var phaserDist = [
        config.phaserDistPath + 'phaser.min.js',
        config.phaserDistPath + 'phaser.map'];
    gulp.src(phaserDist).pipe(gulp.dest(config.distJs));

    // copy views to dist
    gulp.src([config.source + '*.html']).pipe(gulp.dest(config.dist));

    // copy resources to dist
    gulp.src([config.source + 'sprites/**/*', config.source + 'styles/**/*'], {
        base: 'src'
    }).pipe(gulp.dest('dist'));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function (cb) {
    // delete dist
    del([config.dist], cb);
});

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts']);
});

gulp.task('serve', ['compile-ts', 'watch'], function() {
    process.stdout.write('Starting browserSync and superstatic...\n');
    browserSync({
        port: 3000,
        files: ['index.html', '**/*.js'],
        injectChanges: true,
        logFileChanges: false,
        logLevel: 'silent',
        logPrefix: 'phaserSandbox',
        notify: true,
        reloadDelay: 0,
        server: {
            baseDir: './dist',
            middleware: superstatic({ debug: false})
        }
    });
});

gulp.task('default', ['ts-lint', 'compile-ts']);