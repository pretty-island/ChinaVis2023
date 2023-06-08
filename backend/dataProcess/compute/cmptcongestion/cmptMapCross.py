# 计算路口平均拥堵指数
import json
import os
from collections import defaultdict
import pandas as pd
from datetime import datetime, timedelta

# 读取数据
input_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/crossdelay/"
# avg_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/crossdelay/"

# # 遍历每个路口文件夹,增加一列计算平均值
# for cross in range(1,9):
#     cross_folder = input_directory + f"路口{cross}"
#     hour_files = os.listdir(cross_folder)
#     # 遍历时间文件
#     for hour_file in hour_files:
#         file_path = os.path.join(cross_folder, hour_file)
#         # 读取数据
#         data = pd.read_csv(file_path)
#         # 计算平均值并添加到新列
#         data['avg_delay'] = data.groupby(['time_id'])['4'].transform('mean')
#         # 将数据写回原始文件
#         data.to_csv(file_path, index=False)

# # 遍历每个路口文件夹,增加一列时分
# for cross in range(1,9):
#     cross_folder = input_directory + f"路口{cross}"
#     hour_files = os.listdir(cross_folder)
#     # 遍历时间文件
#     for hour_file in hour_files:
#         file_path = os.path.join(cross_folder, hour_file)
#         # 读取数据
#         data = pd.read_csv(file_path)
#         # 添加一列
#         cross_column = []
#         for i in range(len(data)):
#             time_str = data.loc[i, "3"]
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
output_directory=    "D:/VIScode/chinavis-2023/backend/dataProcess/data/MapCrossCongestion.json"

crossconges_statistics = defaultdict(lambda: defaultdict(float))

# 遍历每个路口文件夹,获取路口拥堵值
for cross in range(1,9):
    cross_folder = input_directory + f"路口{cross}"
    hour_files = os.listdir(cross_folder)
    # 遍历时间文件
    for hour_file in hour_files:
        file_path = os.path.join(cross_folder, hour_file)
        # 读取数据
        data = pd.read_csv(file_path)
        for i in range(len(data)):
            time = data.loc[i, "time_min"]
            road_name = data.loc[i, "5"]
            avg_delay = round(float(data.loc[i, "avg_delay"]), 3)
            crossconges_statistics[time][road_name] = avg_delay
with open(output_directory, "w", encoding="utf-8") as f:
    json.dump(crossconges_statistics, f, ensure_ascii=False, indent=4)