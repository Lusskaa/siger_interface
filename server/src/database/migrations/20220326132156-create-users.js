'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        defaulValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
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
  // toda vez que executar o programa ele vai para este up
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  async down(queryInterface) {
    await queryInterface.dropTable('users')
  }
}

/**

'use strick'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('plan', 'users_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'

    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('plan', 'users_id')
  }
}

     */
