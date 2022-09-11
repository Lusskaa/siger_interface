'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('plans', {
      id: {
        defaulValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaulValue: new Date()
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaulValue: new Date()
      }
    })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('plans')
    await queryInterface.sequelize.query('drop type enum_plans_situation;')
  }
}
