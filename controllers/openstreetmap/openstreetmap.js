const request = require('request');
//const tom = require('public/js/osm/tom');
const path = require('path');


exports.getOpenstreetMaps = (req, res) => {
  // res.render('openstreetmap/osm');
  res.sendfile(path.resolve('views/openstreetmap/opensteetmap.html'));
};
