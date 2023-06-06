from flask import Flask, jsonify, json, request
from flask_cors import CORS
from datetime import datetime, timedelta
import pandas as pd

app = Flask(__name__)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
cors = CORS(app, resources={r"/*": {"origins": "*"}})


# 匹配的路由
@app.route("/")
def hello_world():
    print(111)
    # 返回给前端的数据
    return jsonify({"message": "Hello, World!"})


@app.route("/passParam", methods=["POST"])
def hello_world_2():
    param = request.json
    print(param)
    return jsonify({"message": "Hello, World2!"})


# 获取所有道路所有时间的不同类型的车流量和速度
@app.route("/getTotal")
def getTotal():
    directory = "./dataProcess/data/total/total.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取所有道路每小时的不同类型的车流量和速度
@app.route("/getHourTotal")
def getHourTotal():
    directory = "./dataProcess/data/total/hourtotal.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取所有道路每半小时的不同类型的车流量和速度
@app.route("/getHalfTotal")
def getHalfTotal():
    directory = "./dataProcess/data/total/halftotal.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取所有道路每分钟的不同类型的车流量和速度
@app.route("/getMinTotal")
def getMinTotal():
    directory = "./dataProcess/data/total/mintotal.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取不同道路所有时间的不同类型的车流量和速度
@app.route("/getRoad")
def getRoad():
    directory = "./dataProcess/data/road/road.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取不同道路每小时的不同类型的车流量和速度
@app.route("/getHourRoad")
def getHourRoad():
    directory = "./dataProcess/data/road/hourroad.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取不同道路每半小时的不同类型的车流量和速度
@app.route("/getHalfRoad")
def getHalfRoad():
    directory = "./dataProcess/data/road/halfroad.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取不同道路每分钟的不同类型的车流量和速度
@app.route("/getMinRoad")
def getMinRoad():
    directory = "./dataProcess/data/road/minroad.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


# # 获取每半小时所有道路的不同类型的车流量和速度：包括所有类型总车流量、所有机动车总车流量
# @app.route("/getAllFlow")
# def getAllFlow():
#     directory = "./dataProcess/data/flow/flowHalf.json"  # json文件所在路径
#     with open(directory, "r", encoding="utf-8") as f:
#         data = json.load(f)  # 读取到的数据
#     return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取排队车辆统计数据
@app.route("/getQueCar")
def getQueCar():
    directory = "./dataProcess/carProcess/data/9.05count.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    f.close()
    return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取断面车辆统计数据：每隔一小时统计车辆数量
@app.route("/getFlow")
def getflow():
    directory = "./dataProcess/carProcess/data/9.05flow.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取每隔一小时不同道路不同车辆类型的车流量和平均速度：每隔一小时统计一次各个道路各个车辆类型的所有数量和平均速度
# @app.route("/getStatis")
# def getStatis():
#     directory = "./dataProcess/data/statis.json"  # json文件所在路径
#     with open(directory, "r", encoding="utf-8") as f:
#         data = json.load(f)  # 读取到的数据
#     return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取每隔一小时不同道路的车流量：15段路
@app.route("/getHeat")
def getHeat():
    directory = "./dataProcess/data/carheat.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


@app.route("/getEventTable",methods=["GET"])
def getEventTable():
    hour=request.args.get("hour")
    event_name=request.args.get("event_name")

    file_path = f"./dataProcess/data/abnormal/{hour}h/{event_name}.csv"
    # file_path = f"./dataProcess/data/abnormal/{hour}/time_true_cross.csv"
    data = pd.read_csv(file_path)
    data = data[["id", "time", "road","event_name"]]
    data = data.to_json(orient="records")
    return data

@app.route("/getEvent")
def getEvent():
    directory = "./dataProcess/data/abnormal/event.json"  # json文件所在路径
    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


if __name__ == "__main__":
    app.run(port=5000, debug=True)  # host默认127.0.0.1 端口默认5000
