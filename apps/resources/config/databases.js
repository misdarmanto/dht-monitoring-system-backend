module.exports = {
  development: {
    username: 'root',
    password: 'toor',
    database: 'dht_sensor_db',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'dht_sensor_db',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'dht_sensor_db',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
}
