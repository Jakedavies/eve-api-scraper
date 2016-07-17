CREATE TABLE types(
  internal_id SERIAL PRIMARY KEY,
  id integer unique,
  name varchar(255),
  href varchar(255)
);
CREATE TABLE regions(
  internal_id SERIAL PRIMARY KEY,
  id integer unique,
  name varchar(255),
  href varchar(255)
);
CREATE TABLE regions(
  internal_id SERIAL PRIMARY KEY,
  id integer unique,
  name varchar(255),
  href varchar(255)
);
CREATE TYPE sell_buy AS ENUM ('BUY', 'SELL');
CREATE TABLE orders(
  internal_id BIGSERIAL PRIMARY KEY,
  id bigint unique,
  sell_buy sell_buy,
  price bigint,
  issued integer,
  duration integer,
  min_volume bigint,
  volume_entered bigint,
  range varchar(255),
  type_id integer references types(id),
  region_id integer references regions(id),
  station_id bigint
);

CREATE TABLE stations(
  internal_id SERIAL PRIMARY KEY,
  id integer unique,
  name varchar(255),
  security boolean,
  x bigint,
  y bigint,
  z bigint,
  solar_system_id integer,
  region_id integer references regions(id)
);