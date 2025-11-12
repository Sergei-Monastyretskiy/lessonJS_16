// Простий Gulp файл для початківців
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// Компіляція SCSS в CSS
function styles() {
    return gulp.src('src/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
}

// Мінімізація CSS
function minifyCSS() {
    return gulp.src('css/style.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('css'));
}

// Запуск сервера
function serve() {
    browserSync.init({
        server: './',
        port: 3000
    });

    // Відстеження змін
    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('*.html').on('change', browserSync.reload);
}

// Збірка проекту
const build = gulp.series(styles, minifyCSS);

// Розробка
const dev = gulp.series(styles, serve);

// Експорт
exports.styles = styles;
exports.build = build;
exports.default = dev;