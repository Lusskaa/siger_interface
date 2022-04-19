import { Router } from 'express'

import MachineController from '../app/controllers/MachineController'

import authMiddlaware from '../app/middlewares/auth'
import machineValidation from '../app/validation/Machine'

const routes = new Router()

routes.get('/', authMiddlaware.isAuthenticated, MachineController.index)

routes.use(authMiddlaware.isAdm)
routes.post('/', machineValidation.store, MachineController.store)
routes.delete('/:id', MachineController.delete)

export default routes
