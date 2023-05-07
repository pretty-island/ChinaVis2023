import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/",
    timeout: 20000,
});

api.defaults.headers.post['Content-Type'] = "application/json; charset=UTF-8";

api.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api