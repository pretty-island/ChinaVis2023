// 总通行量
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getRoad, getTotal } from '../../../apis/api';

interface TotalProps {
    selectedRoad: string;
    setTypeName: React.Dispatch<React.SetStateAction<string>>;
    typeName: string;
}
const Total: React.FC<TotalProps> = ({ selectedRoad, typeName,setTypeName}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [useData, setUseData] = useState();
    const [totalData, setTotalData] = useState();
    const [roadData, setRoadData] = useState();
    // 获取数据
    useEffect(() => {
        getTotal("/getTotal").then((res) => {
            setTotalData(res.data);
        });
        getRoad("/getRoad").then((res) => {
            setRoadData(res.data)
        })
    }, []);
    // 设置数据
    useEffect(() => {
        if (totalData && roadData) {
            const type_name = [{ name: "小型车辆", type: 1 },
            { name: "行人", type: 2 },
            { name: "非机动车", type: 3 },
            { name: "卡车", type: 4 },
            { name: "客车", type: 6 },
            { name: "手推车、三轮车", type: 10 },
            ]
            let nowData: { all: { name: string, value: number }[], [key: string]: { name: string, value: number }[] } = { all: [] };
            for (let i of totalData) {
                const typeName = type_name.find(item => item.type === i.type)?.name || "";
                nowData.all.push({ name: typeName, value: i.count });
            }
            for (let type of roadData) {
                const typeName = type_name.find(item => item.type === type.type)?.name || "";
                for (let road of type["roads"]) {
                    const roadNumber = road["road"].replace("道路", "");
                    nowData[roadNumber] = nowData[roadNumber] || [];
                    nowData[roadNumber].push({ name: typeName, value: road["count"] });

                }
            }
            setUseData(nowData)
        }
    }, [totalData, roadData])


    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current, undefined);
            }
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
                // '#225A8F',
                "#33C0CD",
                "#73ACFF",
                "#9E87FF",
                "#FE6969",
                "#FFB95E",
                "#FFFB7A",
                // '#7B7F8E'
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
            // console.log(useData?.[selectedRoad]);
            // console.log(selectedRoad);
            const all_data = useData?.[selectedRoad]
            
            all_data?.sort((a, b) => {
                return b.value - a.value;
            });
            // const all_data = [
            //     {
            //         name: "小型车辆",
            //         value: 41643,
            //         // labelLine: {}
            //     },
            //     {
            //         name: "卡车",
            //         value: 1440,
            //     },
            //     {
            //         name: "客车",
            //         value: 989,
            //     },
            //     {
            //         name: "行人",
            //         value: 55346,
            //     },
            //     {
            //         name: "非机动车",
            //         value: 57489,
            //     },

            //     {
            //         name: "手推车、三轮车",
            //         value: 3161,
            //     },
            // ];
            all_data?.forEach((v, i) => {
                v.labelLine = {
                    lineStyle: {
                        width: 1,
                        color: colorLine[i],
                    },
                };
            });


            const formatNumber = function (num: number) {
                const reg = /(?=(\B)(\d{3})+$)/g;
                return num?.toString().replace(reg, ',');
            }
            
            const total = all_data?.reduce((a, b) => {
                return a + b.value * 1
            }, 0);
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
            const handleClick = (typeIndex) => {
                // if (typeIndex in typeMapping1) {
                    // const hourFlow = useData[typeMapping1[typeIndex]]
                    // console.log(typeIndex);
                    // setHeatData(hourFlow)
                    // currentData = hourFlow;
                    // const currentXAxisData = generateHourXAxis();
                    // setXData(currentXAxisData)
                    setTypeName(typeIndex + "流量")
                // }
            }
            const option: EChartOption = {
                tooltip: {
                    trigger: 'item',
                    // padding: 10,
                    // borderWidth: 1,
                },
                color: [
                    "#33C0CD",
                    "#73ACFF",
                    "#9E87FF",
                    "#FE6969",
                    "#FDB36A",
                    "#FECE43",
                ],
                graphic: [
                    {
                        type: 'text',
                        left: '13',
                        top: '10',
                        style: {
                            text: '时间范围：7:00-16:00' + "\n" + "\n" + roadMapping(selectedRoad),
                            fill: '#fFF',
                            fontSize: 13,
                            // fontWeight: 'bold'
                        }
                    }
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
                                fontSize: 23,
                                fontWeight: 'bolder',
                                color: '#fff',
                            }
                        }
                    }
                }, {
                    text: '单位：次',
                    top: 20,
                    left: 20,
                    textStyle: {
                        fontSize: 14,
                        color: '#666666',
                        fontWeight: 400
                    },
                    show: false
                }],
                // graphic: {
                //     type: 'text',
                //     left: 'center',
                //     top: 'center',
                //     style: {
                //       text: '烟尘',
                //       textAlign: 'center',
                //       fill: 'rgb(149,162,255)',
                //       width: 30,
                //       height: 30,
                //     }
                //   },

                series: [
                    {
                        type: "pie",
                        radius: ["30%", "70%"],
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
                                return [`{a${index}|${name}${value}}`, `{hr${index}|}`].join(
                                    "\n"
                                );
                            },
                            rich: getRich(),
                        },
                        labelLine: {
                            normal: {
                                length: 2,
                                length2: 10,
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
                        data: all_data,
                        roseType: "radius",
                    },

                ],
            };

            if (option) {
                mychart.setOption(option, true);
            }
            mychart.on('click', 'series', (params) => {
                const typeIndex = params.name;
                handleClick(typeIndex);
                console.log("1111111111111111");
                console.log(params.name);
            })
        }
        // }

    }, [useData, selectedRoad,typeName,setTypeName])
    return (
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    )
}

export default Total;