const del = require("del");
const gulp = require("gulp");
const merge = require("merge2");
const mocha = require("gulp-mocha");
const runSequence = require("run-sequence");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");

gulp.task("clean", () => {
    return del([
        "lib/*",
        "src/**/*.d.ts",
        "src/**/*.js",
        "test/**/*.d.ts",
        "test/**/*.js"
    ]);
});

gulp.task("src:tslint", () => {
    return gulp
        .src(["src/**/*.ts", "!src/**/*.d.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("src:tsc", () => {
    const tsProject = ts.createProject("tsconfig.json");
    const tsResult = gulp
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

gulp.task("test:run", () => {
    gulp.src("test/*.js")
        .pipe(mocha());
});

gulp.task("test:tslint", () => {
    return gulp
        .src(["test/**/*.ts", "!test/**/*.d.ts"])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("test:tsc", () => {
    const tsProject = ts.createProject("tsconfig.json");
    const tsResult = gulp
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

gulp.task("src", callback => {
    runSequence(["src:tsc", "src:tslint"], callback);
});

gulp.task("test", callback => {
    runSequence(["test:tsc", "test:tslint"], "test:run", callback);
});

gulp.task("watch", ["default"], () => {
    gulp.watch("src/**/*.ts", ["default"]);
});

gulp.task("default", callback => {
    runSequence("clean", "src", "test", callback);
});
