var marked = require( 'marked' );

var Parser = function( input ) {
    var name = input.dataset.name,
        output = document.querySelector( '[data-type="output"][data-name="' + name + '"]' ),
        style = window.getComputedStyle( input, null ),
        heightOffset = parseFloat( style.paddingTop ) + parseFloat( style.paddingBottom );

    var markdownify = function() {
        output.innerHTML = marked( input.value );
    };

    var resize = function() {
        input.style.height = 'auto';

        var toHeight = input.scrollHeight - heightOffset;
        input.style.height = toHeight + 'px';
    };

    if( !( this instanceof Parser ) ) {
        markdownify();
        return new Parser( input );
    }

    this.init = function() {
        input.addEventListener( 'keydown', markdownify );
        input.addEventListener( 'keyup', markdownify );
        input.addEventListener( 'input', resize );
        input.addEventListener( 'keyup', resize );

        resize();
    };

    this.init();
};

document.addEventListener( 'DOMContentLoaded', function( event ) {
    Array.prototype.forEach.call( document.querySelectorAll( 'textarea' ), Parser );
} );

module.exports = {};
