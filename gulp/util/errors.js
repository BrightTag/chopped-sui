'use strict';

var notify = require('gulp-notify');

function handleErrors( error ){

  var args = Array.prototype.slice.call( arguments ),
      config = {
        title: ' Compile Error! ',
        message: '\n\n ✗ <%= error.message %> \n'
      };

  notify
    .onError( config )
    .apply( this, args );

  // Prevent gulp from hanging
  this.emit( 'end' );

}

module.exports = handleErrors;
