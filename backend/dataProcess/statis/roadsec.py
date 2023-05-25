# 根据统计的数据，计算每个大的路段的总车流量和平均速度
import json

# 道路分段
sec = {
    "道路1": [1, 2, 441, 442],
    "道路2": [3, 4, 5, 6, 7, 8],
    "道路3": [9, 10, 11, 12, 13, 14, 1796],
    "道路4": [15, 16, 17, 18, 19, 20],
    "道路5": [21, 22, 23, 24, 25, 26],
    "道路6": [509, 510, 516, 1845, 642, 641],
    "道路7": [518, 519, 520, 521, 522, 523, 640, 639, 811, 812],
    "道路8": [369, 370, 524, 525, 526],
    "道路9": [371, 372, 373, 374, 375, 376, 397, 398],
    "道路10": [381, 395, 396],
    "道路11": [
        101,
        102,
        103,
        104,
        105,
        106,
        107,
        108,
        109,
        110,
        111,
        112,
        113,
        114,
        115,
        116,
        117,
        124,
        127,
        128,
    ],
    "道路12": [80, 81, 82, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537],
    "道路13": [
        555,
        556,
        557,
        558,
        1001,
        1002,
        1003,
        1004,
        1005,
        1006,
        1007,
        1008,
        1009,
        1010,
        1011,
        1020,
        1021,
        1796,
        1797,
    ],
    "道路14": [
        377,
        378,
        379,
        380,
        681,
        687688,
        689,
        690,
        691,
        692,
        693,
        694,
        77,
        78,
        98,
        99,
    ],
    "道路15": [538, 539, 2048],
}
# 车辆统计数据路径
input_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/statis.json"
# 输出文件保存路径
output_directory = "D:/VIScode/chinavis-2023/backend/dataProcess/data/carheat.json"

# 读取车辆统计数据
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
