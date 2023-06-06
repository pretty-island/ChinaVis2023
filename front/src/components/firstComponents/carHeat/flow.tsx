import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getQueCar, getRoad } from '../../../apis/api';

const Flow: React.FC = ({ typeName }) => {
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
    const [flowspeed, setFlowspeed] = useState<RoadData[]>([]);
    // 获取数据
    useEffect(() => {
        getRoad("/getRoad").then((res) => {
            setRoadData(res.data);
        });
    }, []);
    // 设置数据
    useEffect(() => {
        if (typeName == "") {
            const data = [];
            roadData?.map((dataItem) => {
                const { type, roads } = dataItem;

                roads.forEach((road) => {
                    const { road: r, count, avg_speed } = road;
                    // roadArray.push(r);

                    const existingIndex = data.findIndex((item) => item.name === r);
                    if (existingIndex !== -1) {
                        // 如果已存在道路的数据项，则累加车流量
                        data[existingIndex].value += count;
                        data[existingIndex].avg_speed = (avg_speed + data[existingIndex].avg_speed)

                    } else {
                        // 如果不存在道路的数据项，则创建新的数据项
                        data.push({ "name": r, "value": count, "avg_speed": avg_speed });
                    }
                });
            });
            for (const item of data) {
                item.avg_speed = (item.avg_speed / 6).toFixed(3);
            }
            data.sort(function (a, b) {
                return b.value - a.value;
            });
            setFlowspeed(data)
            // if(typeName==""){
        }
        else if (typeName == "小型车辆流量") {
            const data = [];
            roadData?.map((dataItem) => {
                const { type, roads } = dataItem;
                if (type == 1) {
                    roads.forEach((road) => {
                        const { road: r, count, avg_speed } = road;
                        data.push({ "name": r, "value": count, "avg_speed": avg_speed });
                    });
                }
            });
            for (const item of data) {
                item.avg_speed = (item.avg_speed).toFixed(3);
            }
            data.sort(function (a, b) {
                return b.value - a.value;
            });
            setFlowspeed(data)
        }
        else if (typeName == "行人流量") {
            const data = [];
            roadData?.map((dataItem) => {
                const { type, roads } = dataItem;
                if (type == 2) {
                    roads.forEach((road) => {
                        const { road: r, count, avg_speed } = road;
                        data.push({ "name": r, "value": count, "avg_speed": avg_speed });
                    });
                }
            });
            for (const item of data) {
                item.avg_speed = (item.avg_speed).toFixed(3);
            }
            data.sort(function (a, b) {
                return b.value - a.value;
            });
            setFlowspeed(data)
        }
        else if (typeName == "非机动车流量") {
            const data = [];
            roadData?.map((dataItem) => {
                const { type, roads } = dataItem;
                if (type == 3) {
                    roads.forEach((road) => {
                        const { road: r, count, avg_speed } = road;
                        data.push({ "name": r, "value": count, "avg_speed": avg_speed });
                    });
                }
            });
            for (const item of data) {
                item.avg_speed = (item.avg_speed).toFixed(3);
            }
            data.sort(function (a, b) {
                return b.value - a.value;
            });
            setFlowspeed(data)
        }
        else if (typeName == "客车流量") {
            const data = [];
            roadData?.map((dataItem) => {
                const { type, roads } = dataItem;
                if (type == 6) {
                    roads.forEach((road) => {
                        const { road: r, count, avg_speed } = road;
                        data.push({ "name": r, "value": count, "avg_speed": avg_speed });
                    });
                }
            });
            for (const item of data) {
                item.avg_speed = (item.avg_speed).toFixed(3);
            }
            data.sort(function (a, b) {
                return b.value - a.value;
            });
            setFlowspeed(data)
        }
        else if (typeName == "卡车流量") {
            const data = [];
            roadData?.map((dataItem) => {
                const { type, roads } = dataItem;
                if (type == 4) {
                    roads.forEach((road) => {
                        const { road: r, count, avg_speed } = road;
                        data.push({ "name": r, "value": count, "avg_speed": avg_speed });
                    });
                }
            });
            for (const item of data) {
                item.avg_speed = (item.avg_speed).toFixed(3);
            }
            data.sort(function (a, b) {
                return b.value - a.value;
            });
            setFlowspeed(data)
        }
        else if (typeName == "手推车、三轮车流量") {
            const data = [];
            roadData?.map((dataItem) => {
                const { type, roads } = dataItem;
                if (type == 10) {
                    roads.forEach((road) => {
                        const { road: r, count, avg_speed } = road;
                        data.push({ "name": r, "value": count, "avg_speed": avg_speed });
                    });
                }
            });
            for (const item of data) {
                item.avg_speed = (item.avg_speed).toFixed(3);
            }
            data.sort(function (a, b) {
                return b.value - a.value;
            });
            setFlowspeed(data)
        }
    }, [roadData, typeName]);
    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current);
            }

            // const data = [];
            // // const roadArray = [];


            // roadData.map((dataItem) => {
            //     const { type, roads } = dataItem;

            //     roads.forEach((road) => {
            //         const { road: r, count, avg_speed } = road;
            //         // roadArray.push(r);

            //         const existingIndex = data.findIndex((item) => item.name === r);
            //         if (existingIndex !== -1) {
            //             // 如果已存在道路的数据项，则累加车流量
            //             data[existingIndex].value += count;
            //             data[existingIndex].avg_speed = (avg_speed + data[existingIndex].avg_speed)

            //         } else {
            //             // 如果不存在道路的数据项，则创建新的数据项
            //             data.push({ "name": r, "value": count, "avg_speed": avg_speed });
            //         }
            //     });
            // });
            // data.sort(function (a, b) {
            //     return b.value - a.value;
            // });
            // console.log("data");
            // console.log(data);

            // const roadsdata = [...new Set(roadArray)];
            const roadList = flowspeed.map(function (item) {
                return item.name;
            })

            const dataList = flowspeed.map(function (item) {
                return item.value;
            })
            const speedList = flowspeed.map(function (item) {
                return item.avg_speed;
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
                    "#668fb3",
                    "#d2e9ff",
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
                grid: [{
                    left: '0%',
                    right: '3%',
                    bottom: '0%',
                    top: '30%',
                    containLabel: true
                }],
                legend: {
                    //     // data: ['总车流量', '排队车辆']
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'SourceHanSansCN-Regular',
                        color: '#FFFFFF',
                    },
                    top: '17%',
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
                        // name: '道路',
                        // min: 90
                        type: 'category',
                        data: roadList,
                        axisLabel: {
                            show: true,
                            interval: 0, // 设置为 0，强制显示所有标签
                            rotate: 30, // 旋转角度，使标签倾斜显示
                            formatter: function (value) {
                                // 自定义格式化函数，根据需要进行调整
                                return value;
                            }
                        }
                    },

                ],
                yAxis: [

                    {
                        // type:"category",
                        name: "流量（辆）",
                        // min:10000,
                        // data: dateList,
                        boundaryGap: true,
                        type: 'value',
                        axisLabel: {
                            formatter: function (value) {
                                return value 
                            },
                        },
                        // boundaryGap: [0, 0.01]
                    }, {
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

                        // barWidth:20,
                        data: dataList,
                        itemStyle: {
                            normal: {
                              barBorderRadius: 1,
                              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: "#40709a" },
                                { offset: 1, color: "#86aaca" },
                              ]),
                            },
                          },
                    },
                    {
                        name: '道路平均速度',
                        type: 'line',
                        smooth: true,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                  color: "#c8e0f8",
                            },
                        },
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
            // if (option) {
            mychart.setOption(option, true);
            // }
            // mychart.on('legendselectchanged', function(params) {
            //     const option = {
            //       grid: {
            //         left: '0%',
            //         right: '0%',
            //         bottom: '0%',
            //       },
            //     };

            //     mychart.setOption(option, false);
            //   });
            // mychart.on('legendselectchanged', function (params) {
            //     const option = mychart.getOption();
            //     // const 
            //     // 判断图例是否全部取消选择
            //     const isAllUnselected = Object.values(params.selected).every(function (value) {
            //         return !value;
            //     });

            //     const selected = params.selected;


            //     // 遍历每个图例项
            //     // for (const legendName in selected) {
            //     //     if (selected.hasOwnProperty(legendName)) {
            //     //         const isSelected = selected[legendName];

            //     //         if (!isSelected) {
            //     //             // 图例被取消选择了一个或多个
            //     //             option.grid = {
            //     //                 left: '10%',
            //     //                 right: '5%',
            //     //                 bottom: '0%',
            //     //                 top: '30%',
            //     //                 // containLabel: true

            //     //             };
            //     //         }
            //     //     }
            //     // }
            //     if (isAllUnselected) {
            //         // 设置自定义的grid配置
            //         option.grid = {
            //             left: '10%',
            //             right: '8%',
            //             bottom: '0%',
            //             top: '30%',
            //             // containLabel: true

            //         };
            //     }

            //     mychart.setOption(option);
            // });
        }
    }, [flowspeed])
    return (
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    )
}
export default Flow;