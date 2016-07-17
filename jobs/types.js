const endpoint = '/inventory/types/';
const c = require('./../crest');
const db = require('./../db');
const Promise = require('bluebird');

module.exports.run = () => {
  return c({ path: endpoint }).then(types => {
    return Promise.map(types, type => db.upsertType(type))
    .then(() => db.end())
    .then(() => types);
  });
};
