# 数据处理：统计断面车流量
# 数据每半秒采集一次，车辆速度最大为29m/s，因此半秒最远可行驶14.5m。断面车流可以统计离路口停止线最远不超过14.5米的车辆，也即在停止线前（或后）14.5米内出现过一次的车辆就统计进去。每辆车在同一个停止线只统计一次。

# 以停止线为断面统计车流量

import json 
from shapely.geometry import LineString, Point
# 停止线数据所在路径
stopLine_directory = "D:/VIScode/chinavis-2023/backend/data/situation/road2-12-9road/stoplineroad_with9road.geojson"
# 车辆数据所在路径
vehicle_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/car/car_9.00-9.05/9.05.json"
# 输出文件保存路径
output_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/carProcess/data/9.05flow.json"

# 读取道路停止线数据
with open(stopLine_directory) as f:
    data=json.load(f)
f.close()

stoplines = []
for feature in data['features']:
    fid = feature['properties']['fid']
    coordinates = feature['geometry']['coordinates']
    stoplines.append({"fid":fid,"coordinates":coordinates})

# 读取车辆数据
with open(vehicle_directory) as f:
    vehicle_data=json.load(f)
f.close()
# 存储处理好的数据结果
result=[]

# 遍历每条停止线
for stopline in stoplines:
    stopline_id = stopline['fid']
    stopline_coords=stopline['coordinates']
    # 定义一个集合，用于去重车辆数据
    vehicles_set=set()
    # 遍历每条车辆数据
    for vehicle in vehicle_data:
        # 获取车辆位置信息
        pos=json.loads(vehicle['position'])
        # 计算车辆距离停止线的最短距离:使用shapely包计算几何图形。object.distance(other)：返回最小距离（ float ） other 几何对象。
        line=LineString(stopline_coords)
        point = Point(pos["x"],pos["y"])
        distance=point.distance(line)
        #如何车辆距离停止线的距离小于等于7.25米，则认为车辆经过了停止线
        if distance<=7.25:
            # 如果经过，则将车辆数据添加到集合中，集合会自动去重
            vehicles_set.add(vehicle['id'])
    # 将停止线的fid和车流量添加到结果中
    result.append({'fid':stopline_id,'flow':len(vehicles_set)})

# 将结果保存到新的JSON文件
with open(output_directory,'w') as f:
    json.dump(result,f)
f.close()

