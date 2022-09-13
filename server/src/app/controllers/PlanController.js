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
      .catch((err) =>
        response
          .status(err.status ? err.status : 500)
          .json({ error: err.message })
      )
  }

  async index (request, response) {
    const where = {}
    if (request.query.start && request.query.end) {
      where.date = {
        [Op.gte]: request.query.start,
        [Op.lte]: request.query.end
      }
    }
    if (request.query.status) {
      where.status = request.query.status
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
      where,
      order: [
        ['date', 'ASC'],
        ['tests', 'type']
      ]
    })
    return response.json(plan)
  }

  async setStatus (request, response) {
    const plan = await Plan.findOne({ where: { id: request.params.planId } })
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA')
    console.log(request.params)
    if (plan) {
      await plan.update({
        status: true,
        situation: request.params.planSituation

      })
    }

    return response.status(204).send()
  }

  async delete (request, response) {
    const plan = await Plan.findOne({ where: { id: request.params.planId } })

    if (plan) {
      await plan.destroy()
    }

    return response.status(204).send()
  }

  async deleteMany (request, response) {
    const plans = await Plan.findAll({ status: true })

    if (plans) {
      await plans.destroy()
    }

    return response.status(204).send()
  }
}

export default new PlanController()
