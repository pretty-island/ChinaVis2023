// 车辆热力图
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getHeat, getStatis } from '../../../apis/api';

const CarHeat: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    // 
    interface HeatData {
        hour: string;
        road: string;
        count: number;
    }
    const [heatData, setHeatData] = useState<HeatData[]>([]);
    // 获取数据
    useEffect(() => {
        getHeat("/getHeat").then((res) => {
            const data = res.data;
            setHeatData(data);
        });
    }, []);

    // echarts
    useEffect(() => {
        if (chartRef.current != null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current, undefined);
            }

            const hour = heatData.map(function (item) {
                return item.hour;
            });
            const hours = [...new Set(hour)];
            const road = heatData.map(function (item) {
                return item.road;
            });
            const roads = [...new Set(road)];
            const roadCount = 15; // 道路数量
            const hourCount = 9; // 小时数量

            const data: [number, number, number][] = [];

            for (let r = 0; r < roadCount; r++) {
                for (let h = 0; h < hourCount; h++) {
                    const counts = heatData[r * hourCount + h]?.count
                    data.push([h, r, counts]);
                }
            }

            const option: EChartOption = {
                tooltip: {
                    position: 'top',
                    

                },
                grid: {
                    height: '50%',
                    top: '10%'
                },
                xAxis: {
                    type: 'category',
                    data: hours,
                    splitArea: {
                        show: true
                    }
                },
                yAxis: {
                    type: 'category',
                    data: roads,
                    splitArea: {
                        show: true
                    }
                },
                visualMap: [{
                    min: 100,
                    max: 6300,
                    // max: Math.max(...data.map((item) => item[2])),
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '15%'
                }],
                series: [
                    {
                        name: '车流量',
                        type: 'heatmap',
                        data: data,
                        label: {
                            show: true
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            if (option) {
                mychart.setOption(option, true);
            }
        }
    })
    return (
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    )
}
export default CarHeat;