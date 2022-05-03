import { v4 } from 'uuid'
import Test from '../entities/models/Test'

class TestController {
  async store(request, response) {
    const {
      name,
      type,
      recommendedFrequency,
      recommendedMachineType,
      description,
      tolerance
    } = request.body

    const testExists = await Test.findOne({
      where: { name, type, recommendedFrequency, tolerance }
    })

    if (testExists) {
      return response.status(400).json({ error: 'Este teste já existe' })
    }

    const test = await Test.create({
      id: v4(),
      name,
      type,
      recommendedFrequency,
      recommendedMachineType,
      description,
      tolerance
    })

    return response.status(201).json(test)
  }

  async index(request, response) {
    const where = {}

    if (request.query.type) {
      where.type = request.query.type
    }
    if (request.query.frequency) {
      where.recommendedFrequency = request.query.frequency
    }

    const test = await Test.findAll({
      where,
      order: [['recommendedFrequency'], ['type']]
    })
    return response.json(test)
  }

  async delete(request, response) {
    const { id } = request.params

    const test = await Test.findByPk(id)

    if (!test) {
      return response.status(404).json({ error: 'Teste não encontrado' })
    }

    await Test.destroy({
      where: { id }
    })

    return response.status(204).json()
  }
}
export default new TestController()
