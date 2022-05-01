import Sequelize, { Model } from 'sequelize'

class Plan extends Model {
  static init (sequelize) {
    super.init(
      {
        date: Sequelize.DATEONLY,
        status: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    )
    return this
  }

  static associate (models) {
    this.belongsTo(models.Test, {
      foreignKey: 'tests_id',
      as: 'tests'
    })
    this.belongsTo(models.Machine, {
      foreignKey: 'machines_id',
      as: 'machines'
    })
    this.belongsTo(models.User, {
      foreignKey: 'users_id',
      as: 'users'
    })
  }
}
export default Plan
