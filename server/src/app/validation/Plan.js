import * as Yup from 'yup'

const store = async (request, response, next) => {
  const schema = Yup.array().of(
    Yup.object().shape({
      date: Yup.date().required(), // .min(new Date(), ({ value }) => `${value.} deve ser menor que hoje`)
      machines_id: Yup.string().required().uuid(),
      tests_id: Yup.string().required().uuid(),
      users_id: Yup.string().required().uuid(),
    })
  )

  try {
    await schema.validateSync(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ errors: err.errors })
  }
  next()
}
const update = async (request, response, next) => {
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
const destroy = async (request, response, next) => {
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
  update,
  destroy,
}
