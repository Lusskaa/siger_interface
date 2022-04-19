'use strick'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('plans', 'machines_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'machines', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('plans', 'machines_id')
  },
}
