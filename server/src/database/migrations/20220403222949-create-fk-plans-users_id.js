'use strick'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('plans', 'users_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('plans', 'users_id')
  }
}
