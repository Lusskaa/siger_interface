'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('machines', {
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
    await queryInterface.dropTable('machines')
    await queryInterface.sequelize.query('drop type enum_machines_type;')
  },
}
