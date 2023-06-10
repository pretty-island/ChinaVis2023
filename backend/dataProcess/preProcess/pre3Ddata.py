# 处理3D图车辆数据
import os
import json
from collections import defaultdict

# 存储每个ID的记录次数
id_counts = defaultdict(int)
# 记录每个id的文件类型
id_files = defaultdict(list)
# 车辆数据路径
# halfIn_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/type/"
# 划分后文件的输出路径
# halfOut_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/type_3D/"
# 先打开类型车辆数据文件
# 遍历每个半小时文件夹，删去记录次数少于10次和出现在不同类型文件中的数据
# for hour in range(0, 18):
#     hour_folder = halfIn_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     type_files = os.listdir(hour_folder)
#     hour_folder_out=halfOut_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     if not os.path.exists(hour_folder_out):
#         os.makedirs(hour_folder_out)
#     # 遍历类型文件
#     for type_file in type_files:
#         file_path = os.path.join(hour_folder, type_file)
#         # 读取车辆数据文件
#         with open(file_path, "r") as f:
#             data = [json.loads(line) for line in f]
#         for item in data:
#             id_counts[item['id']] += 1
#             id_files[item['id']].append(type_file)
        
#         # 过滤数据，删除记录次数少于10次和出现在不同类型文件中的数据
#         filtered_data = []
#         for item in data:
#             if id_counts[item['id']] > 12 and (len(id_files[item['id']]) == 1 or id_files[item['id']][0] == type_file):
#                 filtered_data.append(item)
        
#         # 写入过滤后的数据到输出文件
#         output_file_path = os.path.join(hour_folder_out, type_file)
#         with open(output_file_path, "w") as f:
#             for item in filtered_data:
#                 f.write(json.dumps(item) + "\n")
        

# 把JSON文件改成标准数组
halfOut_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/type_3D/"
# 先打开类型车辆数据文件
# 遍历每个半小时文件夹，删去记录次数少于10次和出现在不同类型文件中的数据
for hour in range(0, 18):
    hour_folder = halfOut_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
    type_files = os.listdir(hour_folder)
    # hour_folder_out=halfOut_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
    # if not os.path.exists(hour_folder_out):
        # os.makedirs(hour_folder_out)
    # 遍历类型文件
    for type_file in type_files:
        file_path = os.path.join(hour_folder, type_file)
        # 读取车辆数据文件
        with open(file_path, "r") as f:
            data = [json.loads(line) for line in f]
        data_array=list(data)
        # json_str= data.replace('},','},\n')
        # json_array=json
        with open(file_path, "w") as f:
            # for item in filtered_data:
            f.write(json.dumps(data_array))
        
        
# from datetime import datetime

# half_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/type_3D/"
# tenmin_dir="D:/VIScode/chinavis-2023/backend/data/situation/time/type_10min/"
# # 先打开类型车辆数据文件
# # 遍历每个半小时文件夹，划分为10分钟一个文件
# for hour in range(0, 18):
#     hour_folder = half_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     type_files = os.listdir(hour_folder)
#     # hour_folder_out=tenmin_dir + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     # if not os.path.exists(hour_folder_out):
#     #     os.makedirs(hour_folder_out)
#     # 遍历类型文件
#     for type_file in type_files:
#         file_path = os.path.join(hour_folder, type_file)
#         # 读取车辆数据文件
#         with open(file_path, "r") as f:
#             for line in f.readlines():
#                 data = json.loads(line)
#                 # 获取当前数据的时间戳
#                 timestamp = data["time_meas"]
#                 # 将时间戳转换为datetime对象，获取小时数
#                 dt = datetime.fromtimestamp(timestamp / 1000000)
#                 hour = dt.hour
#                 # 获取分钟数
#                 minute=dt.minute
#                 min=(dt.minute // 5) * 5
#                 print(min)
            # data = [json.loads(line) for line in f]
        # for item in data:
            # id_counts[item['id']] += 1
            # id_files[item['id']].append(type_file)
        
        # # 过滤数据，删除记录次数少于10次和出现在不同类型文件中的数据
        # filtered_data = []
        # for item in data:
        #     if id_counts[item['id']] > 12 and (len(id_files[item['id']]) == 1 or id_files[item['id']][0] == type_file):
        #         filtered_data.append(item)
        
        # # 写入过滤后的数据到输出文件
        # output_file_path = os.path.join(hour_folder_out, type_file)
        # with open(output_file_path, "w") as f:
        #     for item in filtered_data:
        #         f.write(json.dumps(item) + "\n")
        
        # # 重置记录次数
        # id_counts.clear()
        

