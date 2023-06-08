# 路口拥堵数据
import json
import os
from collections import defaultdict
import pandas as pd
from datetime import datetime, timedelta

# 读取数据
input_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/crossdelay/"

# # 遍历每个路口文件夹，添加一列来表示time的序号
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
#             time = data.loc[i, "3"]
#             tm=pd.to_datetime(time)
#             # print(tm.minute//5)
#             time_id=tm.minute//5
#             cross_column.append(time_id)
#         data["time_id"] = cross_column
#         print(data)
#         data.to_csv(file_path,index=False)

# # 遍历文件，添加一列来表示方向
# for cross in range(1,2):
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
#             road_sec_id = data.loc[i, "0"]
#             road = None
#             if road_sec_id == 642:
#             # if road_sec_id == 520:
#             # if road_sec_id == 370:
#             # if road_sec_id == 373:
#             # if road_sec_id == 1:
#             # if road_sec_id == 5:
#             # if road_sec_id == 11:
#             # if road_sec_id == 17:
#                 road = "左"
#             elif road_sec_id == 639:
#             # elif road_sec_id == 526:
#             # elif road_sec_id == 376:
#             # elif road_sec_id == 396:
#             # elif road_sec_id == 8:
#             # elif road_sec_id == 14:
#             # elif road_sec_id == 26:
#                 road = "右"
#             elif road_sec_id == 115:
#             # elif road_sec_id == 532:
#             # elif road_sec_id == 1009:
#             # elif road_sec_id == 377:
#                 road = "下"
#             elif road_sec_id == 124:
#             # elif road_sec_id == 539:
#             # elif road_sec_id == 1021:
#             # elif road_sec_id == 380:
#             # elif road_sec_id == 102:
#             # elif road_sec_id == 81:
#             # elif road_sec_id == 78:
#                 road = "上"
#             cross_column.append(road)
#         data["turn"] = cross_column
#         print(data)
#         data.to_csv(file_path,index=False)

# # 遍历文件，添加一列来表示cross的序号
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
#             turn = data.loc[i, "turn"]
#             # road = None
#             if turn == "左":
#                 road = 25
#             elif turn == "右":
#                 road = 26
#             elif turn == "上":
#                 road = 27
            # if turn == "左":
            #     road = 22
            # elif turn == "右":
            #     road = 23
            # elif turn == "上":
            #     road = 24
            # if turn == "左":
            #     road = 19
            # elif turn == "右":
            #     road = 20
            # elif turn == "上":
            #     road = 21
            # if turn == "左":
            #     road = 16
            # elif turn == "右":
            #     road = 17
            # elif turn == "上":
            #     road = 18
            # if turn == "左":
            #     road = 12
            # elif turn == "右":
            #     road = 13
            # elif turn == "下":
            #     road = 14
            # elif turn == "上":
            #     road = 15
            # if turn == "左":
            #     road = 8
            # elif turn == "右":
            #     road = 9
            # elif turn == "下":
            #     road = 10
            # elif turn == "上":
            #     road = 11
            # if turn == "左":
            #     road = 4
            # elif turn == "右":
            #     road = 5
            # elif turn == "下":
            #     road = 6
            # elif turn == "上":
            #     road = 7
            # if turn == "左":
            #     road = 0
            # elif turn == "右":
            #     road = 1
            # elif turn == "下":
            #     road = 2
            # elif turn == "上":
            #     road = 3
            # cross_column.append(road)
        #     data.loc[i, "cross_id"]=road
        # # data["cross_id"] = cross_column
        # # print(data)
        # data.to_csv(file_path,index=False)

# 保存统计文件：每个路口每个方向的拥堵
output_directory = (
    "D:/VIScode/chinavis-2023/backend/dataProcess/data/crosscongestion.json"
)
roadconges_statistics = defaultdict(list)
# 遍历文件，添加一列来表示cross的序号
for cross in range(1,9):
    cross_folder = input_directory + f"路口{cross}"
    hour_files = os.listdir(cross_folder)
    # 获取气泡图数据
    for hour_file in hour_files:
        file_path = os.path.join(cross_folder, hour_file)
        hour=hour_file.split("h")[0]+"点"
        # print(hour)
        # 读取数据
        data = pd.read_csv(file_path)
        for i in range(len(data)):
            time_id=data.loc[i, "time_id"]
            cross_id=data.loc[i, "cross_id"]
            # print(data.head())
            # delay_point=data.loc[i, " delay_point"]

            # print(delay_point)
            values=[int(time_id)]+[int(cross_id)]+[round(float(data.loc[i,key]),3) if '.'in str(data.loc[i,key]) else int(data.loc[i,key]) for key in ['4']]
            roadconges_statistics[hour].append(values)
# print(roadconges_statistics)
with open(output_directory, "w", encoding="utf-8") as f:
    json.dump(roadconges_statistics, f,ensure_ascii=False, indent=4)


