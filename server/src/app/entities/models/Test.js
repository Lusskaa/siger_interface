import Sequelize, { Model, DataTypes } from 'sequelize'

import TestType from '../enum/TestType'
import MachineType from '../enum/MachineType'

class Test extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: DataTypes.ENUM(TestType),
        recommendedFrequency: Sequelize.STRING,
        recommendedMachineType: Sequelize.ENUM(MachineType),
        description: Sequelize.STRING,
        tolerance: Sequelize.STRING
      },
      {
        sequelize
      }
    )
    return this
  }
}
export default Test
