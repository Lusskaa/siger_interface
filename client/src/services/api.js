import axios from 'axios'
import { toast } from 'react-toastify'

const apiSiger = axios.create({
  baseURL: 'http://localhost:3001',
})

apiSiger.interceptors.request.use(async (config) => {
  const userData = await localStorage.getItem('siger:userData')
  const token = userData && JSON.parse(userData).token
  config.headers.authorization = `Bearer ${token}`

  return config
})

const errorHandler = (err) => {
  if (err.errors)
    toast.error(
      <span>
        {err.errors.map((msg, index) => (
          <span key={index}>
            {msg}
            <br />
          </span>
        ))}
      </span>
    )
  else if (err.error) toast.error(err.error)
  else {
    console.log('ERROR: ', err)
    toast.error('Erro de infraestrutura')
  }

  return Promise.reject(err)
}

apiSiger.interceptors.response.use(
  (resp) => (resp.status > 299 ? errorHandler(resp.data) : resp),
  (err) => errorHandler(err.response.data)
)

export default apiSiger
