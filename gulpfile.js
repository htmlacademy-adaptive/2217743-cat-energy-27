import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import {deleteAsync as del} from 'del';
import htmlmin from 'gulp-htmlmin';
import browser from 'browser-sync';

// Styles

export const styles = async() => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
  autoprefixer(),
  csso()
  ]))
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
  .pipe(browser.stream());
}

//html

const html = async() => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('build'));
  }

// Scripts

const scripts = async() => {
  return gulp.src('source/js/script.js')
  .pipe(gulp.dest('build/js'))
  .pipe(browser.stream());
}

const optimizeImages = async() => {
    return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

const copyImages = async() => {
    return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulp.dest('build/img'))
}

const svg = async() => {
  gulp.src('source/img/**/*.svg')
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));
}

//copy

const copy = async(done) => {
  gulp.src([
  'source/fonts/**/*.{woff2,woff}',
  'source/*.ico',
  ], {
  base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

// Clean

const clean = async() => {
  return del('build');
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
  }

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}


// Build

export const build = gulp.series(
    clean,
    copy,
    optimizeImages,
    gulp.parallel(
      styles,
      html,
      scripts,
      svg
  ),
);

  // Default

export default gulp.series (
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg
  ),
  gulp.series(
    server,
    watcher
));
