# 统计每小时不同类型的车辆的车流量和平均速度

import os
import json
from collections import defaultdict

# 车辆数据路径
input_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/road/"
# 输出文件保存路径
output_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/statis.json"

# 定义保存结果的字典
road_traffic = []

# 遍历每个小时文件夹
for hour in range(7, 16):
    hour_folder = input_directory + f"{hour}hour"
    road_files = os.listdir(hour_folder)
    # 遍历道路文件
    for road_file in road_files:
        if road_file.startswith("road_") and road_file.endswith(".json"):
            road_sec_id = int(road_file.split("_")[1].split(".")[0])
            file_path = os.path.join(hour_folder, road_file)

            # 读取道路数据文件
            with open(file_path, "r") as f:
                road_data = [json.loads(line) for line in f]

            # 统计每个道路的数据
            vehicle_count = defaultdict(set)
            vehicle_speed = defaultdict(list)

            # 统计所有类型车辆的平均速度
            total_speed = 0

            for item in road_data:
                vehicle_id = item["id"]
                vehicle_type = item["type"]
                vehicle_velocity = item["velocity"]

                # 添加车辆ID到对应类型的集合里
                vehicle_count[vehicle_type].add(vehicle_id)

                # 所有类型车辆的平均速度
                total_speed += vehicle_velocity

                # 统计速度列表
                vehicle_speed[vehicle_type].append(vehicle_velocity)
            # 计算所有车辆类型的总流量
            count_all = sum(len(vehicles) for vehicles in vehicle_count.values())
            # 计算所有车辆类型的平均速度
            avg_speed = total_speed / len(road_data)

            # 构建道路数据
            road_data = {
                "road_sec_id": road_sec_id,
                "avg_all": avg_speed,
                "count_all": count_all,
                "vehicle_types": [],
            }
           
            # 根据类型计算车流量和平均速度
            for vehicle_type, vehicles in vehicle_count.items():
                count = len(vehicles)
                speeds = vehicle_speed[vehicle_type]
                avg = sum(speeds) / len(speeds)
                vehicle_data = {
                    "vehicle_type": vehicle_type,
                    "vehicle_count": count,
                    "avg_speed": avg,
                }
                road_data["vehicle_types"].append(vehicle_data)
            # 查找当前小时的数据
            hour_data = next((data for data in road_traffic if data["hour"] == hour), None)
            if hour_data is None:
                # 如果当前小时的数据不存在，则创建一个新的小时数据
                hour_data = {
                    "hour": hour,
                    "road": [],
                }
                road_traffic.append(hour_data)
            
            # 添加道路数据到当前小时数据中
            hour_data["road"].append(road_data)

# 保存结果
with open(output_directory, "w") as f:
    json.dump(road_traffic, f, indent=4)
