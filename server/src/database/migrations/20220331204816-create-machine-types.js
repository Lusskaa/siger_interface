'use strict'

const machineTypeEnum = require('../../app/entities/enum/MachineType')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('machines', 'type', {
      type: Sequelize.ENUM(machineTypeEnum),
      allowNull: false
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('machines', 'type')
  }
}
