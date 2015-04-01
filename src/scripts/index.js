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

        var toHeight = document.getElementById('output').scrollHeight + heightOffset;
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

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos (input, pos) {
    console.log('moving caret');
    setSelectionRange(input, pos, pos);
}

document.addEventListener( 'DOMContentLoaded', function( event ) {
    var input = document.getElementById('input');
    Parser(input);
    setCaretToPos(input, 19);

} );

module.exports = {};
