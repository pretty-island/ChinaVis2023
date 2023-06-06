// 总通行量
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getEvent } from '../../../apis/api';
interface EventProps {
    // selectedRoad: string;
    setEventName: React.Dispatch<React.SetStateAction<string>>;
    // typeName: string;
}
const EventChart: React.FC <EventProps>= ({setEventName}) => {
    const chartRef = useRef<HTMLDivElement>(null);


    const [eventData, setEventData] = useState();
    const [useData, setUseData] = useState();

    // 获取数据
    useEffect(() => {
        getEvent("/getEvent").then((res) => {
            setEventData(res.data);
        });
    }, []);
    // 设置数据
    useEffect(() => {
        if (eventData) {
            const data = Object.keys(eventData)?.map((eventName) => {
                const eventDetails = eventData[eventName];
                let totalCount = 0;
                Object.keys(eventDetails)?.forEach((time) => {
                    const roadData = eventDetails[time];
                    Object.values(roadData)?.forEach((count) => {
                        totalCount += count;
                    });
                });
                let displayName = eventName
                if (eventName === "time_nixing") {
                    displayName = "逆行"
                }
                else if (eventName === "time_true_cross") {
                    displayName = "行人横穿马路"
                }
                else if (eventName === "time_true_error_way") {
                    displayName = "机动车占用非机动车道"
                }
                else if (eventName === "time_true_overspeed") {
                    displayName = "机动车超速"
                }
                return { value: totalCount, name: displayName };
            });
            const data1 = data.sort((a, b) => {
                return b.value - a.value;
            });
            setUseData(data1);

            // Object.keys(eventData)?.map((eventName)=>{
            // console.log(eventData?.["time_nixing"]);

            // })
        }
    }, [eventData])
    // useEffect(() => {
    //     if (eventData) {
    //         const b = []
    //         Object.keys(eventData)?.map((eventName) => {
    //             const eventDetails = eventData[eventName];
    //             Object.keys(eventDetails)?.forEach((time) => {

    //                 const roadData = eventDetails[time];
    //                 let a = 0;
    //                 Object.values(roadData)?.forEach((count) => {
    //                     a += count;
    //                 });
    //                 b.push({ value: a, name: eventName, time: time });
    //             });

    //         });
    //         console.log(b);
    //         // })
    //     }
    // }, [eventData])
    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current, undefined);
            }
            const title = '总量';
            const formatNumber = function (num: number) {
                const reg = /(?=(\B)(\d{3})+$)/g;
                return num?.toString()?.replace(reg, ',');
            }
            const total = useData?.reduce((a, b) => {
                return a + b.value * 1
            }, 0);
            const handleClick = (eventIndex) => {
                    setEventName(eventIndex)
            }
            const option: EChartOption = {
                angleAxis: {
                    type: 'category',
                    data: ['7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点'],
                    // z: 10,
                },
                color: [
                    // "#FECE4391",
                    "rgba(51,192,205,0.57)",
                    "rgba(158,135,255,0.57)",
                    "rgba(252,75,75,0.57)",
                    "rgba(20,75,75,0.57)",
                    // "#FDB36ac2",

                ],
                textStyle: {
                    color: "#fff",
                },
                radiusAxis: {},
                polar: {
                    center: ["50%", "55%"],
                    // radius: 150,
                    radius: ["25%", "60%"],
                },
                tooltip: {
                    trigger: "item",
                    padding: 10,
                    borderWidth: 1,
                },
                grid: {
                    // left: "110%",
                    // right: "0%",
                    // top: "0%",
                    // bottom: "0%",
                    containLabel: true,
                },
                title: [{
                    text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
                    top: 'center',
                    left: 'center',
                    textStyle: {
                        rich: {
                            name: {
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#fff',
                                padding: [10, 0]
                            },
                            val: {
                                fontSize: 24,
                                fontWeight: 'bolder',
                                color: '#fff',
                            }
                        }
                    }
                }],
                series: [
                    {
                        name: "全天交通事件",
                        type: "pie",
                        radius: ["76%", "85%"],
                        center: ["50%", "55%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "inside",
                                formatter: "{b} : {c} ({d}%)",
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "15",
                                    fontWeight: "normal",
                                },
                            },
                            tooltip: {
                                trigger: "item",
                                padding: 10,
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                borderColor: "#ffffff",
                            },
                            emphasis: {
                                show: true,
                                borderWidth: 2,
                                borderColor: "#ffffff",
                                textStyle: {
                                    fontSize: "15",
                                    fontWeight: "normal",
                                },
                            },
                        },
                        data: useData
                    },
                    {
                        type: 'bar',
                        data: [102, 137, 162, 175, 186, 203, 188, 209, 193],
                        coordinateSystem: 'polar',
                        name: '机动车占用非机动车道',
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                            },
                            emphasis: {
                                borderWidth: 2,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                                borderColor: "#ffffff",
                            },
                        },

                    },
                    {
                        type: 'bar',
                        data: [266, 214, 123, 105, 119, 83, 97, 110, 92],
                        coordinateSystem: 'polar',
                        name: '机动车超速',
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                            },
                            emphasis: {
                                borderWidth: 2,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                                borderColor: "#ffffff",
                            },
                        },
                    }, {
                        type: 'bar',
                        data: [5, 10, 19, 28, 42, 51, 66, 79, 20],
                        coordinateSystem: 'polar',
                        name: '逆行',
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                //   borderColor: "#ffffff",
                            },
                            emphasis: {
                                borderWidth: 2,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                                borderColor: "#ffffff",
                            },
                        },
                    },
                    {
                        type: 'bar',
                        data: [241, 475, 329, 204, 373, 377, 306, 231, 289],
                        coordinateSystem: 'polar',
                        name: '行人横穿马路',
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                            },
                            emphasis: {
                                borderWidth: 2,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                                borderColor: "#ffffff",
                            },
                        },
                    },
                ],
                legend: {
                    show: true,
                    top: '0%',
                    left: '3%',
                    textStyle: {
                        fontSize: 10,
                        // fontFamily: 'SourceHanSansCN-Regular',
                        color: '#FFFFFF',
                    },
                }
            };

            if (option) {
                mychart.setOption(option, true);
            }
            mychart.on('click', 'series', (params) => {
                const eventIndex = params.name+params.seriesName;
                handleClick(eventIndex);
                console.log("1111111111111111");
                console.log(params.name+params.seriesName);
            })
        }

    }, [useData])
    return (
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    )
}

export default EventChart;