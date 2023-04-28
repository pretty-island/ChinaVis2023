import {get, post} from './http'

export const testUrl = (path) => {
    return get(path)
}


export const postParams = (path, data) => {
    return post(path, data)
}

/*
// 添加其他接口
  export const getdata = (path, []...]) => {
    ...
  } 
*/
