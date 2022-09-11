import { Router } from 'express'

import UserController from '../app/controllers/UserController'
import PlanController from '../app/controllers/PlanController'

import authMiddlaware from '../app/middlewares/auth'

import PlanValidation from '../app/validation/Plan'
const routes = new Router()

routes.get('/', authMiddlaware.isAuthenticated, UserController.index) // LIST ALL

routes.use(authMiddlaware.isAdm) // todas as rotas que estiverem abaixo desse midd vai SER chamaDO

routes.patch('/:id/status', UserController.setStatus) // UPADATE ACTIVE
routes.delete('/:id', UserController.delete) // REMOVE

routes.post('/:userId/plans', PlanValidation.store, PlanController.store) // colocar validation
routes.patch('/:userId/plans/:planId/:planSituation/status', PlanController.setStatus) // colocar validation
routes.delete('/:userId/plans/:planId', PlanController.delete)

export default routes
