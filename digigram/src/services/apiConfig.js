import axios from 'axios'

const getToken = () => {
    return new Promise(resolve => {
        resolve(`Bearer ${localStorage.getItem('token') || null}`)
    })
}

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        // ? 'https://herokuapp.com//'
        // : 'http://localhost:8000/'
})

api.interceptors.request.use(async function (config) {
    config.headers['Authorization'] = await getToken()
    return config
}, function (error) {
    console.log('Request error: ', error)
    return Promise.reject(error)
});

export default api