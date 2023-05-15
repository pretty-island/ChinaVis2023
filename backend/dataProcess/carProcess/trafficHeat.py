# 道路车流量分析
# 考虑不同交通参与者的数量和比例
# 统计每小时每个道路经过的总车辆数量（包括行人和非机动车），先根据车辆类型分别统计各自的数量，总数量就是各自数量之和
# 车辆热力图：先展示每小时每个道路的总数
# 顺便统计每个道路上每个交通参与者的停止数量

import json

# 交通参与者数据所在文件路径
input_directory="D:/VIScode/chinavis-2023/backend/data/situation/time/time_with_road/"
# 统计结果输出路径
output_directory="D:/VIScode/chinavis-2023/backend/dataProcess/data/"

# 读取交通参与者数据

