# 统计一条路上的排队车辆统计
import json

# 排队车辆统计路口路段表
sec={"路口1":{"左":[441,1],"右":[8,7],"上":[102,104,106,108]},
     "路口2":{"左":[5,4],"右":[14,13],"上":[81,536,537]},
     "路口3":{"左":[11,10,9],"右":[20,19],"上":[558,1002,1004],"下":[1797]},
     "路口4":{"左":[17,16],"右":[26,25,24],"上":[78,693,694],"下":[98]},
     }


# 车辆数据路径
input_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/road/"
# 输出文件保存路径
output_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/carflow.json"

# 读取车辆数据
with open(input_directory, "r") as file:
    data = json.load(file)

# 处理数据
result = []
for road_name, road_sec_ids in sec.items():
    # 初始化累加变量
    count = 0
    speed = 0
    for entry in data:
        hour = entry["hour"]
        road_data = entry["road"]
        for road_entry in road_data:
            road_sec_id = road_entry["road_sec_id"]
            count_all = road_entry["count_all"]
            avg_speed = road_entry["avg_all"]

            if road_sec_id in road_sec_ids:
                # 累加车流量和平均速度
                count += count_all
                speed = (speed + avg_speed) / 2

        # 计算平均速度
        # avg_speed = speed / len(road_sec_ids)

        result_entry = {"hour": hour, "road": road_name, "count": count, "speed": speed}
        result.append(result_entry)
        
        print(result_entry)
# 保存结果到JSON文件
with open(output_directory, "w", encoding="utf-8") as file:
    json.dump(result, file, ensure_ascii=False, indent=4)