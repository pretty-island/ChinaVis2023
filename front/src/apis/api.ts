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

// 排队车辆统计数据接口
export const getQueCar = (path: string) => {
  return api.get(path)
}

// 断面车流统计数据接口
export const getFlow = (path: string) => {
  return api.get(path)
}

// 车辆车流量和平均速度数据接口
export const getStatis = (path: string) => {
  return api.get(path)
}

// 车辆热力图数据接口
export const getHeat = (path: string) => {
  return api.get(path)
}