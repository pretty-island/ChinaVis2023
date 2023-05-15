from datetime import datetime, timedelta
import datetime
# import datetime
import json
import csv

# 源文件所在目录路径
input_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/car/car_7.json"
# 输出文件保存目录路径
output_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/car/oneCar/"

# 读取车辆数据
data = []
with open(input_directory, "r") as f:
    # 由于文件中有多行，直接读取会出现错误，因此一行一行读取
    for line in f.readlines():
        dic = json.loads(line)
        data.append(dic)
f.close()
# # 提取车辆id为191252746的数据并将日期转为标准格式，保存到CSV文件
# vehicle_data=[]
# id=191252746
# for d in data:
#     if d['id']==191252746:
#         # 将时间戳转为常规模式
#         timestamp = str(d['time_meas'])[:-6]
#         dt_object=datetime.datetime.fromtimestamp(int(timestamp))
#         date_string=dt_object.strftime("%Y-%m-%d %H:%M:%S")
#         # 将单个数据添加到列表
#         vehicle_data.append([d['id'],date_string,d['seq'],d['is_moving'],d['position'], d['shape'], d['orientation'], d['velocity'], d['type'], d['heading'], d['ms_no']])
# # 将车辆数据按时间顺序排序
# vehicle_data.sort(key=lambda x:x[1])
# # 将车辆数据保存到CSV文件
# with open(output_directory+f"{id}.csv",'w',newline='') as f:
#     writer=csv.writer(f)
#     writer.writerow(['id', 'time_meas', 'seq', 'is_moving', 'position', 'shape', 'orientation', 'velocity', 'type', 'heading', 'ms_no'])
#     writer.writerows(vehicle_data)
# f.close()
# 结论：道路车辆数据每秒采集两次，该车辆id=191252746在这五分钟一直没有移动。

# 提取车辆id为197985822的数据并将日期转为标准格式，保存到CSV文件
vehicle_data = []
id = 197985822
for d in data:
    if d["id"] == id:
        # 将时间戳转为常规模式
        timestamp = str(d["time_meas"])[:-6]
        dt_object = datetime.datetime.fromtimestamp(int(timestamp))
        date_string = dt_object.strftime("%Y-%m-%d %H:%M:%S")
        # 将单个数据添加到列表
        vehicle_data.append(
            [
                d["id"],
                date_string,
                d["seq"],
                d["is_moving"],
                d["position"],
                d["shape"],
                d["orientation"],
                d["velocity"],
                d["type"],
                d["heading"],
                d["ms_no"],
            ]
        )
# 将车辆数据按时间顺序排序
vehicle_data.sort(key=lambda x: x[1])
# 将车辆数据保存到CSV文件
with open(output_directory + f"{id}.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(
        [
            "id",
            "time_meas",
            "seq",
            "is_moving",
            "position",
            "shape",
            "orientation",
            "velocity",
            "type",
            "heading",
            "ms_no",
        ]
    )
    writer.writerows(vehicle_data)
f.close()
# 结论：车辆id=197985822在2023/4/13  7:29:04 停止， 2023/4/13  7:29:25 再次移动 红灯20秒 位置{"x":-308.77216,"y":-304.30795,"z":12.875} "road_sec_id": 8,"fid": 207,"left_boundary_id": 210,
            # "right_boundary_id": 211； 或者"road_sec_id": 7,。
            # 7:29:58 停止7:30:33 停止 红灯35秒
