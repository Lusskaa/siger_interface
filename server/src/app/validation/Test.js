import * as Yup from 'yup'

import testTypesEnum from '../entities/enum/TestType'
import machineTypesEnum from '../entities/enum/MachineType'

const store = async (request, response, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    type: Yup.string().required().oneOf(testTypesEnum),
    recommendedFrequency: Yup.string().required(),
    recommendedMachineType: Yup.string().required().oneOf(machineTypesEnum),
    description: Yup.string(),
    tolerance: Yup.string().required()
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
