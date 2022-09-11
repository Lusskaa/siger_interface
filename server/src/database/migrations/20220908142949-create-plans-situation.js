'use strict'

const situationTypeEnum = require('../../app/entities/enum/SituationType')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('plans', 'situation', {
      type: Sequelize.ENUM(situationTypeEnum),
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('plans', 'situation')
  }
}
