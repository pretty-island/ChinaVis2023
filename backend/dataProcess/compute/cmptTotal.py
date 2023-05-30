# 计算道路通行量
import json
import os
from collections import defaultdict

# # 先计算所有小时所有路口的道路通行量

# # 车辆数据路径
# input_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/type/"
# # 输出文件保存路径
# output_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/total.json"
# # 统计每个车辆的数据
# vehicle_count = defaultdict(set)
# # 遍历每个半小时文件夹
# for hour in range(0, 18):
#     hour_folder = input_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     type_files = os.listdir(hour_folder)
#     # 遍历类型文件
#     for type_file in type_files:
#         file_path = os.path.join(hour_folder, type_file)
#         # 读取车辆数据文件
#         with open(file_path, "r") as f:
#             data = [json.loads(line) for line in f]
#         for item in data:
#             id = item["id"]
#             type = item["type"]
#             # 添加车辆ID到集合里
#             vehicle_count[type].add(id)
# result = []
# for type, vehicles in vehicle_count.items():
#     count = len(vehicles)
#     result.append({"type": type, "count": count})
# # 保存结果
# with open(output_directory, "w") as f:
#     json.dump(result, f, indent=4)

# # 分别计算每半个小时所有路口的道路通行量
# # 输出文件保存路径
# half_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/halftotal.json"
# result_half = []
# # 遍历每个半小时文件夹
# for hour in range(0, 18):
#     hour_folder = input_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     type_files = os.listdir(hour_folder)
#     half_count = defaultdict(set)
#     # 遍历类型文件
#     for type_file in type_files:
#         file_path = os.path.join(hour_folder, type_file)
#         # 读取车辆数据文件
#         with open(file_path, "r") as f:
#             data = [json.loads(line) for line in f]
#         for item in data:
#             id = item["id"]
#             type = item["type"]
#             # 添加车辆ID到集合里
#             half_count[type].add(id)

#     for type, vehicles in half_count.items():
#         count = len(vehicles)
#         result_half.append(
#             {
#                 "time": f"{int(hour/2+7)}:{0 if hour%2==0 else 3}0",
#                 "type": type,
#                 "count": count,
#             }
#         )
# # 保存结果
# with open(half_directory, "w") as f:
#     json.dump(result_half, f, indent=4)

# 分别计算每个小时所有路口的道路通行量
# 输出文件保存路径
hour_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/hourtotal.json"
# 小时车辆数据路径
inhour_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/type/hour/"
result_hour = []
# 遍历每个小时文件夹
for hour in range(7, 16):
    hour_folder = inhour_directory + f"{hour}hour"
    type_files = os.listdir(hour_folder)
    hour_count = defaultdict(set)
    # 遍历类型文件
    for type_file in type_files:
        file_path = os.path.join(hour_folder, type_file)
        # 读取车辆数据文件
        with open(file_path, "r") as f:
            data = [json.loads(line) for line in f]
        for item in data:
            id = item["id"]
            type = item["type"]
            # 添加车辆ID到集合里
            hour_count[type].add(id)

    for type, vehicles in hour_count.items():
        count = len(vehicles)
        result_hour.append(
            {
                "time": f"{hour}:00",
                "type": type,
                "count": count,
            }
        )
# 保存结果
with open(hour_directory, "w") as f:
    json.dump(result_hour, f, indent=4)
