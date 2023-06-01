# 在类型文件夹下，划分不同的道路：每小时、半小时都要分

# 道路分段:按road_sec_id，有问题：统计不到很多行人的数据。
# sec = {
#     "道路1": [509, 510, 516, 1845, 642, 641],
#     "道路2": [518, 519, 520, 521, 522, 523, 640, 639, 811, 812],
#     "道路3": [369, 370, 524, 525, 526],
#     "道路4": [371, 372, 373, 374, 375, 376, 397, 398],
#     "道路5": [381, 395, 396],
#     "道路6": [1, 2, 441, 442],
#     "道路7": [3, 4, 5, 6, 7, 8],
#     "道路8": [9, 10, 11, 12, 13, 14, 1796],
#     "道路9": [15, 16, 17, 18, 19, 20],
#     "道路10": [21, 22, 23, 24, 25, 26],
#     "道路11": [
#         101,
#         102,
#         103,
#         104,
#         105,
#         106,
#         107,
#         108,
#         109,
#         110,
#         111,
#         112,
#         113,
#         114,
#         115,
#         116,
#         117,
#         124,
#         127,
#         128,
#     ],
#     "道路12": [80, 81, 82, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537],
#     "道路13": [
#         555,
#         556,
#         557,
#         558,
#         1001,
#         1002,
#         1003,
#         1004,
#         1005,
#         1006,
#         1007,
#         1008,
#         1009,
#         1010,
#         1011,
#         1020,
#         1021,
#         1796,
#         1797,
#     ],
#     "道路14": [
#         377,
#         378,
#         379,
#         380,
#         681,
#         687,
#         688,
#         689,
#         690,
#         691,
#         692,
#         693,
#         694,
#         77,
#         78,
#         98,
#         99,
#     ],
#     "道路15": [538, 539, 2048],
# }
# 路口fid：road_sec_id为0
road = {
    "路口1": [
        66,
        2340,
        2354,
        2360,
        70435,
        70436,
        70437,
        70438,
        70439,
        70440,
        70441,
        70442,
        70443,
        70444,
        70445,
        70446,
        80546,
        80547,
        80550,
        80551,
        80702,
        80703,
        80704,
        80705,
        80706,
        80707,
        80709,
        80710,
        80711,
        80712,
        80713,
        80715,
        80716,
        80717,
        80718,
        80719,
        80720,
        80721,
        80722,
        80723,
        80726,
        80727,
        80728,
        80729,
        80730,
        80733,
        82031,
        82032,
        82033,
        82035,
        82036,
    ]
}
# 路口四个方向fid：road_sec_id为0
road_to = {
    "路口1": {
        "左道路：道路1": {
            "直行": [2354, 70438, 80707, 80710, 80715],
            "左转": [
                70446,
                80705,
                80706,
                80711,
                80712,
            ],
            "右转": [
                70441,
                80709,
                80713,
            ],
            "掉头": [82032, 82033],
        },
        "右道路：道路2": {
            "直行": [
                66,
                2360,
                70437,
                80720,
                80721,
            ],
            "左转": [70445, 80719, 80733],
            "右转": [
                70439,
                80722,
                80723,
            ],
            "掉头": [82035, 82036],
        },
        "上道路：道路15": {
            "直行": [70435, 80550, 80551],
            "左转": [
                70444,
                80728,
                80729,
                80730,
            ],
            "右转": [
                70440,
                80726,
                80727,
            ],
            "掉头": [82031],
        },
        "下道路：道路11": {
            "直行": [70436, 80546, 80547],
            "左转": [2340, 70443, 80702, 80703, 80704],
            "右转": [70442, 80716, 80717, 80718],
            "掉头": [null],
        },
    }
}
# 非路口机动车道
fid_0 = {
    "道路1":[null],
    "道路2": [70112, 70113, 70114, 70115, 70117, 2546, 2547],
    "道路11": [
        70233,
        70234,
        70235,
        70236,
    ],
    "道路15": [70231, 70232],
}
# 道路分段:road_sec_id为0的按fid划分
fid = {
    "道路1": [
        2354,
        70438,
        70441,
        70446,
        80705,
        80706,
        80707,
        80709,
        80710,
        80711,
        80712,
        80713,
        80715,
        82032,
        82033,
    ],
    "道路2": [
        66,
        2360,
        70437,
        70439,
        70445,
        80719,
        80720,
        80721,
        80722,
        80723,
        80733,
        82035,
        82036,
        70112,
        70113,
        70114,
        70115,
        70117,
        2546,
        2547,
    ],
    "道路3": [],
    "道路4": [],
    "道路5": [],
    "道路6": [],
    "道路7": [],
    "道路8": [],
    "道路9": [],
    "道路10": [],
    "道路11": [
        70436,
        2340,
        70442,
        70443,
        80546,
        80547,
        80702,
        80703,
        80704,
        80716,
        80717,
        80718,
        70233,
        70234,
        70235,
        70236,
    ],
    "道路12": [],
    "道路13": [],
    "道路14": [],
    "道路15": [
        80551,
        80550,
        70444,
        70440,
        70435,
        70231,
        70232,
        80726,
        80727,
        80728,
        80729,
        80730,
        82031,
    ],
    "道路16": [],
    "道路17": [],
    "道路18": [],
}
sec = {
    "道路1": [509, 510, 516, 1845, 642, 641],
    "道路2": [518, 519, 520, 521, 522, 523, 640, 639, 811, 812],
    "道路3": [369, 370, 524, 525, 526],
    "道路4": [371, 372, 373, 374, 375, 376, 397, 398],
    "道路5": [381, 395, 396],
    "道路6": [1, 2, 441, 442],
    "道路7": [3, 4, 5, 6, 7, 8],
    "道路8": [9, 10, 11, 12, 13, 14, 1796],
    "道路9": [15, 16, 17, 18, 19, 20],
    "道路10": [21, 22, 23, 24, 25, 26],
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
        1796,
        1797,
    ],
    "道路14": [
        377,
        378,
        688,
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
    "道路15": [117, 124],
    "道路16": [538, 539, 2048],
    "道路17": [1011, 1020, 1021],
    "道路18": [379, 380, 681, 687],
}
import os
import json


