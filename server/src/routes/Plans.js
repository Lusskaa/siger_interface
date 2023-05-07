import { Router } from 'express'

import PlanValidation from '../app/validation/Plan'

import authMiddlaware from '../app/middlewares/auth'
import PlanMiddlaware from '../app/middlewares/Plan'

import PlanController from '../app/controllers/PlanController'

const routes = new Router()

routes.use(authMiddlaware.isAuthenticated) // todas as rotas que estiverem abaixo desse midd vai SER chamaDO

routes.get('/', PlanController.index)

routes.post(
  '/',
  PlanValidation.store,
  PlanMiddlaware.insertOwnUser,
  PlanController.store
)
routes.patch(
  '/:planId/:planSituation/:planResults/status',
  PlanMiddlaware.verifyOwnPlan,
  PlanController.setStatus
)
routes.delete('/:planId', PlanMiddlaware.verifyOwnPlan, PlanController.delete)

routes.delete('/', authMiddlaware.isAdm, PlanController.deleteMany)

export default routes
