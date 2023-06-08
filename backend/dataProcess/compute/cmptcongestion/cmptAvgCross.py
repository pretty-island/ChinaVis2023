# 统计每个路口的平均拥堵
import json
import os
from collections import defaultdict
import pandas as pd
from datetime import datetime, timedelta

# 读取数据
input_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/crossdelay/"


# # 遍历文件，添加一列来表示路口的序号
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
#             cross=data.loc[i, "5"]
#             croid=int(cross.replace("路口",""))-1
#             # print(croid)
#             cross_column.append(croid)
#         data["croid"]=cross_column
#         data.to_csv(file_path,index=False)


# 保存统计文件：每个路口的平均拥堵
output_directory = (
    "D:/VIScode/chinavis-2023/backend/dataProcess/data/avgcrosscongestion.json"
)
crossconges_statistics = defaultdict(list)
for cross in range(1,9):
    cross_folder = input_directory + f"路口{cross}"
    hour_files = os.listdir(cross_folder)
    # 遍历时间文件
    for hour_file in hour_files:
        file_path = os.path.join(cross_folder, hour_file)
        hour=hour_file.split("h")[0]+"点"
        # 读取数据
        data = pd.read_csv(file_path)
        for i in range(len(data)):
            time_id=data.loc[i, "time_id"]
            croid=data.loc[i, "croid"]
            avg_delay = round(float(data.loc[i, "avg_delay"]), 3)
            values=[int(time_id)]+[int(croid)]+[avg_delay]
            if values not in crossconges_statistics[hour]:
                crossconges_statistics[hour].append(values)
with open(output_directory, "w", encoding="utf-8") as f:
    json.dump(crossconges_statistics, f, ensure_ascii=False, indent=4)