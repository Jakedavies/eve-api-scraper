const c = require('./../crest');
const db = require('./../db');
const Promise = require('bluebird');

function processRegion(region) {
  const regionId = region.id;
  console.log('Processing region ' + region.name);
  const endpoint = `/market/${regionId}/orders/all/`;
  return c({ path: endpoint }).then(orders => {
    return Promise.map(orders, order => db.upsertOrder(order), { concurrency: 10 })
    .then(() => db.end())
    .then(() => orders);
  });
}

module.exports.run = () => {
  return db.getRegions()
  .then(regionsResultSet => {
    return Promise.map(regionsResultSet, processRegion, { concurrency: 5 });
  });
};
