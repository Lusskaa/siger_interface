/* eslint-disable camelcase */
import Plan from '../entities/models/Plan'
import Test from '../entities/models/Test'
import User from '../entities/models/User'
import Machine from '../entities/models/Machine'

import planService from '../services/Plan'

import db from '../../database'

import { Op } from 'sequelize'

class PlanController {
  async store (request, response) {
    try {
      const transaction = async (transaction) => {
        for (let i = 0; i < request.body.length; i++) {
          const a = await planService.store(request.body[i])
          await Plan.create(a, {
            transaction
          })
        }
      }

      return await db
        .sequelize()
        .transaction(transaction)
        .then((_) => response.status(201).send())
    } catch (error) {
      if (error.status && error.status === 400) {
        return response.status(400).json({ message: error.message })
      } else throw error
    }
  }

  async index (request, response) {
    const where = {}
    if (request.query.start && request.query.end) {
      where.date = {
        [Op.gte]: request.query.start,
        [Op.lte]: request.query.end
      }
    }
    if (request.query.user) {
      where.users_id = request.query.user
    }
    if (request.query.test) {
      where.tests_id = request.query.test
    }
    if (request.query.machine) {
      where.machines_id = request.query.machine
    }

    const plan = await Plan.findAll({
      include: [
        {
          model: Test,
          as: 'tests'
        },
        {
          model: User,
          as: 'users',
          attributes: ['id', 'name']
        },
        {
          model: Machine,
          as: 'machines'
        }
      ],
      where
    })
    return response.json(plan)
  }

  async update (request, response) {}

  async delete (request, response) {}
}
export default new PlanController()
