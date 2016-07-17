const csvtojson = require('csvtojson');
const Promise = require('bluebird');
const fs = require('fs');
const db = require('./db');

const Converter = csvtojson.Converter;
const converter = new Converter({});

converter.on('end_parsed', function (jsonArray) {
  Promise.map(jsonArray, (station) => {
    return db.upsertStation(station);
  }).then(() => {
    return db.end();
  });
});

fs.createReadStream('./stations.csv').pipe(converter);

