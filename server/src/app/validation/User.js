import * as Yup from 'yup'

const store = async (request, response, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
  })

  try {
    await schema.validateSync(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ errors: err.errors })
  }
  next()
}

export default {
  store,
}
