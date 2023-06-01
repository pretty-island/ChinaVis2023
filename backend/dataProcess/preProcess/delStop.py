# 把超过三分钟速度为0的车辆剔除：统计平均速度的时候不统计长时间停车的车辆

import json
import os
from datetime import datetime,timedelta
import pandas as pd
# 交通参与者数据所在文件路径
input_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/type/"
# 剔除后文件的输出路径
output_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/"


# 遍历每个半小时文件夹
for hour in range(1, 18):
    hour_folder = input_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
    type_files = os.listdir(hour_folder)
    # 遍历类型文件
    for type_file in type_files:
        file_path = os.path.join(hour_folder, type_file)
        
        # 读取车辆数据文件
        with open(file_path, "r") as f:
            data = [json.loads(line) for line in f]
        # 按时间排序
        sorted_data=sorted(data,key=lambda x: x["time_meas"])
        # 筛选移动的车辆和小于三分钟的停车数据
        filtered_data=[]
        vehicle_data={}
        # 需要删除的车辆数据
        record=[]
        # 真正要删除的数据
        remove=[]

        for i,item in enumerate(sorted_data):
            id = item["id"]
            is_moving=item["is_moving"]
            type=item["type"]
            if is_moving==0:
                if id not in vehicle_data:
                    vehicle_data[id]={"stop_time":datetime.fromtimestamp(item["time_meas"]/1000000),
                                    "moving_time":None,
                                    "record":[]}    
                    vehicle_data[id]["record"].append(i)
                else:
                    vehicle_data[id]["record"].append(i)
            else:                
                if id in vehicle_data and vehicle_data[id]["stop_time"] is not None:
                    moving_time = datetime.fromtimestamp(item["time_meas"] / 1000000)
                    stop_time = vehicle_data[id]["stop_time"]
                    if len(vehicle_data[id]["record"])>=180*2:
                        # 超过三分钟停车时间，记录确实需要删除的数据索引
                        vehicle_data[id]["stop_time"] = None
                        vehicle_data[id]["moving_time"] = moving_time
                        remove.extend(vehicle_data[id]["record"])
                        vehicle_data[id]["record"]=[]
                    else:
                        vehicle_data[id]["stop_time"] = None
                        vehicle_data[id]["moving_time"] = moving_time
                        vehicle_data[id]["record"]=[]
            
        for id , item in vehicle_data.items():
            if len(vehicle_data[id]["record"])>=180*2:
                remove.extend(vehicle_data[id]["record"])
        folder_name=output_directory+f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour/"
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)
        file_out = os.path.join(folder_name, type_file)

        for i,item in enumerate(sorted_data):           
            if i not in remove:    

                with open(file_out,"a") as f:
                    json.dump(item,f)
                    f.write('\n')
        # df=pd.DataFrame(result)
        # csv_file=folder_name+f"type_{type}.csv"
        # df.to_csv(csv_file,index=False)

hour_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/type/hour/"
outhour_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/hour/"

# 遍历每个小时文件夹
for hour in range(7, 16):
    hour_folder = hour_directory + f"{hour}hour"
    type_files = os.listdir(hour_folder)
    # 遍历类型文件
    for type_file in type_files:
        file_path = os.path.join(hour_folder, type_file)
        
        # 读取车辆数据文件
        with open(file_path, "r") as f:
            data = [json.loads(line) for line in f]
        # 按时间排序
        sorted_data=sorted(data,key=lambda x: x["time_meas"])
        # 筛选移动的车辆和小于三分钟的停车数据
        filtered_data=[]
        vehicle_data={}
        # 需要删除的车辆数据
        record=[]
        # 真正要删除的数据
        remove=[]
        for i,item in enumerate(sorted_data):
            id = item["id"]
            is_moving=item["is_moving"]
            type=item["type"]
            if is_moving==0:
                if id not in vehicle_data:
                    vehicle_data[id]={"stop_time":datetime.fromtimestamp(item["time_meas"]/1000000),
                                    "moving_time":None,
                                    "record":[]}    
                    vehicle_data[id]["record"].append(i)
                else:
                    vehicle_data[id]["record"].append(i)
            else:                
                if id in vehicle_data and vehicle_data[id]["stop_time"] is not None:
                    moving_time = datetime.fromtimestamp(item["time_meas"] / 1000000)
                    stop_time = vehicle_data[id]["stop_time"]
                    if len(vehicle_data[id]["record"])>=180*2:
                        # 超过三分钟停车时间，记录确实需要删除的数据索引
                        vehicle_data[id]["stop_time"] = None
                        vehicle_data[id]["moving_time"] = moving_time
                        remove.extend(vehicle_data[id]["record"])
                        vehicle_data[id]["record"]=[]
                    else:
                        vehicle_data[id]["stop_time"] = None
                        vehicle_data[id]["moving_time"] = moving_time
                        vehicle_data[id]["record"]=[]
        for id , item in vehicle_data.items():
            if len(vehicle_data[id]["record"])>=180*2:
                remove.extend(vehicle_data[id]["record"])
        folder_name=outhour_directory+f"{hour}hour"
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)
        file_out = os.path.join(folder_name, type_file)
        for i,item in enumerate(sorted_data):           
            if i not in remove:    
                with open(file_out,"a") as f:
                    json.dump(item,f)
                    f.write('\n')