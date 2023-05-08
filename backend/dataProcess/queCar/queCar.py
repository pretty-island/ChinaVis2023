# 数据处理：排队车辆统计【9:00-9:05】 每十秒时间段内排队车辆数量
# 数据采集：每秒钟采集两次数据，一辆车在1秒内有两条数据
# 10秒统计一次全部数据中的停车数量，不分路口

from datetime import datetime, timedelta
# import datetime
import json
import csv

# 源文件所在目录路径
input_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/car/car_9.00-9.05/9.05.json"
# 输出文件保存目录路径
output_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/car/car_9.00-9.05/"

# 读取车辆数据
data=[]
with open(input_directory, 'r') as f:
    data = json.load(f)
        
f.close()

# 定义时间间隔10秒
time_interval=timedelta(seconds=10)
# 定义字典存储不同时间段的车辆数据
time_data={}
# 处理每条车辆数据
for item in data:
    # 解析时间戳
    timestamp=item['time_meas']
    dt = datetime.fromtimestamp(timestamp / 1000000)
    # 获取时间段的起始时间
    time_start=dt-(dt-datetime.min)%time_interval
    # 将车辆数据添加到相应时间段
    if time_start not in time_data:
        time_data[time_start]={'all':set(),'stop':set()} # 新建时间段
    vehicle_id=item['id']
    is_moving=item['is_moving']
    if vehicle_id not in time_data[time_start]['stop']:  # 如果车辆id没有出现在静止车辆列表里且is_moving为0，则添加到静止车辆列表
        if not is_moving:
            time_data[time_start]['stop'].add(vehicle_id)
        if vehicle_id not in time_data[time_start]['all']: # 如果车辆id没有出现在所有车辆列表里，则添加到所有车辆列表。
            time_data[time_start]['all'].add(vehicle_id)
# 将结果保存到新的JSON文件
result=[]
for time_start in sorted(time_data.keys()):
    time_str=time_start.strftime('%H:%M:%S')
    all_vehicles=len(time_data[time_start]['all'])
    stop_vehicles=len(time_data[time_start]['stop'])
    result.append({'time':time_str, 'all_count':all_vehicles, 'stop_count':stop_vehicles})
with open(output_directory+"9.05count.json",'w') as f:
    json.dump(result,f)
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



