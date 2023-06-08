# 计算获取地图的拥堵数据
# time:{roadname:}

import json
import os
from collections import defaultdict
import pandas as pd
from datetime import datetime, timedelta

# 读取数据
input_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/congestion/"
hour_files = os.listdir(input_directory)
output_directory = (
    "D:/VIScode/chinavis-2023/backend/dataProcess/data/MapRoadCongestion.json"
)

# # 遍历时间文件，添加一列来表示time的时分
# for hour_file in hour_files:
#     file_path = os.path.join(input_directory, hour_file)
#     # 读取数据
#     data = pd.read_csv(file_path)
#     # 添加一列
#     cross_column = []
#     for i in range(len(data)):
#         time_str = data.loc[i, "H_M_S"]
#         time = datetime.strptime(time_str, "%H:%M:%S")
#         # 计算起始分钟数
#         start_minute = (time.minute // 5) * 5
#         # 计算时间段的开始时间
#         start_time = time.replace(minute=start_minute, second=0)
#         # 格式化开始时间为字符串格式
#         start_time_str = start_time.strftime("%H:%M")
#         if start_time_str.startswith("0"):
#             start_time_str = start_time_str[1:]
#         cross_column.append(start_time_str)
#     data["time_min"] = cross_column
#     print(data)
#     data.to_csv(file_path,index=False)

roadconges_statistics = defaultdict(lambda: defaultdict(float))
# 遍历时间文件，获取拥堵指数
for hour_file in hour_files:
    file_path = os.path.join(input_directory, hour_file)
    # 读取数据
    data = pd.read_csv(file_path)
    for i in range(len(data)):
        time = data.loc[i, "time_min"]
        road_name = data.loc[i, "road_name"]
        avg_delay = round(float(data.loc[i, "avg_delay"]), 3)
        roadconges_statistics[time][road_name] = avg_delay
with open(output_directory, "w", encoding="utf-8") as f:
    json.dump(roadconges_statistics, f, ensure_ascii=False, indent=4)
