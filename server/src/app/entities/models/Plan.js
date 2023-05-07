import Sequelize, { Model } from 'sequelize'
import SituationType from '../enum/SituationType'

class Plan extends Model {
  static init (sequelize) {
    super.init(
      {
        date: Sequelize.DATEONLY,
        status: Sequelize.BOOLEAN,
        results: Sequelize.STRING,
        situation: Sequelize.ENUM(SituationType)
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
