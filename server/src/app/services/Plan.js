/* eslint-disable camelcase */
import { v4 } from 'uuid'
import Plan from '../entities/models/Plan'
import User from '../entities/models/User'
import InvalidException from '../utils/InvalidException'

class PlanService {
  async store (planData) {
    const { date, tests_id, machines_id, users_id } = planData

    const plan = await Plan.findOne({
      where: { date, tests_id, machines_id }
    })
    if (plan) {
      throw new InvalidException(
        `Este teste já está programado nesta máquina para o dia ${date}`
      )
    }
    const user = await User.findOne({
      where: { id: users_id },
      attributes: ['isActive', 'name']
    })
    if (user && !user.isActive) {
      throw new InvalidException(`O usuário ${user.name} não está ativo`)
    }

    return {
      id: v4(),
      date,
      tests_id,
      machines_id,
      users_id
    }
  }

  async update (request, response) {}

  async delete (request, response) {}
}
export default new PlanService()
