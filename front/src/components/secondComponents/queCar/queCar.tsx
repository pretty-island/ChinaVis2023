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

            var category = [];
            var dottedBase = [];
            var lineData = [
                18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715, 48444, 50415, 56061,
                62677, 69521, 77560, 85038, 92477, 102268,
            ];
            var barData = [
                4600, 5000, 5500, 6500, 7500, 8500, 9900, 12500, 14000, 21500, 23200, 24450,
                25250, 33300, 35800, 45400, 59810,
            ];
            var rateData = [];

            for (var i = 0; i < 17; i++) {
                var date = i + 2001;
                category.push(date);
                var rate = barData[i] / lineData[i];
                rateData[i] = rate.toFixed(2);
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
                tooltip: {
                    trigger: 'axis',
                    // backgroundColor: "rgba(255,255,255,0.1)",
                    axisPointer: {
                        type: "shadow",
                        label: {
                            show: true,
                            // backgroundColor: "#7B7DDC",
                            color: "#fff"
                        },
                    },
                },
                legend: {
                    // data: ['总车流量', '排队车辆']
                    textStyle: {
                        color: "#fff",
                    },
                    top: "0%",
                },
                textStyle: {
                    color: "#fff",
                },
                grid: {
                    x: "5%",
                    width: "89%",
                    y: "10%",
                },
                xAxis: [
                    {
                        type: "category",
                        name: "时间",
                        data: dateList,
                        axisLine: {
                            lineStyle: {
                                color: "#B4B4B4",
                            },
                        },
                        // boundaryGap:true
                    },

                ],
                yAxis: [
                    {
                        splitLine: { show: false },
                        axisLine: {
                            show:true,
                            lineStyle: {
                                color: "#B4B4B4",
                            },
                        },
                        axisLabel: {
                            formatter: "{value}",
                        },
                        axisTick: {
                            show: true,
                          },
                        name: '车辆数量（辆）',
                        // min: 90
                    },

                ],
                series: [
                    {
                        name: '排队车辆',
                        type: "bar",
                        barWidth: 10,
                        itemStyle: {
                            normal: {
                              barBorderRadius: 3,
                              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: "#65a9f3" },
                                { offset: 1, color: "#15325b" },
                                // { offset: 0, color: "#956FD4" },
                                // { offset: 1, color: "#3EACE5" },
                              ]),
                            },
                          },
                        showSymbol: false,
                        data: stopList
                    },
                    {
                        name: '总车流量',
                        type: "bar",
                        barGap: "-100%",
                        showSymbol: false,
                        barWidth: 10,
                        itemStyle: {
                          normal: {
                            barBorderRadius: 3,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                              { offset: 0, color: "rgba(22, 104, 220,0.5)" },
                              { offset: 0.2, color: "rgba(22, 104, 220,0.3)" },
                              { offset: 1, color: "rgba(22, 104, 220,0)" },
                            ]),
                          },
                        },
                        z: -12,
                        data: allList
                    }
                ]
            };
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