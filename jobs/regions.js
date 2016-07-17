const endpoint = '/regions/';
const c = require('./../crest');
const db = require('./../db');
const Promise = require('bluebird');

module.exports.run = () => {
  return c({ path: endpoint }).then(regions => {
    return Promise.map(regions, region => db.upsertRegion(region))
    .then(() => db.end())
    .then(() => regions);
  });
};
