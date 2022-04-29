/*
store => cadastrar / adcionar
index => Listar vários
show => Listar apenas 1
update => atualizar
delete => deletar

SÓ PODEMOS TER UM SOMENTE DENTRO DE CADA CONTROLER
*/
import { v4 } from 'uuid'
import User from '../entities/models/User'

class UserController {
  async store(request, response) {
    const { name, email, password, isActive } = request.body

    const userExists = await User.findOne({
      where: { email },
    }) // fazendo uma query no banco para procurar o email

    if (userExists) {
      return response.status(409).json({ error: 'Este usuário já existe' })
    } // validaçao de email repetido

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      isActive,
    })

    /* return response.json(user) AQUI RETORNARÍAMOS TUDO, NO ENTANTO N QUEREMOS QUE NOSSO FRONT END TENHA A INFO DE SENHA */
    return response
      .status(201)
      .json({ id: user.id, name, email, isActive: user.isActive })
  }

  async setStatus(request, response) {
    const { id } = request.params

    const isAdm = process.env.ADMS.split(',').includes(id)
    if (isAdm) {
      return response
        .status(403)
        .json({ error: 'Usuários administrativos não podem ser desativados' })
    }

    const user = await User.findByPk(id)

    if (!user) {
      return response.status(404).json({ error: 'Usuário não encontrado' })
    }

    await User.update(
      {
        isActive: !user.isActive,
      },
      { where: { id } }
    )

    return response.status(204).send()
  }

  async index(request, response) {
    const user = await User.findAll()
    return response.json(user)
  }

  async delete(request, response) {
    const { id } = request.params

    const isAdm = process.env.ADMS.split(',').includes(id)
    if (isAdm) {
      return response
        .status(403)
        .json({ error: 'Usuários administrativos não podem ser removidos' })
    }

    const user = await User.findByPk(id)
    if (!user) {
      return response.status(404).json({ error: 'Usuário não encontrado' })
    }

    await User.destroy({
      where: { id },
    })
    return response.status(204).json()
  }
}
export default new UserController()
