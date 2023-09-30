/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { ZygoteModel } = require('../zygote')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dht_sensor', {
      ...ZygoteModel,
      dht_sensor_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dht_sensor_temperature: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      dht_sensor_humidity: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dht_sensor')
  }
}
