/* eslint-disable import/first */
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import Machines from './routes/Machines'
import Plans from './routes/Plans'
import Tests from './routes/Tests'
import Users from './routes/Users'
import Public from './routes/Public'

import cors from 'cors'

import './database'

class App {
  constructor () {
    this.app = express()
    this.app.use(cors())

    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.app.use(express.json())
  }

  routes () {
    this.app.use(Public)
    this.app.use('/machines', Machines)
    this.app.use('/plans', Plans)
    this.app.use('/tests', Tests)
    this.app.use('/users', Users)
  }
}

export default new App().app
