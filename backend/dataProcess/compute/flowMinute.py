# 不分路段！ 分类型统计所有道路上的车流量：分别统计不同类型的每半个小时的车流量，再求和得到所有道路、所有类型的总车流量。每半小时统计一次， 不分道路、只分类型

# type=7类型为静态物体，不做统计。
# 统计的所有类型：1；2；3；4；6；10。
# CAR = 1; //小型车辆
# PEDESTRIAN = 2;//行人
# CYCLIST = 3;//非机动车
# TRUCK = 4;//卡车
# BUS = 6;//客车
# TROLLEY = 10;//手推车、三轮车

# 输出数据格式：
# [{"time":7:00
# "allcount":111111
# "vehicle":1112 //统计计算所有机动车：小型车辆、卡车、客车
# "speed_all":000
# "speed_vehicle":111
# "types":[{type:1, "count":111,"avg_speed":222},]}]

import os
import json
from collections import defaultdict
from datetime import datetime


# 车辆数据路径
input_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/type/"
# 输出文件保存路径
output_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/flowminute.json"

# 定义保存结果的字典
result = defaultdict(list)

# 遍历每个半小时文件夹
for hour in range(0, 18):
    hour_folder = input_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
    type_files = os.listdir(hour_folder)
    types = []
    # 遍历类型文件
    for type_file in type_files:
        file_path = os.path.join(hour_folder, type_file)
        # 读取车辆数据文件
        with open(file_path, "r") as f:
            data = [json.loads(line) for line in f]

        
        # 统计每个车辆的数据
        vehicle_count = defaultdict(set)
        vehicle_speed = defaultdict(list)
        # 统计该类型所有车辆的平均速度
        # total_speed = 0

        for item in data:
            id = item["id"]
            type = item["type"]
            velocity = item["velocity"]
            # 获取当前数据的时间戳
            timestamp = item["time_meas"]
            # 将时间戳转换为datetime对象，获取小时数
            dt = datetime.fromtimestamp(timestamp / 1000000)
            time=dt.strftime("%H:%M")
            # 添加车辆ID到对应类型的集合里
            vehicle_count[time].add(id)
            # 该类型车辆的平均速度
            # total_speed += velocity
            vehicle_speed[time].append(velocity)
        # 计算该车辆类型的总流量
        # count_all = len(vehicle_count)
        # 计算该车辆类型的平均速度
        # avg_speed = total_speed / len(data)        
        # 计算该类型车流量和平均速度

        # 构建类型数据
        # mins=[]
        
        for time, vehicles in vehicle_count.items():
            count = len(vehicles)
            speeds = vehicle_speed[time]
            avg = sum(speeds) / len(speeds)
            min_data = {
                "time":time, 
                "count":count,
                "avg_speed":avg
            }
            
            # mins.append(min_data)
            result[type].append(min_data)
        
out_data=[]
for type,mins in result.items():
     out_data.append({"type":type,"mins":mins})

# 保存结果
with open(output_directory, "w") as f:
    json.dump(out_data, f, indent=4)
