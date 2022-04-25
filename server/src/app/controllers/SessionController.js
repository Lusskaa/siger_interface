import jwt from 'jsonwebtoken'
import User from '../entities/models/User'
import authConfig from '../../config/auth'

class SessionController {
  async login (request, response) {
    const { email, password } = request.body

    const user = await User.findOne({
      where: { email }
    })

    if (!user || !(await user.checkPassword(password))) {
      return response.status(400).json({ message: 'Email ou senha inválidos' })
    }

    if (!user.isActive) {
      return response.status(403).json({ message: 'Usuário não está ativo' })
    }

    return response.status(200).json({
      id: user.id,
      email,
      name: user.name,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      }),
      isAdm: process.env.ADMS.split(',').includes(user.id),
      isActive: true
    })
  }
}

export default new SessionController()
