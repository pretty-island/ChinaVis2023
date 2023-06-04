import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getQueCar, getRoad } from '../../../apis/api';

const Flow: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    interface RoadData {
        type: number;
        roads: {
            road: string;
            count: number;
            avg_speed: number;
        }
    }
    const [roadData, setRoadData] = useState<RoadData[]>([]);
    // 获取数据
    useEffect(() => {
        getRoad("/getRoad").then((res) => {
            setRoadData(res.data);
        });
    }, []);

    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current);
            }

            const data = [];
            // const roadArray = [];


            roadData.map((dataItem) => {
                const { type, roads } = dataItem;

                roads.forEach((road) => {
                    const { road: r, count, avg_speed} = road;
                    // roadArray.push(r);

                    const existingIndex = data.findIndex((item) => item.name === r);
                    if (existingIndex !== -1) {
                        // 如果已存在道路的数据项，则累加车流量
                        data[existingIndex].value += count;
                        data[existingIndex].avg_speed=(avg_speed+data[existingIndex].avg_speed)

                    } else {
                        // 如果不存在道路的数据项，则创建新的数据项
                        data.push({ "name": r, "value": count ,"avg_speed":avg_speed});
                    }
                });
            });
            data.sort(function (a, b) {
                return a.value - b.value;
            });
            console.log("data");
            console.log(data);

            // const roadsdata = [...new Set(roadArray)];
            const roadList = data.map(function (item) {
                return item.name;
            })

            const dataList = data.map(function (item) {
                return item.value;
            })
            const speedList = data.map(function (item) {
                return (item.avg_speed/6).toFixed(3);
            })

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
                color: [
                    // "#003A6C",
                    "#33C0CD",
                    "#73ACFF",
                    "#9E87FF",
                    "#FE6969",
                    "#FDB36A",
                    "#FECE43",
                ],
                title: [
                    {
                        left: 'center',
                        // text: '路口排队车辆统计'
                    }
                ],
                textStyle: {
                    color: "#fff",
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '2%',
                    right: '24%',
                    bottom: '5%',
                    top: '5%',
                    containLabel: true
                },
                legend: {
                    //     // data: ['总车流量', '排队车辆']
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'SourceHanSansCN-Regular',
                        color: '#FFFFFF',
                    },
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
                        name: "速度（m/s）",
                        splitLine: { show: false },
                        axisLine: {
                            lineStyle: {
                                color: "#B4B4B4",
                            },
                        },
                        axisLabel: {
                            //   formatter: "{value} m/s",
                        },
                        boundaryGap: true
                    }, {
                        // type:"category",
                        name: "流量（辆）",
                        // min:10000,
                        // data: dateList,
                        boundaryGap:true,
                        type: 'value',
                        axisLabel: {
                              formatter:function(value){
                                return (value/10000).toFixed(0)+"万"
                              },
                        },
                        // boundaryGap: [0, 0.01]
                    },


                ],
                yAxis: [
                    {
                        // name: '道路',
                        // min: 90
                        type: 'category',
                        data: roadList
                    },

                ],
                series: [
                    // {
                    //     name: '排队车辆',
                    //     type: 'line',
                    //     showSymbol: false,
                    //     stack: 'Total',
                    //     data: stopList
                    // },
                    // {
                    //     name: '总车流量',
                    //     type: 'line',
                    //     showSymbol: false,
                    //     stack: 'Total',
                    //     data: allList
                    // }
                    {
                        name: '道路流量',
                        type: 'bar',
                        xAxisIndex: 1,
                        // barWidth:20,
                        data: dataList
                    },
                    {
                        name: '道路平均速度',
                        type: 'line',
                        smooth: true,
                        
                        // itemStyle: {
                        //     normal: {
                        //         //   color: "#F02FC2",
                        //     },
                        // },
                        // barWidth:20,
                        data: speedList
                    },

                    // {
                    //     name: '2012',
                    //     type: 'bar',
                    //     data: [19325, 23438, 31000, 121594, 134141, 681807]
                    // }
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
export default Flow;