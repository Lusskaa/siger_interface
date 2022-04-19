'use strict'

const testTypeEnum = require('../../app/entities/enum/TestType')
const machineTypeEnum = require('../../app/entities/enum/MachineType')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tests', {
      id: {
        defaulValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM(testTypeEnum),
        allowNull: false,
      },
      recommended_frequency: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      recommended_machine_type: {
        type: Sequelize.ENUM(machineTypeEnum),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tolerance: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaulValue: new Date(),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaulValue: new Date(),
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tests')
    await queryInterface.sequelize.query('drop type enum_tests_type;')
    await queryInterface.sequelize.query(
      'drop type enum_tests_recommended_machine_type;'
    )
  },
}
