import api from './http.js'

export const testUrl = (path: string) => {
  return api.get(path)
}

export const postParams = (path: string, data = {}) => {
  return api.post(path, data)
}

// 所有道路所有时间的不同类型的车流量和速度
export const getTotal = (path: string) => {
  return api.get(path)
}

// 所有道路每小时的不同类型的车流量和速度
export const getHourTotal = (path: string) => {
  return api.get(path)
}

// 所有道路每半小时的不同类型的车流量和速度
export const getHalfTotal = (path: string) => {
  return api.get(path)
}

// 所有道路每分钟的不同类型的车流量和速度
export const getMinTotal = (path: string) => {
  return api.get(path)
}

// 不同道路所有时间的不同类型的车流量和速度
export const getRoad = (path: string) => {
  return api.get(path)
}

// 不同道路每小时的不同类型的车流量和速度
export const getHourRoad = (path: string) => {
  return api.get(path)
}

// 不同道路每半小时的不同类型的车流量和速度
export const getHalfRoad = (path: string) => {
  return api.get(path)
}

// 不同道路每分钟的不同类型的车流量和速度
export const getMinRoad = (path: string) => {
  return api.get(path)
}

// 路口车流流向
export const getTurnFlow = (path: string) => {
  return api.get(path)
}

// // 所有道路的不同类型的车流量和速度
// export const getAllFlow = (path: string) => {
//   return api.get(path)
// }

// 排队车辆统计数据接口
export const getQueCar = (path: string) => {
  return api.get(path)
}
// 排队车辆统计数据接口
export const getTurnQueCar = (path: string) => {
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

export const getEvent = (path: string) => {
  return api.get(path)
}
export const getEventRoad = (path: string) => {
  return api.get(path)
}
export const getEventTable = (path: string, hour: string, event_name: string) => {
  return api.get(`${path}?hour=${hour}&event_name=${event_name}`)
}
