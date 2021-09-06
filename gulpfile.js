const { src, dest, parallel, series, watch } = require('gulp');

// Подключаем модули gulp-sass и gulp-less
const scss = require('gulp-sass')(require('sass'));

// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

const imagemin = require('gulp-image');

function styles() {
    return src('app/scss/**/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions']})) // Создадим префиксы с помощью Autoprefixer
        .pipe(cleancss( { level: { 1: { specialComments: 0 } } } )) // Минифицируем стили
        .pipe(dest('app/css/')) // Выгрузим результат в папку "app/css/"
}

function startwatch() {
    // Мониторим файлы препроцессора на изменения
    watch('app/scss/**/*.scss', styles);
}


function images() {
    return src('app/imgs/src/**/*')
        .pipe(imagemin())
        .pipe(dest('app/imgs/'))

    }
// Экспортируем функции в таски
exports.styles = styles;
exports.images = images;
exports.watch = startwatch;