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
    directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/car/car_9.00-9.05/9.05count.json"  # json文件所在路径

    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    f.close()
    return json.dumps(data)  # 将结果转换为JSON格式并返回


# 获取断面车辆统计数据：每隔一小时统计车辆数量
@app.route("/getFlow")
def getflow():
    # 暂时先用排队车辆统计中的总车流量代替
    directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/car/car_9.00-9.05/9.05count.json"  # json文件所在路径   

    with open(directory, "r", encoding="utf-8") as f:
        data = json.load(f)  # 读取到的数据
    return json.dumps(data)  # 将结果转换为JSON格式并返回


if __name__ == "__main__":
    app.run(port=5000, debug=True)  # host默认127.0.0.1 端口默认5000
