const cache = require('./cache');
console.log(cache);
const args = require('minimist')(process.argv.slice(2));
const moment = require('moment');
if (args.help) {
  console.log('Specify a resource using --resource RESOURCE_TYPE where RESOURCE_TYPE is one of orders, regions, types');
  process.exit(0);
}
if (!args.resource) {
  console.log('You must specifiy a resource');
  process.exit(1);
}
const resource = args.resource;

if (moment(cache[resource].expires).valueOf() > moment().valueOf()) {
  console.log('Cache has not expired on that resource');
  process.exit(0);
}

const start = Date.now();
require('./jobs/' + resource).run().then(() => {
  console.log(`Took ${(Date.now() - start) / 1000} to execute`);
});
