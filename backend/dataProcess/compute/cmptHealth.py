import json
import os
from collections import defaultdict
import pandas as pd

# 读取数据
input_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/health.csv"


# # 增加一列
# # 读取车辆数据文件
# data = pd.read_csv(input_directory)
# # 添加一列road
# road_column=[]
# for i in range(len(data)):
#     health_point=data.loc[i,"health_point"]
#     # healthlevel=None
#     if health_point>=90:
#         healthlevel="非常健康"
#     elif health_point>=80:
#         healthlevel="健康"
#     elif health_point>=60:
#         healthlevel="亚健康"
#     elif health_point<60:
#         healthlevel="不健康"
#     road_column.append(healthlevel)
# data["healthLevel"]=road_column
# data.to_csv(input_directory,index=False)

# 保存统计文件
output_directory = (
    "D:/VIScode/chinavis-2023/backend/dataProcess/data/health.json"
)
health_statistics = defaultdict(lambda: defaultdict(list))
# 读取车辆数据文件
data = pd.read_csv(input_directory)
for i in range(len(data)):
    road_name = data.loc[i, "road_name"]
    healthLevel=data.loc[i,"healthLevel"]
    road=road_name.split("_")[0]
    values=[road_name]+[round(float(data.loc[i,key]),3) if '.'in str(data.loc[i,key]) else int(data.loc[i,key]) for key in ['h','occupancy_mean','delay_mean','overspeed_num','nixing_num','bus_way_num','bicycle_way_num','health_point']]+[healthLevel]
    health_statistics[road][road_name].append(values)
# print(health_statistics)
with open(output_directory, "w", encoding="utf-8") as f:
    json.dump(health_statistics, f,ensure_ascii=False, indent=4)