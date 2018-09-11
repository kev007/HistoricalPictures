const Picture_Tag = require('../../models/Picture_Tag');
const Building_Tag = require('../../models/Building_Tag');
const Picture = require('../../models/Picture');
const fs = require( 'fs' );
const path = require('path');

exports.getGalleryPictureView = (req, res, next) => {

  let pictureFromPath = "uploads";

  let paths = [];
  // Loop through all the files in the temp directory
  fs.readdir( pictureFromPath, function( err, files ) {
    if( err ) {
      console.error( "Could not list the directory.", err );
      process.exit( 1 );
    }
    files.forEach( function( file, index ) {
      // Make one pass and make the file complete
      let fromPath = path.join( pictureFromPath, file );

      fs.stat( fromPath, function( error, stat ) {
        if (error) {
          console.error("Error stating file.", error);
          return;
        }
        if (stat.isFile()) {

          paths.push(fromPath.toString());

        } else if( stat.isDirectory() ) {
          console.log( "'%s' is a directory.", fromPath );
        }
      } );
    } );
  } );

  console.log(paths);

  res.render('gallery', { imgs: paths, layout:false});

}
