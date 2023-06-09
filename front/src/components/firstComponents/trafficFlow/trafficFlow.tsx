import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getMinRoad, getMinTotal } from '../../../apis/api';

interface FlowProps {
    selectedRoad: string;
}
const TrafficFlow: React.FC<FlowProps> = ({ selectedRoad }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    interface FlowData {
        type: number;
        mins: {
            time: string;
            count: number;
            avg_speed: number;
        }[];
    }
    interface MinTotal {
        type: number;
        mins: {
            time: string;
            count: number;
            avg_speed: number;
        }[];
    }
    interface MinRoad {
        type: number;
        roads: {
            road: string;
            mins: {
                time: string;
                count: number;
                avg_speed: number;
            }[];
        }[];
    }
    const [minRoad, setMinRoad] = useState<MinRoad[]>([]);
    const [minTotal, setMinTotal] = useState<MinTotal[]>([]);
    const [flowData, setFlowData] = useState<FlowData[]>([]);

    // 获取数据
    useEffect(() => {
        getMinTotal("/getMinTotal").then((res) => {
            setMinTotal(res.data);
        });
        getMinRoad("/getMinRoad").then((res) => {
            setMinRoad(res.data);
        });
    }, []);
    // 设置数据
    useEffect(() => {
        if (minRoad && minTotal) {
            if (selectedRoad == "all") {
                setFlowData(minTotal)
            }
            else {
                // const road_data = minRoad.map(item => {
                //     const { type, roads } = item;
                //     return roads.map(({ road, mins }) => ({ type, road, mins }));
                // });
                // const use_data = road_data.map(item => {
                //     // const roadNumber = road["road"].replace("道路", "");
                //     const data = []
                //     item.map(i => {                        
                //         if (i["road"].replace("道路", "") == selectedRoad) { data.push(i) }
                //     })
                //     return data
                // })
                // setFlowData(use_data)
                const road_data = minRoad.flatMap(item => {
                    const { type, roads } = item;
                    return roads.map(({ road, mins }) => ({ type, road, mins }));
                });
                const use_data = road_data.filter(item => item.road.replace("道路", "") === selectedRoad);
                setFlowData(use_data);
            }
        }
    }, [minRoad, minTotal, selectedRoad])

    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current, undefined);
            }
            // console.log(flowData);

            const type_data = flowData?.map(item => {
                const { type, mins } = item;
                return mins?.map(({ time, count, avg_speed }) => ({ type, time, count, avg_speed }));
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
                else {
                    flow1.push(0)
                }
            }

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
                else {
                    flow2.push(0)
                }
            }

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
                else {
                    flow3.push(0)
                }
            }

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

            const allcount = []
            for (let i = 0; i < 540; i++) {
                allcount.push(flow1[i] + flow10[i] + flow2[i] + flow3[i] + flow4[i] + flow6[i])
            }

            const roadMapping = function (num: string) {
                let x = "";
                switch (num) {
                    case "all":
                        x = "所有道路"
                        break;
                    default:
                        x = "道路" + num
                }
                return x
            };
            const option: EChartOption = {
                // color: [
                //     '#3c5a7d',
                //     "#33C0CD",
                //     "#73ACFF",
                //     "#9E87FF",
                //     "#FE6969",
                //     "#FFB95E",
                //     "#FFFB7A",],
                tooltip: {
                    backgroundColor:'rgba(0,0,0,0.2)',
                    textStyle:{
                        color:'#fff',
                        fontWeight:'bold'
                    },
                    trigger: "axis",
                },
                textStyle: {
                    color: "#fff",
                },
                graphic: [
                    {
                        type: 'text',
                        left: '15',
                        top: '8',
                        style: {
                            text: roadMapping(selectedRoad),
                            fill: '#fFF',
                            fontSize: 13,
                            // fontWeight: 'bold'
                        }
                    }
                ],
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
                    bottom: "18%",
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
                dataZoom: [
                    {
                        show: true,
                        bottom: 40,
                        height: 20
                        // start:0,
                        // end:50
                    }
                ],
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
                                color: '#225A8F',
                                // color: '#092d46',
                                // color: '#92b9dd',
                                // color: '#3c5a7d',
                                // color: '#32D9AF',
                                // color: '#00539C',

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
                        smooth: false,
                        // stack: "总额",
                        symbol: "none",
                        itemStyle: {
                            normal: {
                                color: '#13c2c2',
                                // color: '#01b1fe',
                                // color: '#267b89',
                                // color: '#4BFFFC',
                                // color: '#0075DB',

                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                        { offset: 0, color: "rgb(0, 117, 219,0.01)" },
                                        { offset: 0.5, color: "rgb(0, 117, 219,0.2)" },
                                        { offset: 1, color: "rgb(0, 117, 219)" },
                                    ]),
                                },
                            },
                        },
                        data: flow1,
                    },
                    {
                        name: "卡车",
                        // type: "bar",
                        // stack: "总额",
                        smooth: false,
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
                                color: '#852D30',
                                // color: '#FFC0CB',
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
                        // stack: "总额",
                        smooth: false,
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
                                // color: 'rgb(115, 72, 255)',
                                // color: '#5B45C4',
                                // color: '#5252A0',
                                color: '#01b1fe',
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
                        // stack: "总额",
                        smooth: false,
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
                                // color: '#B07C04',
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
                        // stack: "总额",
                        smooth: false,
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
                                color: '#9682C2',
                                // color: '#49bdff',
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
                        // stack: "总额",
                        smooth: false,
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
                                // color: '#7B7F8E',
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

                ],
            };

            if (option) {
                mychart.setOption(option, true);
            }
        }

    }, [flowData, selectedRoad])
    return (
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    )
}

export default TrafficFlow;