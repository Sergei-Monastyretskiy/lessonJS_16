// Простий Gulp файл для початківців
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Компіляція SCSS в CSS
function styles() {
    return gulp.src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: [
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'last 2 Safari versions',
                'last 2 Edge versions',
                'last 2 Opera versions',
                '> 1%',
                'not dead'
            ],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
}

// Копіювання JS файлів
function scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
}

// Мінімізація CSS для продакшну
function minifyCSS() {
    return gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: [
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'last 2 Safari versions',
                'last 2 Edge versions',
                'last 2 Opera versions',
                '> 1%',
                'not dead'
            ],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2,
            specialComments: 0
        }))
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
    gulp.watch('src/js/**/*.js', scripts);
    gulp.watch('*.html').on('change', browserSync.reload);
}

// Збірка проекту
const build = gulp.series(gulp.parallel(styles, scripts), minifyCSS);

// Розробка
const dev = gulp.series(gulp.parallel(styles, scripts), serve);

// Експорт
exports.styles = styles;
exports.scripts = scripts;
exports.build = build;
exports.default = dev;