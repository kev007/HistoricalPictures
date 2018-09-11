const thumb = require('node-thumbnail').thumb;
const fs = require( 'fs' );
const path = require('path');

let thumbFromPath = "uploads";
let thumbToPath = "uploads/thumbs";
let reviewsToPath = "uploads/previews";

// defaults = {
//   prefix: '',
//   suffix: '_thumb',
//   digest: false,
//   hashingType: 'sha1', // 'sha1', 'md5', 'sha256', 'sha512'
//   width: 800,
//   concurrency: <num of cpus>,
//   quiet: false, // if set to 'true', console.log status messages will be supressed
//   overwrite: false,
//   skip: false, // Skip generation of existing thumbnails
//   basename: undefined, // basename of the thumbnail. If unset, the name of the source file is used as basename.
//   ignore: false, // Ignore unsupported files in "dest"
//   logger: function(message) {
//     console.log(message);
//   }
// };

exports.createThumbs = (req,res) => {
// Loop through all the files in the temp directory
  fs.readdir( thumbFromPath, function( err, files ) {
    if( err ) {
      console.error( "Could not list the directory.", err );
      process.exit( 1 );
    }
    files.forEach( function( file, index ) {
      // Make one pass and make the file complete
      let fromPath = path.join( thumbFromPath, file );
      let toPath = path.join( thumbToPath, file );

      fs.stat( fromPath, function( error, stat ) {
        if( error ) {
          console.error( "Error stating file.", error );
          return;
        }
        if( stat.isFile() ) {
          // thumb(options, callback);
          thumb({
            source: fromPath, // could be a filename: dest/path/image.jpg
            destination: thumbToPath,
            concurrency: 4,
            skip: true,
            basename: undefined,
            suffix: ''
          }).then(function() {
            console.log('Success thumbs');
          }).catch(function(e) {
            console.log('Error', e.toString());
          });
          console.log( "'%s' is a file.", fromPath );
        } else if( stat.isDirectory() ) {
          console.log( "'%s' is a directory.", fromPath );
        }
      } );
    } );
  } );
}

exports.createPreviews = (req, res) => {
  // Loop through all the files in the temp directory
  fs.readdir( thumbFromPath, function( err, files ) {
    if( err ) {
      console.error( "Could not list the directory.", err );
      process.exit( 1 );
    }
    files.forEach( function( file, index ) {
      // Make one pass and make the file complete
      let fromPath = path.join( thumbFromPath, file );
      let toPath = path.join( thumbToPath, file );

      fs.stat( fromPath, function( error, stat ) {
        if( error ) {
          console.error( "Error stating file.", error );
          return;
        }
        if( stat.isFile() ) {
          thumb({
            source: fromPath, // could be a filename: dest/path/image.jpg
            destination: reviewsToPath,
            concurrency: 4,
            skip: true,
            basename: undefined,
            suffix: ''
          }).then(function() {
            console.log('Success reviews');
          }).catch(function(e) {
            console.log('Error', e.toString());
          });

          console.log( "'%s' is a file.", fromPath );
        } else if( stat.isDirectory() ) {
          console.log( "'%s' is a directory.", fromPath );
        }
      } );
    } );
  } );
}
