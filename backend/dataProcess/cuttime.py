# 数据处理：按小时划分数据，每个小时一个文件

import json
from datetime import datetime

# 源文件所在目录路径
input_directory = "../../data/situation/"
# 按小时划分后的JSON文件保存目录路径
output_directory = "../../data/situation/time/"

# 遍历所有源文件
for i in range(10):
    with open(
        input_directory
        + f"part-0000{i}-f54e552a-6c3d-4dc3-bb38-550e2f491b47-c000.json",
        "r",
        encoding="utf-8",
    ) as f:
        # 由于文件中有多行，直接读取会出现错误，因此一行一行读取
        for line in f.readlines():
            data = json.loads(line)

            # 获取当前数据的时间戳
            timestamp = data["time_meas"]

            # 将时间戳转换为datetime对象，获取小时数
            dt = datetime.fromtimestamp(timestamp / 1000000)
            hour = dt.hour

            # 构造目标文件名
            output_file_name = f"hour_{hour}.json"

            # 将数据追加到目标文件中
            with open(
                output_directory + output_file_name, "a", encoding="utf-8"
            ) as output_file:
                output_file.write(line)
            output_file.close()
    f.close()
