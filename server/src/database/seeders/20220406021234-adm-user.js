'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: '2b19094e-8ca1-4d71-9d6e-ce07b94b0881',
          name: 'Lucas Martins',
          email: 'lucasmartinsunb@gmail.com',
          password:
            '$2b$10$PUz0Xe8DzxvZkJIGN.yRQuDldQq8XmTmNkuei1koOlDKJXYLMyepu',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