# 先处理半小时
# 车辆数据路径
# halfIn_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/"
# 划分后文件的输出路径
# halfOut_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/road/"
# 先打开类型车辆数据文件
# 遍历每个半小时文件夹
# for hour in range(9, 18):
#     hour_folder = halfIn_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     type_files = os.listdir(hour_folder)
#     hour_folder_out=halfOut_directory + f"{int(hour/2+7)}_{0 if hour%2==0 else 3}0hour"
#     if not os.path.exists(hour_folder_out):
#         os.makedirs(hour_folder_out)
#     # 遍历类型文件
#     for type_file in type_files:
#         file_path = os.path.join(hour_folder, type_file)
#         str=type_file.split(".")[0]
#         folder_name=hour_folder_out+f"/{str}"
#         if not os.path.exists(folder_name):
#             os.makedirs(folder_name)
#         # 读取车辆数据文件
#         with open(file_path, "r") as f:
#             data = [json.loads(line) for line in f]
#         for item in data:
#             road_sec_id = item["road_sec_id"]
#             type=item["type"]
#             for road_name, road_sec_ids in sec.items():
#                 file_out = os.path.join(folder_name, f"{road_name}.json")
#                 if road_sec_id in road_sec_ids:
#                     # 如果这条数据在这个道路上
#                     with open(file_out,"a") as f:
#                         json.dump(item,f)
#                         f.write('\n')

# 处理一小时的数据
# 车辆数据路径
hourIn_directory = (
    "D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/hour/"
)
# 划分后文件的输出路径
hourOut_directory = (
    "D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/hour/road/"
)
# 先打开类型车辆数据文件
# 遍历每个半小时文件夹
for hour in range(9, 10):
    hour_folder = hourIn_directory + f"{hour}hour"
    type_files = os.listdir(hour_folder)
    hour_folder_out = hourOut_directory + f"{hour}hour"
    if not os.path.exists(hour_folder_out):
        os.makedirs(hour_folder_out)
    # 遍历类型文件
    for type_file in type_files:
        file_path = os.path.join(hour_folder, type_file)
        type = type_file.split(".")[0]
        folder_name = hour_folder_out + f"/{type}"
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)
        # 读取车辆数据文件
        with open(file_path, "r") as f:
            data = [json.loads(line) for line in f]
        for item in data:
            road_sec_id = item["road_sec_id"]
            for road_name, road_sec_ids in sec.items():
                file_out = os.path.join(folder_name, f"{road_name}.json")
                if road_sec_id in road_sec_ids:
                    # 如果这条数据在这个道路上
                    with open(file_out, "a") as f:
                        json.dump(item, f)
                        f.write("\n")
