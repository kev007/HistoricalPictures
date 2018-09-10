const request = require('request');
//const tom = require('public/js/osm/tom');

exports.getOpenstreetMaps = (req, res) => {
  res.render('openstreetmap/osm');
};
