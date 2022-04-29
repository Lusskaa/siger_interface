import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
require('dotenv').config()

// eslint-disable-next-line import/first
import User from '../entities/models/User'

const authenticate = (authToken) => {
  if (!authToken) {
    throw new Error('Token not provided')
  }

  const token = authToken.split(' ')[1]

  try {
    const decoded = jwt.verify(token, authConfig.secret)

    return {
      id: decoded.id,
      name: decoded.name
    }
  } catch (err) {
    throw new Error('token is invalid')
  }
}

const isAdm = async (request, response, next) => {
  try {
    request.user = authenticate(request.headers.authorization)

    const user = await User.findOne({
      where: { id: request.user.id }
    })
    if (!user || !user.isActive) {
      return response
        .status(403)
        .json({ error: 'Este usuário não está ativo' })
    }

    if (process.env.ADMS.split(',').includes(request.user.id)) {
      next()
    } else {
      return response
        .status(403)
        .json({ error: 'Você não tem permissão para acessa este conteúdo' })
    }
  } catch (error) {
    return response.status(401).json({ error: error.message })
  }
}

const isAuthenticated = async (request, response, next) => {
  try {
    request.user = authenticate(request.headers.authorization)

    const user = await User.findOne({
      where: { id: request.user.id }
    })
    if (!user || !user.isActive) {
      return response
        .status(403)
        .json({ error: 'Este usuário não está ativo' })
    }

    next()
  } catch (error) {
    return response.status(401).json({ error: error.message })
  }
}

export default {
  isAuthenticated,
  isAdm
}
