# 在类型文件夹下，划分不同的道路：每小时、半小时都要分

# 道路分段:按road_sec_id，有问题：统计不到很多行人的数据。
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
        687,
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
    "道路15": [538, 539, 2048],
}
# 道路分段:road_sec_id为0的按fid划分
fid_road = {
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
        70116,
        70117,
        2546,
        2547,
        2281,
        2312,
        2313,
        2322,
        2323,
        2328,
        2329,
        2330,
        2331,
        2333,
        2540,
        2853,
        70450,
        70453,
        70456,
    ],
    "道路3": [
        2282,
        2318,
        2319,
        2326,
        2327,
        2539,
        2545,
        2850,
        2851,
        2852,
        70118,
        70119,
        70449,
        70451,
        70455,2098,2356,70459,2089,2090,2091,2542,70468,2075,2076,70464
    ],
    "道路4": [4946,4947,70121,70124,70120,70125,2092,2093,2094,2541,70467,2083,2084,70463,2097,2357,70462,70122,70123,2134,2135,2136,2137,70482,2109,2110,2111,2120,70476,2112,2116,70474,],
    "道路5": [70126,70141,2129,2130.2131,2133,70481,2106,2107,2108,70475,2114,2118,70472,70127],
    "道路6": [70550,80700,80701,70547,80698,80699,70072,70073],
    "道路7": [2366,70549,80695,82002,70545,80542,81518,70556,81006,81007,70553,81004,81005,70074,70075,70076,70077,70078,70079],
    "道路8": [70555,81002,81003,81016,81500,70551,81000,81001,2990,2991,70561,2994,70559,4814,70080,70081],
    "道路9": [2988,2989,70562,2998,2997,70558,70566,80983,80984,70565,80981,80982,2984,70082,70083,70084,70085,],
    "道路10": [70567,80977,80980,70564,80978,80979,70086,70087,70088,70089],
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
        70548,80539,80540,70546,80696,80697,70237,70238,70599,70600,80551,
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
        82031,],
    "道路12": [
        2314,
        2315,
        2316,
        2317,
        2324,
        2325,
        2332,
        2334,
        2335,
        2339,
        2854,
        2855,
        70247,
        70255,
        70256,
        70447,
        70454,
        70457,
        70554,81012,81013,81014,81015,70552,81008,81009,81010,81011,70248,70249,70250,70251,70252,70253,70254
    ],
    "道路13": [2087,2088,70470,2077,2078,2079,70466,2097,2357,70462,2085,2086,70469,2080,2081,2082,70465,2099,2355,70460,2995,2996,70560,2992,2993,70557,2811,4813,2999,2362, 2363, 2364,2365,2367],
    "道路14": [70267,70268,2125,2126,2127,2128,70480,2103,2104,2105,70477,2115,2119,70473,2435,2436,2437,2438,2439,2440,70274,70275,70601,70602,70273, 70276,2121,2122,2123,2124,70479,2100,2101,2102,70478,2113,2117,70471,2982,70568,80987,80988,70563,80985,80986,2979,2980,2981,2985,2983],
    "道路15": [
        2095,
        2132,
        2308,
        2309,
        2310,
        2311,
        2320,
        2321,
        2336,
        2337,
        2338,
        70241,
        70242,
        70243,
        70244,
        70448,
        70452,
        70458,
    ]
}
import os
import json


# # 先处理半小时
# # 车辆数据路径
# halfIn_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/"
# # 划分后文件的输出路径
# halfOut_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/type_nostop/road/"
# # 先打开类型车辆数据文件
# # 遍历每个半小时文件夹
# for hour in range(0, 18):
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
#             # road_sec_id = item["road_sec_id"]
#             fid=item["fid"]
#             type=item["type"]
#             # for road_name, road_sec_ids in sec.items():
#             #     file_out = os.path.join(folder_name, f"{road_name}.json")
#             #     if road_sec_id in road_sec_ids:
#             #         # 如果这条数据在这个道路上
#             #         with open(file_out,"a") as f:
#             #             json.dump(item,f)
#             #             f.write('\n')
#             for road_name, fids in fid_road.items():
#                 file_out = os.path.join(folder_name, f"{road_name}.json")
#                 if fid in fids:
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
# 遍历每个小时文件夹
for hour in range(14, 16):
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
            fid=item["fid"]
            for road_name, road_sec_ids in sec.items():
                file_out = os.path.join(folder_name, f"{road_name}.json")
                if road_sec_id in road_sec_ids:
                    # 如果这条数据在这个道路上
                    with open(file_out, "a") as f:
                        json.dump(item, f)
                        f.write("\n")
            for road_name, fids in fid_road.items():
                file_out = os.path.join(folder_name, f"{road_name}.json")
                if fid in fids:
                    # 如果这条数据在这个道路上
                    with open(file_out,"a") as f:
                        json.dump(item,f)
                        f.write('\n')
