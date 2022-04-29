import Plan from '../entities/models/Plan'

const insertOwnUser = (request, response, next) => {
  request.body = request.body.map((plan) => ({
    ...plan,
    users_id: request.user.id,
  }))
  next()
}

const verifyOwnPlan = async (request, response, next) => {
  const plan = await Plan.findOne({ where: { id: request.params.planId } })

  if (!plan || plan.users_id !== request.user.id) {
    return response
      .status(403)
      .json({ error: 'Você não tem permissão para acessar este conteúdo' })
  }

  next()
}

export default {
  insertOwnUser,
  verifyOwnPlan,
}
