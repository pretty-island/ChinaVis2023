# 道路拥堵数据
import json
import os
from collections import defaultdict
import pandas as pd
from datetime import datetime, timedelta

# 读取数据
input_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/congestion/"
hour_files = os.listdir(input_directory)
# # 遍历时间文件，删除路口行
# for hour_file in hour_files:
#     file_path = os.path.join(input_directory, hour_file)
#     # 读取数据
#     data = pd.read_csv(file_path)
#     # 删除包含缺失值的行
#     data=data.dropna()
#     # 删除含有路口的行
#     data=data[~data['road_name'].str.contains('路口')]
#     print(data)
#     data.to_csv(file_path,index=False)


# # 遍历时间文件，添加一列来表示time的序号
# for hour_file in hour_files:
#     file_path = os.path.join(input_directory, hour_file)
#     # 读取数据
#     data = pd.read_csv(file_path)
#     # 添加一列
#     cross_column = []
#     for i in range(len(data)):
#         time = data.loc[i, "H_M_S"]
#         tm=pd.to_datetime(time)
#         # print(tm.minute//5)
#         time_id=tm.minute//5
#         cross_column.append(time_id)
#     data["time_id"] = cross_column
#     print(data)
#     data.to_csv(file_path,index=False)


# # 遍历时间文件，添加一列来表示平均值
# for hour_file in hour_files:
#     file_path = os.path.join(input_directory, hour_file)
#     # 读取数据
#     data = pd.read_csv(file_path)

#     # 计算平均值并添加到新列
#     data['avg_delay'] = data.groupby(['time_id', 'road_id'])['delay_point'].transform('mean')

#     # 将数据写回原始文件
#     data.to_csv(file_path, index=False)

# # 遍历时间文件，添加一列来表示road的序号
# # 定义道路名称和对应的序号映射关系
# road_mapping = {
#     '道路1_向右': 0,
#     '道路1_向左': 1,
#     '道路2_向右': 2,
#     '道路2_向左': 3,
#     '道路3_向右': 4,
#     '道路3_向左': 5,
#     '道路4_向右': 6,
#     '道路4_向左': 7,
#     '道路5_向右': 8,
#     '道路5_向左': 9,
#     '道路6_向右': 10,
#     '道路6_向左': 11,
#     '道路7_向右': 12,
#     '道路7_向左': 13,
#     '道路8_向右': 14,
#     '道路8_向左': 15,
#     '道路9_向右': 16,
#     '道路9_向左': 17,
#     '道路10_向右': 18,
#     '道路10_向左': 19,
#     '道路11_向上': 20,
#     '道路11_向下': 21,
#     '道路12_向上': 22,
#     '道路12_向下': 23,
#     '道路13_向上': 24,
#     '道路13_向下': 25,
#     '道路14_向上': 26,
#     '道路14_向下': 27,
#     '道路15_向上': 28,
#     '道路15_向下': 29
# }

# for hour_file in hour_files:
#     file_path = os.path.join(input_directory, hour_file)
#     # 读取数据
#     data = pd.read_csv(file_path)
#     # 添加一列
#     road_id_column = []
#     for road in data['road_name']:
#         road_id = road_mapping.get(road, -1)  # 使用字典进行映射，如果找不到对应的道路名称，默认为-1
#         road_id_column.append(road_id)
#     data["road_id"] = road_id_column
#     print(data)
#     data.to_csv(file_path,index=False)

# # 保存统计文件
# output_directory = (
#     "D:/VIScode/chinavis-2023/backend/dataProcess/data/roadcongestion.json"
# )
# roadconges_statistics = defaultdict(list)
# # 获取气泡图数据
# for hour_file in hour_files:
#     file_path = os.path.join(input_directory, hour_file)
#     hour=hour_file.split("h")[0]+"点"
#     # print(hour)
#     # 读取数据
#     data = pd.read_csv(file_path)
#     for i in range(len(data)):
#         time_id=data.loc[i, "time_id"]
#         road_id=data.loc[i, "road_id"]
#         # print(data.head())
#         # delay_point=data.loc[i, " delay_point"]

#         # print(delay_point)
#         values=[int(time_id)]+[int(road_id)]+[round(float(data.loc[i,key]),3) if '.'in str(data.loc[i,key]) else int(data.loc[i,key]) for key in ['avg_delay']]
#         roadconges_statistics[hour].append(values)
# print(roadconges_statistics)
# with open(output_directory, "w", encoding="utf-8") as f:
#     json.dump(roadconges_statistics, f,ensure_ascii=False, indent=4)


