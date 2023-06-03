# 计算道路通行量 图的数据  所有道路的通行量：全部时间total.json、每小时hourtotal.json、每半小时halftotal.json；
# 计算道路通行量：不同道路不同时间段的数据：
import json
import os
from collections import defaultdict
from datetime import datetime

# 先计算所有小时所有道路的道路通行量:使用去除停止的数据
# 车辆数据路径
input_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/"
# 输出文件保存路径
output_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/total/total.json"
# 统计每个车辆的数据
vehicle_count = defaultdict(set)
# 统计该类型所有车辆的平均速度
vehicle_speed = defaultdict(list)
# 遍历每个半小时文件夹
for hour in range(0, 18):
    hour_folder = input_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
    type_files = os.listdir(hour_folder)
    # 遍历类型文件
    for type_file in type_files:
        file_path = os.path.join(hour_folder, type_file)
        # 读取车辆数据文件
        with open(file_path, "r") as f:
            data = [json.loads(line) for line in f]
        for item in data:
            id = item["id"]
            type = item["type"]
            velocity = item["velocity"]
            # 添加车辆ID到集合里
            vehicle_count[type].add(id)
            vehicle_speed[type].append(velocity)
result = []
for type, vehicles in vehicle_count.items():
    count = len(vehicles)
    speeds = vehicle_speed[type]
    avg = sum(speeds) / len(speeds)
    result.append({"type": type, "count": count, "avg_speed": avg})
# 保存结果
with open(output_directory, "w") as f:
    json.dump(result, f, indent=4)

# # 分别计算每半个小时所有道路的道路通行量:使用去除停止的数据
# # 输出文件保存路径
# half_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/total/halftotal.json"
# result_half = []
# # 遍历每个半小时文件夹
# for hour in range(0, 18):
#     hour_folder = input_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     type_files = os.listdir(hour_folder)
#     types=[]
#     # 遍历类型文件
#     for type_file in type_files:
#         file_path = os.path.join(hour_folder, type_file)

#         # 读取车辆数据文件
#         with open(file_path, "r") as f:
#             data = [json.loads(line) for line in f]

#         half_count = set()
#         half_speed = list()
#         for item in data:
#             id = item["id"]
#             type = item["type"]
#             velocity = item["velocity"]
#             # 添加车辆ID到集合里
#             half_count.add(id)
#             half_speed.append(velocity)
        
#         count = len(half_count)
#         avg = sum(half_speed) / len(half_speed)
#         # 计算该类型车流量和平均速度
#         type_data = {
#             "type":type, 
#             "count":count,
#             "avg_speed":avg
#         }
#         # 构建类型流量数据        
#         types.append(type_data)
        
#     result_half.append(
#         {
#             "time": f"{int(hour/2+7)}:{0 if hour%2==0 else 3}0",
#             "types":types,
#         }
#     )
# # 保存结果
# with open(half_directory, "w") as f:
#     json.dump(result_half, f, indent=4)

# # 分别计算每个小时所有道路的道路通行量
# # 输出文件保存路径
# hour_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/total/hourtotal.json"
# # 小时车辆数据路径
# inhour_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/hour/"
# result_hour = []
# # 遍历每个小时文件夹
# for hour in range(7, 9):
#     hour_folder = inhour_directory + f"{hour}hour"
#     type_files = os.listdir(hour_folder)
#     types=[]
#     # 遍历类型文件
#     for type_file in type_files:
#         file_path = os.path.join(hour_folder, type_file)
#         # 读取车辆数据文件
#         with open(file_path, "r") as f:
#             data = [json.loads(line) for line in f]

#         hour_count = set()
#         hour_speed = list()
#         for item in data:
#             id = item["id"]
#             type = item["type"]
#             velocity = item["velocity"]
#             hour_speed.append(velocity)
#             # 添加车辆ID到集合里
#             hour_count.add(id)
        
#         count = len(hour_count)
#         avg = sum(hour_speed) / len(hour_speed)
#         # 计算该类型车流量和平均速度
#         type_data = {
#             "type":type, 
#             "count":count,
#             "avg_speed":avg
#         }
#         # 构建类型流量数据        
#         types.append(type_data)
#     result_hour.append(
#         {
#             "time": f"{hour}:00",
#             "types":types,
#         }
#     )
# # 保存结果
# with open(hour_directory, "w") as f:
#     json.dump(result_hour, f, indent=4)

# 分别计算每分钟所有道路的道路通行量
# 输出文件保存路径
# min_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/total/mintotal.json"

# # 定义保存结果的字典
# result_min = defaultdict(list)
# # 遍历每个半小时文件夹
# for hour in range(0, 18):
#     hour_folder = input_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     type_files = os.listdir(hour_folder)
#     types=[]
#     # 遍历类型文件
#     for type_file in type_files:
#         file_path = os.path.join(hour_folder, type_file)
#         # 读取车辆数据文件
#         with open(file_path, "r") as f:
#             data = [json.loads(line) for line in f]

#         # 统计每个车辆的数据
#         min_count = defaultdict(set)
#         min_speed = defaultdict(list)

#         for item in data:
#             id = item["id"]
#             type = item["type"]
#             velocity = item["velocity"]
#             # 获取当前数据的时间戳
#             timestamp = item["time_meas"]
#             # 将时间戳转换为datetime对象，获取小时数
#             dt = datetime.fromtimestamp(timestamp / 1000000)
#             time=dt.strftime("%H:%M")

#             min_count[time].add(id)
#             # 添加车辆ID到集合里
#             min_speed[time].append(velocity)

#         for time, vehicles in min_count.items():
#             count = len(vehicles)
#             speeds = min_speed[time]
#             avg = sum(speeds) / len(speeds)
#             min_data = {
#                 "time":time, 
#                 "count":count,
#                 "avg_speed":avg
#             }
#             result_min[type].append(min_data)
# out_data=[]
# for type,mins in result_min.items():
#      out_data.append({"type":type,"mins":mins})
# # 保存结果
# with open(min_directory, "w") as f:
#     json.dump(out_data, f, indent=4)
