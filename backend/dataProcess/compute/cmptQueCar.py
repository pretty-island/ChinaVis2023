# 排队车辆数据
import json
import os
from collections import defaultdict
import pandas as pd
from datetime import datetime, timedelta
# 读取数据
input_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/line_up/"
# 保存统计文件
output_directory = (
"D:/VIScode/chinavis-2023/backend/dataProcess/data/line_up/cross.json"
)
outturn_directory = (
"D:/VIScode/chinavis-2023/backend/dataProcess/data/line_up/crossturn.json"
)

# # 遍历每个路口文件夹，增加一列方向
# for cross in range(8,9):
#     cross_folder = input_directory + f"路口{cross}"
#     hour_files = os.listdir(cross_folder)
#     # 遍历时间文件
#     for hour_file in hour_files:
#         file_path = os.path.join(cross_folder, hour_file)
#         # 读取数据
#         data = pd.read_csv(file_path)
#         # 添加一列road
#         cross_column = []
#         for i in range(len(data)):
#             road_sec_id = data.loc[i, "road_sec_id"]
#             road = None
#             if road_sec_id == 17:
#                 road = "左"
#             elif road_sec_id == 26:
#                 road = "右"
#             # elif road_sec_id == 377:
#             #     road = "下"
#             elif road_sec_id == 78:
#                 road = "上"
#             cross_column.append(road)
#         data["turn"] = cross_column
#         print(data)
#         data.to_csv(file_path,index=False)


# # 遍历每个路口文件夹，增加一列五分钟时间段
# for cross in range(1,9):
#     cross_folder = input_directory + f"路口{cross}"
#     hour_files = os.listdir(cross_folder)
#     # 遍历时间文件
#     for hour_file in hour_files:
#         file_path = os.path.join(cross_folder, hour_file)
#         # 读取数据
#         data = pd.read_csv(file_path)
#         # 添加一列road
#         cross_column = []
#         for i in range(len(data)):
#             time_str = data.loc[i, "time"]
#             time = datetime.strptime(time_str, "%H:%M:%S")
#             # 计算起始分钟数
#             start_minute = (time.minute // 5) * 5
#             # 计算时间段的开始时间
#             start_time = time.replace(minute=start_minute, second=0)
#             # 格式化开始时间为字符串格式
#             start_time_str = start_time.strftime("%H:%M")
#             if start_time_str.startswith("0"):
#                 start_time_str = start_time_str[1:]
#             cross_column.append(start_time_str)
#         data["time_min"] = cross_column
#         print(data)
#         data.to_csv(file_path,index=False)

# cross_statistics = {}
# # 遍历每个路口文件夹，计算车流量
# for cross in range(1, 9):
#     hour_folder = input_directory + f"路口{cross}"
#     hour_files = os.listdir(hour_folder)
#     crossName = f"路口{cross}"
#     # 遍历时间文件
#     for hour_file in hour_files:
#         file_path = os.path.join(hour_folder, hour_file)
#         # 读取数据
#         data = pd.read_csv(file_path)
#         for i in range(len(data)):
#             time=data.loc[i, "time"]
#             turn=data.loc[i, "turn"]
#             all_car=int(data.loc[i, "all_car"])
#             line_up_car=int(data.loc[i, "line_up_car"])
#             time_min=data.loc[i, "time_min"]            
#             if crossName not in cross_statistics:
#                 cross_statistics[crossName] = {}
#             if time_min not in cross_statistics[crossName]:
#                 cross_statistics[crossName][time_min]=[]    
#             time_exists = False
#             for item in cross_statistics[crossName][time_min]:
#                 if item["time"] == time:
#                     item["all_car"] += all_car
#                     item["line_up_car"] += line_up_car
#                     time_exists = True
#                     break            
#             if not time_exists:
#                 cross_statistics[crossName][time_min].append({"time": time, "all_car": all_car, "line_up_car": line_up_car}) 
# # print(cross_statistics)
# with open(output_directory, "w", encoding="utf-8") as f:
#     json.dump(cross_statistics, f,ensure_ascii=False, indent=4)
cross_statistics = {}
# 遍历每个路口文件夹，计算车流量
for cross in range(1, 9):
    hour_folder = input_directory + f"路口{cross}"
    hour_files = os.listdir(hour_folder)
    crossName = f"路口{cross}"
    # 遍历时间文件
    for hour_file in hour_files:
        file_path = os.path.join(hour_folder, hour_file)
        # 读取数据
        data = pd.read_csv(file_path)
        for i in range(len(data)):
            time=data.loc[i, "time"]
            turn=data.loc[i, "turn"]
            all_car=int(data.loc[i, "all_car"])
            line_up_car=int(data.loc[i, "line_up_car"])
            time_min=data.loc[i, "time_min"]            
            if crossName not in cross_statistics:
                cross_statistics[crossName] = {}
            if time_min not in cross_statistics[crossName]:
                cross_statistics[crossName][time_min] = {}
            if turn not in cross_statistics[crossName][time_min]:
                cross_statistics[crossName][time_min][turn] = []
                cross_statistics[crossName][time_min][turn].append({"time": time, "all_car": all_car, "line_up_car": line_up_car}) 
            else:
                cross_statistics[crossName][time_min][turn].append({"time": time, "all_car": all_car, "line_up_car": line_up_car}) 
        # event_count=len(data)
# print(event_statistics)
with open(outturn_directory, "w", encoding="utf-8") as f:
    json.dump(cross_statistics, f,ensure_ascii=False, indent=4)
