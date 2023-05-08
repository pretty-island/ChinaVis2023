# 数据处理：获取9:00-9:05所有机动车的数据
import json
import datetime

input_file = "../../data/situation/time/car/car_9.json"
output_file = "../../data/situation/time/car/car_9.00-9.05/"
data = []
with open(input_file, "r", encoding="utf-8") as f:
    # 由于文件中有多行，直接读取会出现错误，因此一行一行读取
    for line in f.readlines():
        dic = json.loads(line)
        data.append(dic)
f.close()


# 将时间戳转换为 datetime.datetime 类型的时间戳
def timestamp_to_datetime(timestamp):
    return datetime.datetime.fromtimestamp(timestamp / 1000000)

# 将时间戳字符串转换为 datetime.datetime 类型的时间戳
def str_to_datetime(timestamp_str):
    timestamp = int(timestamp_str)
    return timestamp_to_datetime(timestamp)


# 时间戳转换
dt1=datetime.datetime(2023,4,13,9,0,0)
dt2=datetime.datetime(2023,4,13,9,5,0)

filtered_data=[]
for item in data:
   
    tms = str_to_datetime(item["time_meas"])    
    if dt1<=tms<dt2:
        filtered_data.append(item)

with open(output_file+"9.05.json", "a", encoding="utf-8") as f:
    json.dump(filtered_data, f, ensure_ascii=False, indent=2)
f.close()
