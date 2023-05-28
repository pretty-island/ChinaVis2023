import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getFlowMin } from '../../../apis/api';

const TrafficFlow: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    interface FlowData {
        type: number;
        mins: {
            time: string;
            count: number;
            avg_speed: number;
        }[];
    }

    const [flowData, setFlowData] = useState<FlowData[]>([]);
    // 获取数据
    useEffect(() => {
        getFlowMin("/getFlowMin").then((res) => {
            const data = res.data;
            setFlowData(data);
        });
    }, []);

    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current, undefined);
            }
            const type_data = flowData.map(item => {
                const { type, mins } = item;
                return mins.map(({ time, count, avg_speed }) => ({ type, time, count, avg_speed }));
            });
            // console.log(type_data[0]);

            // 生成时间数组
            const time_data = [];
            // 开始时间和结束时间
            const startTime = '07:00';
            const endTime = '15:59';
            // 当前时间
            let currentTime = startTime;
            while (currentTime <= endTime) {
                time_data.push(currentTime);

                // 增加当前时间 1 分钟
                const [hours, minutes] = currentTime.split(':');
                const nextMinutes = parseInt(minutes, 10) + 1;
                if (nextMinutes >= 60) {
                    const nextHours = parseInt(hours, 10) + 1;
                    currentTime = `${nextHours.toString().padStart(2, '0')}:00`;
                } else {
                    currentTime = `${hours}:${nextMinutes.toString().padStart(2, '0')}`;
                }
            }
            // console.log(time_data);
            // 类型1流量
            const flow1 = []
            // // 遍历时间数组 time_data
            for (let i = 0; i < 540; i++) {
                const currentTime = time_data[i];
                // 在数据数组 data 中查找与当前时间匹配的数据项
                let matchingData = 0;
                // 在数据数组 data 中查找与当前时间匹配的数据项
                for (let j = 0; j < 540; j++) {
                    if (type_data?.[0]?.[j]?.time === currentTime) {
                        matchingData = type_data?.[0]?.[j]?.count;
                        break;
                    }
                }
                if (matchingData) {
                    flow1.push(matchingData);
                }
            }
            // // 类型1速度
            // const speed1 = []
            // // // 遍历时间数组 time_data
            // for (let i = 0; i < 540; i++) {
            //     const currentTime = time_data[i];
            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     let matchingData = 0;
            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     for (let j = 0; j < 540; j++) {
            //         if (type_data?.[0]?.[j]?.time === currentTime) {
            //             matchingData = type_data?.[0]?.[j]?.avg_speed;
            //             break;
            //         }
            //     }
            //     if (matchingData) {
            //         speed1.push(matchingData);
            //     }
            // }

            // 类型2流量
            const flow2 = []
            // 遍历时间数组 time_data
            for (let i = 0; i < 540; i++) {
                const currentTime = time_data[i];
                // 在数据数组 data 中查找与当前时间匹配的数据项
                let matchingData = 0;

                // 在数据数组 data 中查找与当前时间匹配的数据项
                for (let j = 0; j < 540; j++) {
                    if (type_data?.[2]?.[j]?.time === currentTime) {
                        matchingData = type_data?.[2]?.[j]?.count;
                        break;
                    }
                }
                // 如果找到匹配的数据项，则将其 count 添加到 flow2 数组中
                if (matchingData) {
                    flow2.push(matchingData);
                }
            }
            // 类型2速度
            // const speed2 = []
            // // 遍历时间数组 time_data
            // for (let i = 0; i < 540; i++) {
            //     const currentTime = time_data[i];
            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     let matchingData = 0;

            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     for (let j = 0; j < 540; j++) {
            //         if (type_data?.[2]?.[j]?.time === currentTime) {
            //             matchingData = type_data?.[2]?.[j]?.avg_speed;
            //             break;
            //         }
            //     }
            //     // 如果找到匹配的数据项，则将其 count 添加到 speed2 数组中
            //     if (matchingData) {
            //         speed2.push(matchingData);
            //     }
            // }
            // 类型3流量
            const flow3 = []
            for (let i = 0; i < 540; i++) {
                const currentTime = time_data[i];
                // 在数据数组 data 中查找与当前时间匹配的数据项
                let matchingData = 0;

                // 在数据数组 data 中查找与当前时间匹配的数据项
                for (let j = 0; j < 540; j++) {
                    if (type_data?.[3]?.[j]?.time === currentTime) {
                        matchingData = type_data?.[3]?.[j]?.count;
                        break;
                    }
                }
                // 如果找到匹配的数据项，则将其 count 添加到 flow3 数组中
                if (matchingData) {
                    flow3.push(matchingData);
                }
            }
            // // 类型3速度
            // const speed3 = []
            // for (let i = 0; i < 540; i++) {
            //     const currentTime = time_data[i];
            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     let matchingData = 0;

            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     for (let j = 0; j < 540; j++) {
            //         if (type_data?.[3]?.[j]?.time === currentTime) {
            //             matchingData = type_data?.[3]?.[j]?.avg_speed;
            //             break;
            //         }
            //     }
            //     // 如果找到匹配的数据项，则将其 count 添加到 speed3 数组中
            //     if (matchingData) {
            //         speed3.push(matchingData);
            //     }
            // }
            // 类型4流量
            const flow4 = []
            for (let i = 0; i < 540; i++) {
                const currentTime = time_data[i];
                // 在数据数组 data 中查找与当前时间匹配的数据项
                let matchingData = 0;
                // 在数据数组 data 中查找与当前时间匹配的数据项
                for (let j = 0; j < 540; j++) {
                    if (type_data?.[4]?.[j]) {
                        if (type_data?.[4]?.[j]?.time === currentTime) {
                            matchingData = type_data?.[4]?.[j]?.count;
                            break;
                        }
                    }
                }
                // 如果找到匹配的数据项，则将其 count 添加到 flow3 数组中
                if (matchingData) {
                    flow4.push(matchingData);
                }
                else {
                    flow4.push(0)
                }
            }
            // // 类型4速度
            // const speed4 = []
            // for (let i = 0; i < 540; i++) {
            //     const currentTime = time_data[i];
            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     let matchingData = 0;
            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     for (let j = 0; j < 540; j++) {
            //         if (type_data?.[4]?.[j]) {
            //             if (type_data?.[4]?.[j]?.time === currentTime) {
            //                 matchingData = type_data?.[4]?.[j]?.avg_speed;
            //                 break;
            //             }
            //         }
            //     }
            //     // 如果找到匹配的数据项，则将其 count 添加到 flow3 数组中
            //     if (matchingData) {
            //         speed4.push(matchingData);
            //     }
            //     else {
            //         speed4.push(0)
            //     }
            // }

            // 类型6流量
            const flow6 = []
            for (let i = 0; i < 540; i++) {
                const currentTime = time_data[i];
                // 在数据数组 data 中查找与当前时间匹配的数据项
                let matchingData = 0;
                // 在数据数组 data 中查找与当前时间匹配的数据项
                for (let j = 0; j < 540; j++) {
                    if (type_data?.[5]?.[j]) {
                        if (type_data?.[5]?.[j]?.time === currentTime) {
                            matchingData = type_data?.[5]?.[j]?.count;
                            break;
                        }
                    }
                }
                // 如果找到匹配的数据项，则将其 count 添加到 flow6 数组中
                if (matchingData) {
                    flow6.push(matchingData);
                }
                else {
                    flow6.push(0)
                }
            }
            // // 类型6速度
            // const speed6 = []
            // for (let i = 0; i < 540; i++) {
            //     const currentTime = time_data[i];
            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     let matchingData = 0;
            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     for (let j = 0; j < 540; j++) {
            //         if (type_data?.[5]?.[j]) {
            //             if (type_data?.[5]?.[j]?.time === currentTime) {
            //                 matchingData = type_data?.[5]?.[j]?.avg_speed;
            //                 break;
            //             }
            //         }
            //     }
            //     // 如果找到匹配的数据项，则将其 count 添加到 speed6 数组中
            //     if (matchingData) {
            //         speed6.push(matchingData);
            //     }
            //     else {
            //         speed6.push(0)
            //     }
            // }
            // 类型10流量
            const flow10 = []
            // 遍历时间数组 time_data
            for (let i = 0; i < 540; i++) {
                const currentTime = time_data[i];
                // 在数据数组 data 中查找与当前时间匹配的数据项
                let matchingData = 0;
                // 在数据数组 data 中查找与当前时间匹配的数据项
                for (let j = 0; j < 540; j++) {
                    if (type_data?.[1]?.[j]) {
                        if (type_data?.[1]?.[j]?.time === currentTime) {
                            matchingData = type_data?.[1]?.[j]?.count;
                            break;
                        }
                    }
                }
                // 如果找到匹配的数据项，则将其 count 添加到 flow10 数组中
                if (matchingData) {
                    flow10.push(matchingData);
                }
                else {
                    flow10.push(0)
                }
            }
            // // 类型10速度
            // const speed10 = []
            // // 遍历时间数组 time_data
            // for (let i = 0; i < 540; i++) {
            //     const currentTime = time_data[i];
            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     let matchingData = 0;
            //     // 在数据数组 data 中查找与当前时间匹配的数据项
            //     for (let j = 0; j < 540; j++) {
            //         if (type_data?.[1]?.[j]) {
            //             if (type_data?.[1]?.[j]?.time === currentTime) {
            //                 matchingData = type_data?.[1]?.[j]?.avg_speed;
            //                 break;
            //             }
            //         }
            //     }
            //     // 如果找到匹配的数据项，则将其 count 添加到 speed10 数组中
            //     if (matchingData) {
            //         speed10.push(matchingData);
            //     }
            //     else {
            //         speed10.push(0)
            //     }
            // }
            const allcount = []
            for (let i = 0; i < 540; i++) {
                allcount.push(flow1[i] + flow10[i] + flow2[i] + flow3[i] + flow4[i] + flow6[i])
            }
            // const allspeed = []
            // for (let i = 0; i < 540; i++) {
            //     allspeed.push((speed1[i] + speed2[i] + speed3[i] + speed4[i] + speed6[i] + speed10[i])/6)
            // }
            const option: EChartOption = {
                tooltip: {
                    trigger: "axis",
                },
                textStyle: {
                    color: "#fff",
                },
                // title: [
                //     {
                //       left: 'center',
                //       text: '交通流量图'
                //     },
                //     {
                //       top: '55%',
                //       left: 'center',
                //       text: '交通速度图'
                //     }
                //   ],
                grid: {
                    left: "2%",
                    top: "18%",
                    right: "5%",
                    bottom: "10%",
                    containLabel: true
                },
                legend: {
                    top: '5%',
                    right: '3%',
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'SourceHanSansCN-Regular',
                        color: '#FFFFFF',
                    },
                },


                // calculable: true,
                xAxis: [
                    {
                        name: "时间",
                        type: "category",
                        boundaryGap: false,
                        data: time_data,
                        axisLine: {
                            show: true,
                        },
                        //刻度线是否显示
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            // interval: 0,
                            // color: "#fff",
                            show: true,
                        },
                        splitLine: {
                            show: false,
                            // show: true,
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ["#49bdff"],
                            },
                        },
                    },
                    // {
                    //     name: "时间",
                    //     type: "category",
                    //     boundaryGap: false,
                    //     data: time_data,
                    //     axisLine: {
                    //         show: true,
                    //     },
                    //     //刻度线是否显示
                    //     axisTick: {
                    //         show: false,
                    //     },
                    //     axisLabel: {
                    //         // interval: 0,
                    //         // color: "#fff",
                    //         show: true,
                    //     },
                    //     splitLine: {
                    //         show: false,
                    //         // show: true,
                    //         lineStyle: {
                    //             // 使用深浅的间隔色
                    //             color: ["#49bdff"],
                    //         },
                    //     },
                    //     gridIndex:1
                    // },
                ],
                // dataZoom: [
                //     {
                //         show: true,
                //         // bottom:140,
                //         // height:20
                //         // start:0,
                //         // end:50
                //     }
                // ],
                yAxis: [
                    {
                        name: "流量（辆）",
                        type: "value",

                        //刻度线是否显示
                        axisLine: {
                            show: true,
                            lineStyle: {
                                // 使用深浅的间隔色
                                // color: ["#49bdff"],
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            formatter: "{value}",
                        },
                        splitLine: {
                            show: false,
                        },
                    },
                    // {
                    //     name: "平均速度（m/s）",
                    //     type: "value",

                    //     //刻度线是否显示
                    //     axisLine: {
                    //         show: true,
                    //         lineStyle: {
                    //             // 使用深浅的间隔色
                    //             // color: ["#49bdff"],
                    //         },
                    //     },
                    //     axisTick: {
                    //         show: false,
                    //     },
                    //     axisLabel: {
                    //         formatter: "{value}",
                    //     },
                    //     splitLine: {
                    //         show: false,
                    //     },
                    //     gridIndex:1
                    // },
                ],
                // grid: [
                //     {
                //       bottom: '60%'
                //     },
                //     {
                //       top: '60%'
                //     }
                //   ],
                series: [
                    {
                        name: "总流量",
                        type: "bar",
                        itemStyle: {
                            normal: {
                                color: '#092d46',
                            },
                        },
                        data: allcount,
                    },
                    {
                        name: "小型车辆",
                        // type: "bar",
                        // stack: "总额",
                        // barWidth: 25,
                        // itemStyle: {
                        //     normal: {
                        //         color:'#127DD1',
                        //     }
                        // },
                        type: "line",
                        smooth: true,
                        stack: "总额",
                        symbol: "none",
                        itemStyle: {
                            normal: {
                                color: '#4BFFFC',

                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                        { offset: 0, color: "rgb(0, 255, 255,0.01)" },
                                        { offset: 0.5, color: "rgb(0, 255, 255,0.2)" },
                                        { offset: 1, color: "rgb(0, 255, 255)" },
                                    ]),
                                },
                            },
                        },
                        data: flow1,
                    },
                    {
                        name: "卡车",
                        // type: "bar",
                        stack: "总额",
                        smooth: true,
                        // barWidth: 25,
                        // itemStyle: {
                        //     normal: {
                        //         color:'rgb(129, 103, 151)',
                        //     }
                        // },
                        type: "line",
                        symbol: "none",
                        itemStyle: {
                            normal: {
                                color: '#FFC0CB',
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                        { offset: 0, color: "rgb(255, 192, 203,0.01)" },
                                        { offset: 0.5, color: "rgb(255, 192, 203,0.2)" },
                                        { offset: 1, color: "rgb(255, 192, 203)" },
                                    ]),
                                },
                            },
                        },
                        data: flow4,
                    },
                    {
                        name: "客车",
                        // type: "bar",
                        stack: "总额",
                        smooth: true,
                        // barWidth: 25,
                        // itemStyle: {
                        //     normal: {
                        //         color:'#C37A4D',
                        //     }
                        // },
                        type: "line",
                        symbol: "none",
                        itemStyle: {
                            normal: {
                                color: 'rgb(115, 72, 255)',
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                        { offset: 0, color: "rgb(115, 72, 255,0.01)" },
                                        { offset: 0.5, color: "rgb(115, 72, 255,0.2)" },
                                        { offset: 1, color: "rgb(115, 72, 255)" },
                                    ]),
                                },
                            },
                        },
                        data: flow6,
                    },
                    {
                        name: "行人",
                        // type: "bar",
                        stack: "总额",
                        smooth: true,
                        // barWidth: 25,
                        // itemStyle: {
                        //     normal: {
                        //         color:'#FC9C04',
                        //     }
                        // },
                        type: "line",
                        symbol: "none",
                        itemStyle: {
                            normal: {

                                color: '#FFA500',
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                        { offset: 0, color: "rgb(255,165,0,0.01)" },
                                        { offset: 0.5, color: "rgb(255,165,0,0.2)" },
                                        { offset: 1, color: "rgb(255,165,0)" },
                                    ]),
                                },
                            },
                        },
                        data: flow2,
                    },
                    {
                        name: "非机动车",
                        // type: "bar",
                        stack: "总额",
                        smooth: true,
                        // barWidth: 25,
                        // itemStyle: {
                        //     normal: {
                        //         color:'rgb(13,219,168)',
                        //     }
                        // },
                        type: "line",
                        symbol: "none",
                        itemStyle: {
                            normal: {
                                color: '#49bdff',
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                        { offset: 0, color: "rgb(73,189,255,0.01)" },
                                        { offset: 0.5, color: "rgb(73,189,255,0.2)" },
                                        { offset: 1, color: "rgb(73,189,255)" },
                                    ]),
                                },
                            },
                        },
                        data: flow3,
                    },
                    {
                        name: "手推车、三轮车",
                        // type: "bar",
                        stack: "总额",
                        smooth: true,
                        // barWidth: 25,
                        // itemStyle: {
                        //     normal: {
                        //         color:'#7B7F8E',
                        //     }
                        // },
                        type: "line",
                        symbol: "none",
                        itemStyle: {
                            normal: {
                                color: '#7B7F8E',
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                        { offset: 0, color: "rgb(73,189,255,0.01)" },
                                        { offset: 0.5, color: "rgb(73,189,255,0.2)" },
                                        { offset: 1, color: "rgb(73,189,255)" },
                                    ]),
                                },
                            },
                        },
                        data: flow10,
                    },
                    // {
                    //     name: "总平均速度",
                    //     type: "bar",
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#092d46',
                    //         },
                    //     },
                    //     data: allspeed,
                    //     xAxisIndex: 1,
                    //     yAxisIndex: 1
                    // },
                    // {
                    //     name: "小型车辆平均速度",
                    //     // type: "bar",
                    //     // stack: "总额",
                    //     // barWidth: 25,
                    //     // itemStyle: {
                    //     //     normal: {
                    //     //         color:'#127DD1',
                    //     //     }
                    //     // },
                    //     type: "line",
                    //     smooth: true,
                    //     // stack: "总额",
                    //     symbol: "none",
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#4BFFFC',

                    //             areaStyle: {
                    //                 color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    //                     { offset: 0, color: "rgb(0, 255, 255,0.01)" },
                    //                     { offset: 0.5, color: "rgb(0, 255, 255,0.2)" },
                    //                     { offset: 1, color: "rgb(0, 255, 255)" },
                    //                 ]),
                    //             },
                    //         },
                    //     },
                    //     data: speed1,
                    //     xAxisIndex: 1,
                    //     yAxisIndex: 1
                    // },
                    // {
                    //     name: "卡车平均速度",
                    //     // type: "bar",
                    //     // stack: "总额",
                    //     smooth: true,
                    //     // barWidth: 25,
                    //     // itemStyle: {
                    //     //     normal: {
                    //     //         color:'rgb(129, 103, 151)',
                    //     //     }
                    //     // },
                    //     type: "line",
                    //     symbol: "none",
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#FFC0CB',
                    //             areaStyle: {
                    //                 color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    //                     { offset: 0, color: "rgb(255, 192, 203,0.01)" },
                    //                     { offset: 0.5, color: "rgb(255, 192, 203,0.2)" },
                    //                     { offset: 1, color: "rgb(255, 192, 203)" },
                    //                 ]),
                    //             },
                    //         },
                    //     },
                    //     data: speed4,
                    //     xAxisIndex: 1,
                    //     yAxisIndex: 1
                    // },
                    // {
                    //     name: "客车平均速度",
                    //     // type: "bar",
                    //     // stack: "总额",
                    //     smooth: true,
                    //     // barWidth: 25,
                    //     // itemStyle: {
                    //     //     normal: {
                    //     //         color:'#C37A4D',
                    //     //     }
                    //     // },
                    //     type: "line",
                    //     symbol: "none",
                    //     itemStyle: {
                    //         normal: {
                    //             color: 'rgb(115, 72, 255)',
                    //             areaStyle: {
                    //                 color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    //                     { offset: 0, color: "rgb(115, 72, 255,0.01)" },
                    //                     { offset: 0.5, color: "rgb(115, 72, 255,0.2)" },
                    //                     { offset: 1, color: "rgb(115, 72, 255)" },
                    //                 ]),
                    //             },
                    //         },
                    //     },
                    //     data: speed6,
                    //     xAxisIndex: 1,
                    //     yAxisIndex: 1
                    // },
                    // {
                    //     name: "行人平均速度",
                    //     // type: "bar",
                    //     // stack: "总额",
                    //     smooth: true,
                    //     // barWidth: 25,
                    //     // itemStyle: {
                    //     //     normal: {
                    //     //         color:'#FC9C04',
                    //     //     }
                    //     // },
                    //     type: "line",
                    //     symbol: "none",
                    //     itemStyle: {
                    //         normal: {

                    //             color: '#FFA500',
                    //             areaStyle: {
                    //                 color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    //                     { offset: 0, color: "rgb(255,165,0,0.01)" },
                    //                     { offset: 0.5, color: "rgb(255,165,0,0.2)" },
                    //                     { offset: 1, color: "rgb(255,165,0)" },
                    //                 ]),
                    //             },
                    //         },
                    //     },
                    //     data: speed2,
                    //     xAxisIndex: 1,
                    //     yAxisIndex: 1
                    // },
                    // {
                    //     name: "非机动车平均速度",
                    //     // type: "bar",
                    //     // stack: "总额",
                    //     smooth: true,
                    //     // barWidth: 25,
                    //     // itemStyle: {
                    //     //     normal: {
                    //     //         color:'rgb(13,219,168)',
                    //     //     }
                    //     // },
                    //     type: "line",
                    //     symbol: "none",
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#49bdff',
                    //             areaStyle: {
                    //                 color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    //                     { offset: 0, color: "rgb(73,189,255,0.01)" },
                    //                     { offset: 0.5, color: "rgb(73,189,255,0.2)" },
                    //                     { offset: 1, color: "rgb(73,189,255)" },
                    //                 ]),
                    //             },
                    //         },
                    //     },
                    //     data: speed3,
                    //     xAxisIndex: 1,
                    //     yAxisIndex: 1
                    // },
                    // {
                    //     name: "手推车、三轮车平均速度",
                    //     // type: "bar",
                    //     // stack: "总额",
                    //     smooth: true,
                    //     // barWidth: 25,
                    //     // itemStyle: {
                    //     //     normal: {
                    //     //         color:'#7B7F8E',
                    //     //     }
                    //     // },
                    //     type: "line",
                    //     symbol: "none",
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#7B7F8E',
                    //             areaStyle: {
                    //                 color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    //                     { offset: 0, color: "rgb(73,189,255,0.01)" },
                    //                     { offset: 0.5, color: "rgb(73,189,255,0.2)" },
                    //                     { offset: 1, color: "rgb(73,189,255)" },
                    //                 ]),
                    //             },
                    //         },
                    //     },
                    //     data: speed10,
                    //     xAxisIndex: 1,
                    //     yAxisIndex: 1

                    // },
                ],
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

export default TrafficFlow;