// 总通行量
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
// import { getTotal } from '../../../apis/api';
const Total: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    const title = '总量';
    const colorList = [
        {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
                {
                    offset: 0,
                    color: "rgba(51,192,205,0.01)", // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: "rgba(51,192,205,0.57)", // 100% 处的颜色
                },
            ],
            globalCoord: false, // 缺省为 false
        },
        {
            type: "linear",
            x: 1,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                {
                    offset: 0,
                    color: "rgba(115,172,255,0.02)", // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: "rgba(115,172,255,0.67)", // 100% 处的颜色
                },
            ],
            globalCoord: false, // 缺省为 false
        },
        {
            type: "linear",
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: "rgba(158,135,255,0.02)", // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: "rgba(158,135,255,0.57)", // 100% 处的颜色
                },
            ],
            globalCoord: false, // 缺省为 false
        },
        {
            type: "linear",
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: "rgba(252,75,75,0.01)", // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: "rgba(252,75,75,0.57)", // 100% 处的颜色
                },
            ],
            globalCoord: false, // 缺省为 false
        },
        {
            type: "linear",
            x: 1,
            y: 1,
            x2: 1,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: "rgba(253,138,106,0.01)", // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: "#FDB36ac2", // 100% 处的颜色
                },
            ],
            globalCoord: false, // 缺省为 false
        },
        {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
                {
                    offset: 0,
                    color: "rgba(254,206,67,0.12)", // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: "#FECE4391", // 100% 处的颜色
                },
            ],
            globalCoord: false, // 缺省为 false
        },
    ];
    const colorLine = [
        "#33C0CD",
        "#73ACFF",
        "#9E87FF",
        "#FE6969",
        "#FDB36A",
        "#FECE43",
    ];

    function getRich(): { [key: string]: any } {
        const result: { [key: string]: any } = {};
        colorLine.forEach((v: string, i: number) => {
            result[`hr${i}`] = {
                backgroundColor: colorLine[i],
                borderRadius: 3,
                width: 3,
                height: 3,
                padding: [3, 3, 0, -12],
            };
            result[`a${i}`] = {
                padding: [-11, 6, -20, 6],
                color: colorLine[i],
                backgroundColor: "transparent",
                fontSize: 12,
            };
        });
        return result;
    }
    const data = [
        {
            name: "小型车辆",
            value: 2500,
            labelLine: {}
        },
        {
            name: "行人",
            value: 2022,
        },
        {
            name: "非机动车",
            value: 1823,
        },
        {
            name: "卡车",
            value: 1511,
        },
        {
            name: "客车",
            value: 1322,
        },
        {
            name: "手推车、三轮车",
            value: 901,
        },
    ].sort((a, b) => {
        return b.value - a.value;
    });
    data.forEach((v, i) => {
        v.labelLine = {
            lineStyle: {
                width: 1,
                color: colorLine[i],
            },
        };
    });
    const formatNumber = function (num: number) {
        const reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ',');
    }
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
                tooltip:{
                    trigger:'item',
                    padding: 10,
                    borderWidth: 1,
                },
                color:[
                    "#33C0CD",
                    "#73ACFF",
                    "#9E87FF",
                    "#FE6969",
                    "#FDB36A",
                    "#FECE43",
                ],
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
                                fontSize: 26,
                                fontWeight: 'bolder',
                                color: '#fff',
                            }
                        }
                    }
                },{
                    text: '单位：次',
                    top: 20,
                    left: 20,
                    textStyle: {
                        fontSize: 14,
                        color:'#666666',
                        fontWeight: 400
                    },
                    show: false
                }],
                series: [
                    {
                        type: "pie",
                        radius: ["30%","78%"],
                        center: ["50%", "50%"],
                        // clockwise: true,
                        avoidLabelOverlap: true,
                        label: {
                            show: true,
                            position: "outside",
                            formatter: function (params: {
                                name: string;
                                value: number;
                                dataIndex: number;
                            }) {
                                const name = params.name;
                                const value = formatNumber(params.value);
                                const index = params.dataIndex;
                                return [`{a${index}|${name}：${value}}`, `{hr${index}|}`].join(
                                    "\n"
                                );
                            },
                            rich: getRich(),
                        },
                        labelLine: {
                            normal: {
                                length: 2,
                                length2: 20,
                                lineStyle: {
                                    // color: '#e6e6e6'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: function (params: { dataIndex: number }) {
                                    return colorList[params.dataIndex];
                                },
                            },
                        },
                        data,
                        roseType: "radius",
                    },

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

export default Total;