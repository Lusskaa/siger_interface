'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'is_active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'is_active')
  }
}
