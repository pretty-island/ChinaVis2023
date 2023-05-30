// 总通行量
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
// import { getTotal } from '../../../apis/api';
const EventChart: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const title = '总量';
    const formatNumber = function (num: number) {
        const reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ',');
    }
    const data = [
        {
            value: 111,
            name: "行人横穿马路",
        },
        {
            value: 111,
            name: "机动车超速",
        },
        {
            value: 231,
            name: "机动车占用非机动车道",
        },
    ].sort((a, b) => {
        return b.value - a.value;
    });
    const total = data.reduce((a, b) => {
        return a + b.value * 1
    }, 0);

    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current, undefined);
            }
            const option: EChartOption = {
                angleAxis: {
                    type: 'category',
                    data: ['7点', '8点', '9点', '10点', '11点', '12点', '13点'],
                    // z: 10,
                },
                color: [
                    // "#FECE4391",
                    "rgba(51,192,205,0.57)",
                    "rgba(158,135,255,0.57)",
                    "rgba(252,75,75,0.57)",
                    // "#FDB36ac2",

                ],
                textStyle: {
                    color: "#fff",
                },
                radiusAxis: {},
                polar: {
                    center: ["50%", "50%"],
                    // radius: 150,
                    radius: ["20%", "60%"],
                },
                tooltip: {
                    trigger: "item",
                    padding: 10,
                    // backgroundColor: "#fff",
                    // borderColor: "#777",
                    borderWidth: 1,
                    // formatter: tooltipFormatter,
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
                        radius: ["75%", "85%"],
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
                                // backgroundColor: "#222",
                                // borderColor: "#777",
                                // borderWidth: 1,
                                //   formatter: tooltipFormatter,
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false,
                            },
                        },

                        // legend: {
                        //     show: true,
                        //     orient: "vertical",
                        //     x: "left",
                        //     y: "bottom",
                        //     data: ["行人横穿马路", "机动车逆行", "机动车占用非机动车道"],
                        // },
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
                        data: data
                    },
                    {
                        type: 'bar',
                        data: [1, 2, 3, 4, 3, 5, 1],
                        coordinateSystem: 'polar',
                        name: '行人横穿马路',
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
                        data: [2, 4, 6, 1, 3, 2, 1],
                        coordinateSystem: 'polar',
                        name: '机动车超速',
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
                        data: [1, 2, 3, 4, 1, 2, 5],
                        coordinateSystem: 'polar',
                        name: '机动车占用非机动车道',
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
                        // emphasis: {
                        //     borderWidth: 0,
                        //     shadowBlur: 10,
                        //     shadowOffsetX: 0,
                        //     shadowColor: "rgba(0, 0, 0, 0.5)",
                        //     focus: 'item'
                        // }
                    }
                ],
                legend: {
                    show: true,
                    top: '0%',
                    left: '3%',
                    textStyle: {
                        fontSize: 10,
                        fontFamily: 'SourceHanSansCN-Regular',
                        color: '#FFFFFF',
                    },
                    // data: ['行人横穿马路', '机动车逆行', 'C']
                }
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

export default EventChart;