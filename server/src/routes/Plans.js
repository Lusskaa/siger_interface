import { Router } from 'express'

import PlanValidation from '../app/validation/Plan'
import authMiddlaware from '../app/middlewares/auth'
import PlanMiddlaware from '../app/middlewares/Plan'

import PlanController from '../app/controllers/PlanController'
const routes = new Router()

routes.use(authMiddlaware.isAuthenticated) // todas as rotas que estiverem abaixo desse midd vai SER chamaDO

routes.get('/', PlanController.index)

routes.post('/', PlanValidation.store, PlanMiddlaware.insertOwnUser, PlanController.store)
routes.put('/', PlanValidation.update, PlanController.update)
routes.delete('/', PlanValidation.destroy, PlanController.delete) // vários ids dentro do body usuário vai fazer dele mesmo

export default routes
