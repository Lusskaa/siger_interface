import Sequelize, { Model, DataTypes } from 'sequelize'
import MachineType from '../enum/MachineType'
class Machine extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: DataTypes.ENUM(MachineType)
      },
      {
        sequelize
      }
    )
    return this
  }
}
export default Machine
