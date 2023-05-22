from flask import Flask, jsonify, json, request
from flask_cors import CORS
from datetime import datetime, timedelta

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



if __name__ == "__main__":
    app.run(port=5000, debug=True)  # host默认127.0.0.1 端口默认5000
