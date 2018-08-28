const helper = require('./helper.js');
const chalk = require('chalk');

const Licence = require('../../models/Picture_Licence');

exports.importLicencesFromJSON = (req, res) => {
  let fs = require('fs');
  let array = JSON.parse(fs.readFileSync(process.env.LICENCE_FILE, 'utf8'));

  if (array.length > 0) {
    helper.log(chalk.red("WIPING COLLECTION: ") + chalk.green("Licence") + " with " + Licence.count.length + " entries");
    Licence.collection.drop();
  }

  helper.log("Importing " + array.length + " entries from " + process.env.LICENCE_FILE);

  array.forEach((json) => {
    const licence = new Licence({
      name: json.name,
      description: json.description,
      url: json.url
    });
    //save created object
    licence.save((error) => {
      if (error) helper.log("importLicencesFromJSON: " + error);
    });
  });
};
