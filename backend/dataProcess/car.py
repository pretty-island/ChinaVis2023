# 数据处理：筛选所有的机动车车辆：car truck van bus 

import json 

# 读取JSON数据
directory = "../../data/situation/time/"  # json文件所在目录路径
#筛选所有的机动车车辆后的JSON文件保存目录路径
output_directory = "../../data/situation/time/car/"

for i in range(7,16):
    data = []
    with open(
        directory + f"hour_{i}.json",
        "r",
        encoding="utf-8",
    ) as f:
        # 由于文件中有多行，直接读取会出现错误，因此一行一行读取
        for line in f.readlines():
            data = json.loads(line)
            # 筛选所有机动车
            if data['type'] in [1,4,5,6]:
                # 将数据追加到目标文件中
                with open(
                    output_directory + f"car_{i}.json", "a", encoding="utf-8"
                ) as output_file:
                    output_file.write(line)
                output_file.close()
    f.close()
    
    