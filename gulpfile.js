var del = require("del");
var gulp = require("gulp");
var merge = require("merge2");
var mocha = require("gulp-mocha");
var runSequence = require("run-sequence");
var sourcemaps = require("gulp-sourcemaps");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");

gulp.task("clean", function () {
    return del([
        "lib/*",
        "src/**/*.d.ts",
        "src/**/*.js",
        "test/**/*.d.ts",
        "test/**/*.js"
    ]);
});

gulp.task("src:tslint", function () {
    return gulp
        .src(["src/**/*.ts", "!src/**/*.d.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("src:tsc", function () {
    var tsProject = ts.createProject("tsconfig.json");
    var tsResult = gulp
        .src(["src/**/*.ts", "!src/**/*.d.ts"])
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("lib")),
        tsResult.dts.pipe(gulp.dest("lib"))
    ]);
});

gulp.task("test:run", function () {
    gulp.src("test/*.js")
        .pipe(mocha());
});

gulp.task("test:tslint", function () {
    return gulp
        .src(["test/**/*.ts", "!test/**/*.d.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("test:tsc", function () {
    var tsProject = ts.createProject("tsconfig.json");
    var tsResult = gulp
        .src(["test/**/*.ts", "!test/**/*.d.ts"])
        .pipe(sourcemaps.init())
        .pipe(tsProject({
            rootDir: "."
        }));

    return merge([
        tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("test")),
        tsResult.dts.pipe(gulp.dest("test"))
    ]);
});

gulp.task("src", function (callback) {
    runSequence(["src:tsc", "src:tslint"], callback);
});

gulp.task("test", function (callback) {
    runSequence(["test:tsc", "test:tslint"], "test:run", callback);
});

gulp.task("watch", ["default"], function () {
    gulp.watch("src/**/*.ts", ["default"]);
});

gulp.task("default", function (callback) {
    runSequence("clean", "src", "test", callback);
});
