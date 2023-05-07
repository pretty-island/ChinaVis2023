import api from './http.js'

export const testUrl = (path: string) => {
    return api.get(path)
}


export const postParams = (path: string, data = {}) => {
    return api.post(path, data)
}

/*
// 添加其他接口
  export const getdata = (path, []...]) => {
    ...
  } 
*/
