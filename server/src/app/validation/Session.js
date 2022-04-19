import * as Yup from 'yup'

const login = async (request, response, next) => {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6)
  })

  try {
    await schema.validateSync(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ error: err.errors })
  }
  next()
}

export default {
  login,
}
