import { Router } from 'express'

import authMiddlaware from '../app/middlewares/auth'

import testValidation from '../app/validation/Test'

import TestController from '../app/controllers/TestController'

const routes = new Router()

routes.get('/', authMiddlaware.isAuthenticated, TestController.index)

routes.use(authMiddlaware.isAdm)

routes.post('/', testValidation.store, TestController.store)
routes.delete('/:id', TestController.delete)

export default routes
