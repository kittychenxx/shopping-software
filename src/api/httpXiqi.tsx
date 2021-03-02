import axios from 'axios'
import Qs from 'qs'

let httpXiqi = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:80/shopping/index.php' : 'http://localhost:80/shopping/index.php',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    transformRequest: (data) => Qs.stringify(data),
    timeout: 1000
});

httpXiqi.interceptors.request.use(function(config){
    return config
}, function(error){
    return Promise.reject(error)
})

httpXiqi.interceptors.response.use(function(response){
    return response.data
}, function(error){
    return Promise.reject(error)
})

export default httpXiqi