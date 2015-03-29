module.exports = function( gulp, plugins ) {
    gulp.task( 'favicon', function() {
        return gulp.src( [ 'src/favicons/**' ] )
            .pipe( plugins.newer( 'build' ) )
            .pipe( gulp.dest( 'build' ) );
    } );
};
