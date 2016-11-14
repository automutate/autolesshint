const del = require("del");
const gulp = require("gulp");
const merge = require("merge2");
const runSequence = require("run-sequence");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");

gulp.task("clean", () => {
    return del([
        "lib/*",
        "src/**/*.js"
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
    const tsResult = tsProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("lib")),
        tsResult.dts.pipe(gulp.dest("lib"))
    ]);
});

gulp.task("src", callback => {
    runSequence(["src:tsc", "src:tslint"], callback);
});

gulp.task("watch", ["default"], () => {
    gulp.watch("src/**/*.ts", ["default"]);
});

gulp.task("default", callback => {
    runSequence("clean", "src", callback);
});
