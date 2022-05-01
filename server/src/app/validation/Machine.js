import * as Yup from 'yup'
import machineTypesEnum from '../entities/enum/MachineType'

const store = async (request, response, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    type: Yup.string().required().oneOf(machineTypesEnum)
  })

  try {
    await schema.validateSync(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ errors: err.errors })
  }
  next()
}

export default {
  store
}
