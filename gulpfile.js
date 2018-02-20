var del = require("del");
var gulp = require("gulp");
var merge = require("merge2");
var mocha = require("gulp-mocha");
var runSequence = require("run-sequence");
var sourcemaps = require("gulp-sourcemaps");

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
    var gulpTslint = require("gulp-tslint");
    var tslint = require("tslint");

    var program = tslint.Linter.createProgram("./tsconfig.json");

    return gulp
        .src("src/**/*.ts")
        .pipe(gulpTslint({
            formatter: "stylish",
            program
        }))
        .pipe(gulpTslint.report());
});

gulp.task("src:tsc", function () {
    var ts = require("gulp-typescript");

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

gulp.task("test:tsc", function () {
    var ts = require("gulp-typescript");

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
    runSequence(["test:tsc"], "test:run", callback);
});

gulp.task("watch", ["src"], function () {
    return gulp.watch("src/**/*.ts", ["src"]);
});

gulp.task("default", function (callback) {
    runSequence("clean", "src", "test", callback);
});
