var marked = require( 'marked' );

var Parser = function( input ) {
    var name = input.dataset.name,
        output = document.querySelector( '[data-type="output"][data-name="' + name + '"]' );

    var markdownify = function() {
        output.innerHTML = marked( input.value );
    };

    if( !( this instanceof Parser ) ) {
        markdownify();
        return new Parser( input );
    }

    this.init = function() {
        input.addEventListener( 'keydown', markdownify );
        input.addEventListener( 'keyup', markdownify );
    };

    this.init();
};

document.addEventListener( 'DOMContentLoaded', function( event ) {
    Array.prototype.forEach.call( document.querySelectorAll( 'textarea' ), Parser );
} );

module.exports = {};
