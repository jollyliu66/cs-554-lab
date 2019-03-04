var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
//const pngquant = require('imagemin-pngquant');
const pump     = require('pump');
//const uglify = require('gulp-uglify');
const concat = require('gulp-concat');




//compile sass into css & auto-inject into browsers
gulp.task('sass',async()=>{
    gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
     
})

// move the javascript files into our/src/js folder
gulp.task('js:vendor',async()=>{
    gulp.src(['node_modules/jquery/dist/jquery.min.js','src/js/tota11y.min.js' ,'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'])
    .pipe(concat("vendor.min.js"))
    .pipe(gulp.dest("public/js"))
    //.pipe(gulp.browserSync.stream());
     
})

//optimize images



// static server + watching scss/html files
gulp.task('serve',gulp.series('sass'),async()=>{
    browserSync.init({
        server:"./src"
        
    });
    //gulp.watch('src/scss/*.scss').on('change',browserSync.reload);
    //gulp.watch("src/*.html").on('change',browserSync.reload);
  
})

gulp.task('copyHtml', async()=> { 
    gulp.src('src/*.html')
   .pipe(gulp.dest('public'));
});

/*gulp.task('imageMin', async()=> { 
    pump([
        gulp.src('src/image/*.{png,jpg,gif,ico}'),
        //.pipe(imagemin({ progressive: true }))
        imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            //svgoPlugins: [{removeViewBox: false}],
            multipass: true,
            
        }),// run imagemin function
        gulp.dest('public/image') // pipe to dist/images
    ]); 
});*/

gulp.task('imageMin', async() =>{
    gulp.src('src/image/*')
    .pipe(imagemin({
        verbose: true
    }))
    .pipe(gulp.dest('public/image'))

});

gulp.task('default',gulp.parallel('js:vendor','imageMin','serve','sass','copyHtml'),function(done){
    done();

})

/*gulp.task('watch',function(){
    gulp.watch('src/*.html',gulp.series('copyHtml'));
    gulp.watch('src/images/*',gulp.series('imageMin'));
    //gulp.watch('src/js/*.js',gulp.series('minify'));
    gulp.watch('src/sass/*.scss',gulp.series('sass'));
    //gulp.watch('src/js/*.js',gulp.series('js'));
    //gulp.watch('src/sass/*.scss',gulp.series('serve'));
    
})*/

