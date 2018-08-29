const helper = require('./helper.js');
const chalk = require('chalk');

const Licence = require('../../models/Picture_Licence');
const Tag = require('../../models/Picture_Tag');

exports.wipeCollection = (req, res) => {
  helper.log(chalk.red("WIPING COLLECTION: ") + chalk.green("Licence") + " with " + Licence.count.length + " entries");
  Licence.collection.drop();

  helper.log(chalk.red("WIPING COLLECTION: ") + chalk.green("Tag") + " with " + Tag.count.length + " entries");
  Tag.collection.drop();
}

exports.importLicencesFromJSON = (req, res) => {
  let fs = require('fs');
  let array = JSON.parse(fs.readFileSync(process.env.LICENCE_FILE, 'utf8'));

  helper.log("Importing " + array.length + " entries from " + process.env.LICENCE_FILE);

  array.forEach((json) => {
    const licence = new Licence({
      name: json.name,
      short: json.short,
      description: json.description,
      url: json.url
    });
    //save created object
    licence.save((error) => {
      if (error) helper.log("importLicencesFromJSON: " + error);
    });
  });
};

exports.importTagsFromJSON = (req, res) => {
  let fs = require('fs');
  let array = JSON.parse(fs.readFileSync(process.env.TAGS_FILE, 'utf8'));

  helper.log("Importing " + array.length + " entries from " + process.env.TAGS_FILE);

  array.forEach((json) => {
    const tag = new Tag({
      name: json.name,
      altNames: json.altNames,
      pictures: [],
      //TODO: resolve picture ids?
    });
    //save created object
    tag.save((error) => {
      if (error) helper.log("importTagsFromJSON: " + error);
    });
  });
};
