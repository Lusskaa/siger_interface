'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeConstraint('plans', 'plans_users_id_fkey', {
        transaction
      })
      await queryInterface.addConstraint('plans', {
        type: 'foreign key',
        name: 'plans_users_id_fkey',
        fields: ['users_id'],
        references: {
          table: 'users',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        transaction
      })

      return transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeConstraint('plans', 'plans_users_id_fkey', {
        transaction
      })
      await queryInterface.addConstraint('plans', {
        type: 'foreign key',
        name: 'plans_users_id_fkey',
        fields: ['users_id'],
        references: {
          table: 'users',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        transaction
      })

      return transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
