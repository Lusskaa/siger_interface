import axios from 'axios'


const apiSiger = axios.create({
    baseURL: 'http://localhost:3001'
})

apiSiger.interceptors.request.use( async config =>{
    const userData = await localStorage.getItem('siger:userData')
    const token = userData && JSON.parse(userData).token
    config.headers.authorization = `Bearer ${token}`

    return config
})


export default apiSiger