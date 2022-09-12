import Sequelize, { Model } from 'sequelize'
import MachineType from '../enum/MachineType'
class Machine extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: Sequelize.ENUM(MachineType)
      },
      {
        sequelize
      }
    )
    return this
  }
}
export default Machine
