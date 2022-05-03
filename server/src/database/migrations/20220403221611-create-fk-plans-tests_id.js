'use strick'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('plans', 'tests_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'tests', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('plans', 'tests_id')
  }
}
