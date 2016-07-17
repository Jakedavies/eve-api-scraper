const config = require('./config');
const con = require('pg-promise')();
const db = con(config.db);
const moment = require('moment');

const upsertTypeSql = `
INSERT INTO types (
  id,
  href,
  name
) VALUES (
  $[id],
  $[href],
  $[name]
) ON CONFLICT(id) DO UPDATE SET href=EXCLUDED.href, name=EXCLUDED.name
`;


const upsertType = (type) => {
  return db.none(upsertTypeSql, { id: type.id, href: type.href, name: type.name })
  .catch(err => console.log(err));
};

const upsertRegionSql = `
INSERT INTO regions (
  id,
  href,
  name
) VALUES (
  $[id],
  $[href],
  $[name]
) ON CONFLICT(id) DO UPDATE SET href=EXCLUDED.href, name=EXCLUDED.name
`;


const upsertRegion = (region) => {
  return db.none(upsertRegionSql, { id: region.id, href: region.href, name: region.name })
  .catch(err => console.log(err));
};

const upsertStationSql = `
INSERT INTO stations (
  id,
  name,
  security,
  x,
  y,
  z,
  solar_system_id,
  region_id
) VALUES (
  $[id],
  $[name],
  $[security],
  $[x],
  $[y],
  $[z],
  $[solar_system_id],
  $[region_id]
) ON CONFLICT(id) DO NOTHING
`;


const upsertStation = (station) => {
  const cleanStation = {
    id: station.stationID,
    name: station.stationName,
    security: station.security === 1 ? true : false,
    x: station.x,
    y: station.y,
    z: station.z,
    solar_system_id: station.solarSystemID,
    region_id: station.regionID,
  };
  return db.none(upsertStationSql, cleanStation)
  .catch(err => console.log(err));
};


const upsertOrderSql = `
INSERT INTO orders (
  id,
  sell_buy,
  price,
  issued,
  duration,
  min_volume,
  volume_entered,
  range,
  type_id,
  station_id
) VALUES (
  $[id],
  $[sell_buy],
  $[price],
  $[issued],
  $[duration],
  $[min_volume],
  $[volume_entered],
  $[range],
  $[type_id],
  $[station_id]
) ON CONFLICT(id) DO NOTHING;`;


const upsertOrder = (order) => {
  const cleanOrder = {
    id: order.id,
    sell_buy: order.buy ? 'BUY' : 'SELL',
    price: order.price,
    issued: moment(order.issued).unix(),
    duration: order.duration,
    min_volume: order.minVolume,
    volume_entered: order.volumeEntered,
    range: order.range,
    station_id: order.stationID,
    type_id: order.type,
  };
  return db.none(upsertOrderSql, cleanOrder)
  .catch(err => {
    console.log(cleanOrder);
    console.log(err);
  });
};


const getRegions = () => {
  return db.query('SELECT id, name FROM REGIONS');
};

const end = () => {
  con.end();
};
module.exports = {
  upsertType,
  upsertRegion,
  upsertOrder,
  getRegions,
  upsertStation,
  end,
};
