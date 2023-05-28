# 每半小时分为一个文件

import json
from datetime import datetime

# 交通参与者数据所在文件路径
input_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/time_with_road/"
# 划分后文件的输出路径
output_directory = "D:/VIScode/chinavis-2023/backend/data/situation/time/hour/"

# 遍历所有源文件
for i in range(8, 16):
    with open(input_directory + f"{i}hour_with_roads.json", "r") as f:
        # 由于文件中有多行，直接读取会出现错误，因此一行一行读取
        for line in f.readlines():
            data = json.loads(line)
           
            # 获取当前数据的时间戳
            timestamp = data["time_meas"]

            # 将时间戳转换为datetime对象，获取小时数
            dt = datetime.fromtimestamp(timestamp / 1000000)
            hour = dt.hour
            # 获取分钟数
            minute=dt.minute
            if minute<30:

                # 构造目标文件名
                output_file_name = f"hour_{hour}_00.json"

                # 将数据追加到目标文件中
                with open(
                    output_directory + output_file_name, "a", encoding="utf-8"
                ) as output_file:
                    output_file.write(line)
            elif minute>=30:
                # 构造目标文件名
                output_file_name = f"hour_{hour}_30.json"

                # 将数据追加到目标文件中
                with open(
                    output_directory + output_file_name, "a", encoding="utf-8"
                ) as output_file:
                    output_file.write(line)
