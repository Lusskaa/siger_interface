'use strict'

const situationTypeEnum = require('../../app/entities/enum/SituationType')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('plans', 'situation', {
      type: Sequelize.ENUM(situationTypeEnum),
      allowNull: true
    })
    /* // pode-se usar para debugar as queries do sequelize q ta dando pau mas nao mostra o erro na console
    // .catch((err) => {
    //   console.log('AAA: ', err)
    // }) */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('plans', 'situation')
    await queryInterface.sequelize.query('drop type enum_plans_situation;')
  }
}
