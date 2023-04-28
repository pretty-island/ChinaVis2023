from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# 匹配的路由
@app.route('/')
def hello_world():
    print(111)

    # 返回给前端的数据
    return jsonify({'message': 'Hello, World!'})

@app.route('/passParam', methods = ['POST'])
def hello_world_2():
    param = request.json
    print(param)
    return jsonify({'message': 'Hello, World2!'})
    


if __name__ == '__main__':
    app.run(
        port=5000,   # host默认127.0.0.1 端口默认5000
        debug=True
    )
