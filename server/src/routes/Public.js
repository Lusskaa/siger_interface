import { Router } from 'express'

import SessionController from '../app/controllers/SessionController'
import UserController from '../app/controllers/UserController'

import SessionValidation from '../app/validation/Session'
import UserValidation from '../app/validation/User'

const routes = new Router()

routes.post('/users', UserValidation.store, UserController.store) // CREATE
routes.post('/sessions', SessionValidation.login, SessionController.login) // LOGIN

export default routes
