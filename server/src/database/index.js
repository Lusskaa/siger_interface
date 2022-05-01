import Sequelize from 'sequelize'
/* import mongoose from 'mongoose' */

import User from '../app/entities/models/User'
import Machine from '../app/entities/models/Machine'
import Test from '../app/entities/models/Test'
import Plan from '../app/entities/models/Plan'
import configDatabase from '../config/database'

const models = [User, Machine, Test, Plan]
class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

  sequelize () {
    return this.connection
  }
}
export default new Database()
