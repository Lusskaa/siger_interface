import { v4 } from 'uuid'
import Machine from '../entities/models/Machine'

class MachineController {
  async store(request, response) {
    const { name, type } = request.body

    const machineExists = await Machine.findOne({
      where: { name, type }
    })

    if (machineExists) {
      return response.status(400).json({ error: 'Esta máquina já existe' })
    }

    const machine = await Machine.create({
      id: v4(),
      name,
      type
    })

    return response.status(201).json(machine)
  }

  async index(request, response) {
    const machine = await Machine.findAll()
    return response.json(machine)
  }

  async delete(request, response) {
    const { id } = request.params

    const machine = await Machine.findByPk(id)

    if (!machine) {
      return response.status(404).json({ error: 'Máquina não encontrada' })
    }

    await Machine.destroy({
      where: { id }
    })
    return response.status(204).json()
  }
}
export default new MachineController()
