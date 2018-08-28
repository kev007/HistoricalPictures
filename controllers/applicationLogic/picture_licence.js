const helper = require('./helper.js');

const Picture = require('../../models/Picture');
const Licence = require('../../models/Picture_Licence');
const User = require('../../models/User');


exports.importLicencesFromJSON = (req, res) => {
  helper.log("importing " + process.env.LICENCE_FILE);

  let fs = require('fs');
  let array = JSON.parse(fs.readFileSync(process.env.LICENCE_FILE, 'utf8'));

  let saved = 0;

  array.forEach((json) => {
    const licence = new Licence({
      name: json.name,
      description: json.description,
      url: json.url
    });
    //save created object
    licence.save((error) => {
      helper.log("importLicencesFromJSON: " + error);
    });
  });
};
