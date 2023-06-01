# 为车辆数据文件加上车辆所在的道路
# 使用了geopandas库来读取道路数据文件，将其转换为GeoDataFrame对象。然后，我们使用json库来读取每个车辆数据文件，并使用shapely库中的Point对象来表示车辆位置。使用distance方法计算每个车辆到每条道路的距离，并使用idxmin方法找到距离最近的道路。最后，将每个车辆所在的道路属性保存到新的车辆数据集中，并将其写入新的文件中。
import json
import geopandas as gpd
from shapely.geometry import Point

# 道路数据所在文件路径
road_directory = "D:/VIScode/chinavis-2023/backend/data/situation/road2-12-9road/laneroad_with9road.geojson"
# 车辆数据所在路径
vehicle_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/"
# 处理后数据保存路径
output_directory = (
    "D:/VIScode/chinavis-2023/backend/data/situation/time/time_with_road/"
)


# 读取道路数据
road_data = gpd.read_file(road_directory)

# # 读取少量车辆数据作为测试
# vehicle_data = []
# with open(vehicle_directory + "car/car_9.00-9.05/test.json", "r") as f:
#     for line in f:
#         vehicle = json.loads(line)
#         vehicle_data.append(vehicle)

# # Loop through each vehicle and match it to the nearest road
# for vehicle in vehicle_data:
#     vehicle_position = Point(
#         json.loads(vehicle["position"])["x"], json.loads(vehicle["position"])["y"]
#     )
#     nearest_road = road_data.distance(vehicle_position).idxmin()
#     # nearest_road = road_data.to_crs("EPSG:3395").distance(vehicle_position.to_crs("EPSG:3395")).idxmin()
#     vehicle["road_sec_id"] = int(road_data.loc[nearest_road]["road_sec_id"])
#     vehicle["fid"]=int(road_data.loc[nearest_road]["fid"])
#     vehicle["turn_type"]=int(road_data.loc[nearest_road]["turn_type"])
#     vehicle["category"]=int(road_data.loc[nearest_road]["category"])

# # Write out the updated vehicle data to a new file
# with open(output_directory + "test_with_roads.json", "a") as f:
#     for vehicle in vehicle_data:
#         f.write(json.dumps(vehicle) + "\n")

# 读取所有的车辆数据并且一个一个处理
for i in range(8, 16):
    vehicle_data = []
    with open(vehicle_directory + f"hour_{i}.json", "r") as f:
        for line in f:
            vehicle = json.loads(line)
            vehicle_data.append(vehicle)

    # Loop through each vehicle and match it to the nearest road
    with open(output_directory + f"{i}hour_with_roads.json", "a") as f:
        for vehicle in vehicle_data:
            vehicle_position = Point(
                json.loads(vehicle["position"])["x"], json.loads(vehicle["position"])["y"]
            )
            nearest_road = road_data.distance(vehicle_position).idxmin()
            vehicle["road_sec_id"] = int(road_data.loc[nearest_road]["road_sec_id"])
            vehicle["fid"] = int(road_data.loc[nearest_road]["fid"])
            vehicle["turn_type"] = int(road_data.loc[nearest_road]["turn_type"])
            vehicle["category"] = int(road_data.loc[nearest_road]["category"])
            f.write(json.dumps(vehicle) + "\n")
                
