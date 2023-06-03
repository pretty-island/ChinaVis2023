# 计算不同道路的不同类型的车流量和平均速度

# 计算道路通行量：不同道路不同时间段的数据
import json
import os
from collections import defaultdict
from datetime import datetime

# # 计算所有小时不同道路的道路通行量
# # 车辆数据路径
# input_directory = (
#     "D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/road/"
# )
# # 输出文件保存路径
# output_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/road/road.json"
# # 统计每个车辆的数据
# vehicle_count = defaultdict(lambda: defaultdict(set))
# # 统计该类型所有车辆的平均速度
# vehicle_speed = defaultdict(lambda: defaultdict(list))
# # 遍历每个半小时文件夹
# for hour in range(0, 18):
#     hour_folder = input_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     type_files = os.listdir(hour_folder)
#     # 遍历类型文件
#     for type_file in type_files:
#         road_files = os.listdir(os.path.join(hour_folder, type_file))
#         for road_file in road_files:
#             file_path = os.path.join(hour_folder, type_file, road_file)
#             road = road_file.split(".")[0]
#             # 读取车辆数据文件
#             with open(file_path, "r") as f:
#                 data = [json.loads(line) for line in f]
#             for item in data:
#                 id = item["id"]
#                 type = item["type"]
#                 velocity = item["velocity"]
#                 # 添加车辆ID到集合里
#                 vehicle_count[type][road].add(id)
#                 vehicle_speed[type][road].append(velocity)

# # 定义保存结果的字典
# result = defaultdict(list)
# # result={}
# for type, road_vehicles in vehicle_count.items():
#     # result[type]={}
#     for road, vehicles in road_vehicles.items():
#         count = len(vehicles)
#         speeds = vehicle_speed[type][road]
#         avg = sum(speeds) / len(speeds)
#         result[type].append({"road": road, "count": count, "avg_speed": avg})
#         # result[type][road]=({ "count": count, "avg_speed": avg})
# out_data = []
# for type, roads in result.items():
#     out_data.append({"type": type, "roads": roads})
# # 保存结果
# with open(output_directory, "w", encoding="utf-8") as f:
#     json.dump(out_data, f,ensure_ascii=False, indent=4)


# # 计算每半小时不同道路的道路通行量
# # 输出文件保存路径
# half_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/road/halfroad.json"
# result_half = []
# # 遍历每个半小时文件夹
# for hour in range(0, 18):
#     hour_folder = input_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     type_files = os.listdir(hour_folder)
#     types = []
#     # 遍历类型文件
#     for type_file in type_files:
#         road_files = os.listdir(hour_folder + "/" + type_file)
#         roads = []
#         for road_file in road_files:
#             file_path = os.path.join(hour_folder, type_file, road_file)
#             road = road_file.split(".")[0]
#             # 读取车辆数据文件
#             with open(file_path, "r") as f:
#                 data = [json.loads(line) for line in f]

#             # 统计每个车辆的数据
#             half_count = set()
#             # 统计该类型所有车辆的平均速度
#             half_speed = list()

#             for item in data:
#                 id = item["id"]
#                 type = item["type"]
#                 velocity = item["velocity"]
#                 # 添加车辆ID到集合里
#                 half_count.add(id)
#                 half_speed.append(velocity)
#             count = len(half_count)
#             avg = sum(half_speed) / len(half_speed)
#             # 计算该道路车流量和平均速度
#             road_data = {"road": road, "count": count, "avg_speed": avg}
#             # 构建类型流量数据
#             roads.append(road_data)
#         types.append(
#             {
#                 "type": type,
#                 "roads": roads,
#             }
#         )
#     result_half.append(
#         {
#             "time": f"{int(hour/2+7)}:{0 if hour%2==0 else 3}0",
#             "types": types,
#         }
#     )
# # 保存结果
# with open(half_directory, "w", encoding="utf-8") as f:
#     json.dump(result_half, f, ensure_ascii=False, indent=4)

