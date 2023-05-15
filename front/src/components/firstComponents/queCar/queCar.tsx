import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getQueCar } from '../../../apis/api';

const QueCar: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    interface QueData {
        time: string;
        all_count: number;
        stop_count: number;
    }
    const [queData, setQueData] = useState<QueData[]>([]);
    // 获取数据
    useEffect(() => {
        getQueCar("/getQueCar").then((res) => {
            const data = res.data;
            setQueData(data);

        });
    }, []);

    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current);
            }
            const dateList = queData.map(function (item) {
                return item.time;
            });
            const stopList = queData.map(function (item) {
                return item.stop_count;
            });
            const allList = queData.map(function (item) {
                return item.all_count;
            });
            const option: EChartOption = {
                // Make gradient line here
                // visualMap: [
                //     {
                //         show: false,
                //         type: 'continuous',
                //         seriesIndex: 0,
                //         min: 90,
                //         max: 200
                //     }

                // ],
                title: [
                    {
                        left: 'center',
                        // text: '路口排队车辆统计'
                    }
                ],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['总车流量', '排队车辆']
                },
                // axisPointer: {
                //     link: [
                //         {
                //             xAxisIndex: 'all'
                //         }
                //     ]
                // },
                // dataZoom: [
                //     {
                //         show: true,
                //         realtime: true,
                //         start: 30,
                //         end: 70,
                //         xAxisIndex: [0, 1]
                //     },
                // ],
                // grid: {
                //     containLabel: true,
                // },
                xAxis: [
                    {
                        // type:"category",
                        name: "时间",
                        data: dateList,
                        // boundaryGap:true
                    },

                ],
                yAxis: [
                    {
                        name: '车辆数量（辆）',
                        min: 90
                    },

                ],
                series: [
                    {
                        name: '排队车辆',
                        type: 'line',
                        showSymbol: false,
                        stack: 'Total',
                        data: stopList
                    },
                    {
                        name: '总车流量',
                        type: 'line',
                        showSymbol: false,
                        stack: 'Total',
                        data: allList
                    }
                ]
            };
            // option && mychart.setOption(option, true);
            if (option) {
                mychart.setOption(option, true);
            }
        }
    })
    return (
        <div ref={chartRef} style={{ width: "90%", height: "95%" }}></div>
    )
}
export default QueCar;