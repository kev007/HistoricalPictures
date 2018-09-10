const request = require('request');

exports.getOpenstreetMaps = (req, res) => {
  res.sendfile("../views/openstreetmap/opensteetmap.html");
};