# 计算每小时不同道路的道路通行量
# 小时车辆数据路径
inhour_directory = (
    "D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/hour/road/"
)
# 输出文件保存路径
hour_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/road/hourroad.json"
result_hour = []
# 遍历每个半小时文件夹
for hour in range(7, 16):
    hour_folder = inhour_directory + f"{hour}hour"
    type_files = os.listdir(hour_folder)
    types = []
    # 遍历类型文件
    for type_file in type_files:
        road_files = os.listdir(hour_folder + "/" + type_file)
        roads = []
        for road_file in road_files:
            file_path = os.path.join(hour_folder, type_file, road_file)
            road = road_file.split(".")[0]
            # 读取车辆数据文件
            with open(file_path, "r") as f:
                data = [json.loads(line) for line in f]

            # 统计每个车辆的数据
            hour_count = set()
            # 统计该类型所有车辆的平均速度
            hour_speed = list()

            for item in data:
                id = item["id"]
                type = item["type"]
                velocity = item["velocity"]
                # 添加车辆ID到集合里
                hour_count.add(id)
                hour_speed.append(velocity)
            count = len(hour_count)
            avg = sum(hour_speed) / len(hour_speed)
            # 计算该道路车流量和平均速度
            road_data = {"road": road, "count": count, "avg_speed": avg}
            # 构建类型流量数据
            roads.append(road_data)
        types.append(
            {
                "type": type,
                "roads": roads,
            }
        )
    result_hour.append(
        {
            "time": f"{hour}:00",
            "types": types,
        }
    )
# 保存结果
with open(hour_directory, "w", encoding="utf-8") as f:
    json.dump(result_hour, f, ensure_ascii=False, indent=4)

# # 计算每分钟不同道路的道路通行量
# # 输出文件保存路径
# min_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/road/minroad.json"

# # 定义保存结果的字典
# result_min = defaultdict(lambda:defaultdict(list))
# # 遍历每个半小时文件夹
# for hour in range(0, 18):
#     hour_folder = input_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     type_files = os.listdir(hour_folder)
#     types = []
#     # 遍历类型文件
#     for type_file in type_files:
#         road_files = os.listdir(hour_folder + "/" + type_file)
#         roads = []
#         for road_file in road_files:
#             file_path = os.path.join(hour_folder, type_file, road_file)
#             road = road_file.split(".")[0]
#             # 读取车辆数据文件
#             with open(file_path, "r") as f:
#                 data = [json.loads(line) for line in f]

#             # 统计每个车辆的数据
#             min_count = defaultdict(set)
#             # 统计该类型所有车辆的平均速度
#             min_speed = defaultdict(list)

#             for item in data:
#                 id = item["id"]
#                 type = item["type"]
#                 velocity = item["velocity"]
#                 # 获取当前数据的时间戳
#                 timestamp = item["time_meas"]
#                 # 将时间戳转换为datetime对象，获取小时数
#                 dt = datetime.fromtimestamp(timestamp / 1000000)
#                 time = dt.strftime("%H:%M")

#                 # 添加车辆ID到集合里
#                 min_count[time].add(id)
#                 min_speed[time].append(velocity)
#             for time, vehicles in min_count.items():
#                 count = len(vehicles)
#                 avg = sum(min_speed[time]) / len(min_speed[time])
#                 min_data = {"time": time, "count": count, "avg_speed": avg}
#                 result_min[type][road].append(min_data)
# type_result = defaultdict(list)
# for type, road_vehicles in result_min.items():
#     for road, mins in road_vehicles.items():
#         type_result[type].append({"road":road,"mins":mins})
# outmin_data = []
# for type, roads in type_result.items():
#     outmin_data.append({"type": type, "roads": roads})
    
         
# # 保存结果
# with open(min_directory, "w", encoding="utf-8") as f:
#     json.dump(outmin_data, f, ensure_ascii=False, indent=4)
