'use strict';
const r = require('request-promise');
const config = require('./config');


module.exports = (options) => {
  let items = [];
  const startUrl = config.crestUrl + options.path;
  const crestRequest = (o) => {
    console.log(o);
    return r({ uri: o, json: true }).then(result => {
      items = items.concat(result.items);
      if (result.next) {
        return crestRequest(result.next.href);
      }
      return Promise.resolve(items);
    });
  };
  return crestRequest(startUrl);
};
