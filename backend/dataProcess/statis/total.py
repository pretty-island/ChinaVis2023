# 把每半小时的交通参与者数据根据type划分到不同文件里：/type/7_00hour/type_{type}.json
import json
import os

# 交通参与者数据所在文件路径
input_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/hour/"
# 划分后文件的输出路径
output_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/type/"


# 创建小时文件夹（如果不存在）
def create_00hour_folder(hour):
    folder_name=f"D:/VIScode/chinavis-2023/backend/data/situation/time/type/{hour}_00hour"
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
# 创建小时文件夹（如果不存在）
def create_30hour_folder(hour):
    folder_name=f"D:/VIScode/chinavis-2023/backend/data/situation/time/type/{hour}_30hour"
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)

# 按半小时读取交通参与者数据并处理
for i in range(10, 16):
    vehicle_data=[]
    with open(input_directory+f"hour_{i}_00.json","r") as f:
        for line in f:
            vehicle=json.loads(line)
            vehicle_data.append(vehicle)
    create_00hour_folder(i)
    for vehicle in vehicle_data:
        type=vehicle['type']
        file_name=f"{i}_00hour/type_{type}.json"
        with open(output_directory+file_name,"a") as f:
            json.dump(vehicle,f)
            f.write('\n')


# 按半小时读取交通参与者数据并处理
for i in range(10, 16):
    vehicle_data=[]
    with open(input_directory+f"hour_{i}_30.json","r") as f:
        for line in f:
            vehicle=json.loads(line)
            vehicle_data.append(vehicle)
    create_30hour_folder(i)
    for vehicle in vehicle_data:
        type=vehicle['type']
        file_name=f"{i}_30hour/type_{type}.json"
        with open(output_directory+file_name,"a") as f:
            json.dump(vehicle,f)
            f.write('\n')