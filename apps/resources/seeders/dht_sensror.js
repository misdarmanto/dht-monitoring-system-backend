/* eslint-disable @typescript-eslint/space-before-function-paren */
'use strict'
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('dht_sensor', [
      {
        dht_sensor_id: '424323423423erwerewr23423rewr',
        dht_sensor_temperature: 12,
        dht_sensor_humidity: 54
      },
      {
        dht_sensor_id: 'ewrewrewrew3erwerewweqrewr',
        dht_sensor_temperature: 13,
        dht_sensor_humidity: 45
      },
      {
        dht_sensor_id: '424sdsed-ty23erwe-rewr23423rewr',
        dht_sensor_temperature: 12,
        dht_sensor_humidity: 43
      },
      {
        dht_sensor_id: '424see23erwe-rewr23423rewr',
        dht_sensor_temperature: 12,
        dht_sensor_humidity: 355
      },
      {
        dht_sensor_id: '424sdsed-ty23erwe-rewr23423rewr',
        dht_sensor_temperature: 12,
        dht_sensor_humidity: 33
      },
      {
        dht_sensor_id: '424sdsed-ty23erwe-rewr23423rewr',
        dht_sensor_temperature: 132,
        dht_sensor_humidity: 44
      },
      {
        dht_sensor_id: '424sdsed-ty23erwe-rewr23423rewr',
        dht_sensor_temperature: 13,
        dht_sensor_humidity: 33
      },
      {
        dht_sensor_id: '424sdsed-ty23erwe-rewr23423rewr',
        dht_sensor_temperature: 5,
        dht_sensor_humidity: 33
      },
      {
        dht_sensor_id: '424sdsed-ty23erwe-rewr23423rewr',
        dht_sensor_temperature: 77,
        dht_sensor_humidity: 88
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dht_sensor', null, {})
  }
}
