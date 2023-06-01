# 把每小时的交通参与者数据根据道路id(road_sec_id)划分到不同文件里：/road/7hour/road_{road_sec_id}.json

import json
import os
# 交通参与者数据所在文件路径
input_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/time_with_road/"
# 划分后文件的输出路径
output_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/road/"


# 创建小时文件夹（如果不存在）
def create_hour_folder(hour):
    folder_name=f"D:/VIScode/chinavis-2023/backend/data/situation/time/road/{hour}hour"
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)

# # 读取少量数据作为测试
# vehicle_data=[]
# with open(input_directory+f"test_with_roads.json","r") as f:
#     for line in f:
#         vehicle=json.loads(line)
#         vehicle_data.append(vehicle)
# create_hour_folder("test")
# for vehicle in vehicle_data:
#     road_sec_id=vehicle['road_sec_id']
#     file_name=f"testhour/road_{road_sec_id}.json"
#     with open(output_directory+file_name,"a") as f:
#         json.dump(vehicle,f)
#         f.write('\n')

# 按小时读取交通参与者数据并处理
for i in range(15, 16):
    vehicle_data=[]
    with open(input_directory+f"{i}hour_with_roads.json","r") as f:
        for line in f:
            vehicle=json.loads(line)
            vehicle_data.append(vehicle)
    create_hour_folder(i)
    for vehicle in vehicle_data:
        road_sec_id=vehicle['road_sec_id']
        file_name=f"{i}hour/road_{road_sec_id}.json"
        with open(output_directory+file_name,"a") as f:
            json.dump(vehicle,f)
            f.write('\n')
