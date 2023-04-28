import axios, {AxiosRequestConfig, AxiosResponse} from "axios";


axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.timeout = 20000;

axios.interceptors.request.use(
    (config) => {
        config.headers = { DeviceType: 'H5'};
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export function get(url, params){
    return new Promise((resolve, reject) => {
        axios.get(url, {params}).then(res => {
            resolve(res);
        }).catch(err => reject(err))
    })
}

export function post(url, data={}){
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            resolve(res)
        }).catch(err => reject(err))
    })
}