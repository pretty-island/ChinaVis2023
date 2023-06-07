import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getQueCar, getTurnQueCar } from '../../../apis/api';
interface QueProps {
    selectedCross: string;
    selectedHour: string;
    selectedMin: string;
    turnName: string;
}
const QueCar: React.FC<QueProps> = ({ turnName, selectedCross, selectedHour, selectedMin }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    interface QueData {
        time: string;
        all_car: number;
        line_up_car: number;
    }
    const [queCar, setQueCar] = useState();
    const [queCarTurn, setQueCarTurn] = useState();
    const [queData, setQueData] = useState<QueData[]>([]);
    // 获取数据
    useEffect(() => {
        if (selectedCross && selectedMin && selectedHour) {
            const time = selectedHour.replace("点", "") + ":" + selectedMin.split("-")[0];
            // console.log(time);            
            getQueCar("/getQueCar", time, "路口" + selectedCross).then((res) => {
                // console.log(res.data);                
                setQueCar(res.data);
            });
            getTurnQueCar("/getTurnQueCar", time, "路口" + selectedCross).then((res) => {
                setQueCarTurn(res.data);
            });
        }
    }, [selectedCross, selectedMin, selectedHour, queCar]);
    // 设置数据
    useEffect(() => {
        if (queCar && queCarTurn && selectedCross && selectedHour && selectedMin && turnName) {
            if (turnName == "全部方向") {
                // const time = selectedHour.replace("点", "") + ":" + selectedMin.split("-")[0];
                const data = queCar;
                // const data = queCar["路口" + selectedCross][time];
                setQueData(data);
                console.log("queCar");
                console.log(queCar);
            }
            else {
                // const time = selectedHour.replace("点", "") + ":" + selectedMin.split("-")[0];
                const data = queCarTurn[turnName];
                // const data = queCarTurn["路口" + selectedCross][time][turnName];
                setQueData(data);
            }
        }
    }, [queCar, queCarTurn, turnName, selectedCross, selectedHour, selectedMin])
    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current);
            }
            console.log(queData);
            const dateList = queData?.map(function (item) {
                return item.time;
            });
            const stopList = queData?.map(function (item) {
                return item.line_up_car;
            });
            const allList = queData?.map(function (item) {
                return item.all_car;
            });
            const time = selectedHour.replace("点", "") + ":" + selectedMin.split("-")[0] + "-" + selectedHour.replace("点", "") + ":" + selectedMin.split("-")[1];
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
                    x: "4.5%",
                    width: "90%",
                    y: "14%",
                },
                graphic: [
                    {
                        type: 'text',
                        left: '14',
                        top: '10',
                        style: {
                            text: '时间：' + time + "     " + "路口" + selectedCross + "     " + '方向：' + turnName,
                            fill: '#fFF',
                            fontSize: 13,
                            // fontWeight: 'bold'
                        }
                    }
                ],
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
                            show: true,
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
                        // barWidth: 1,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 3,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [

                                    { offset: 0, color: "#cfe7fd" },
                                    { offset: 1, color: "#65a9f3" },
                                    // { offset: 0, color: "#65a9f3" },
                                    // { offset: 1, color: "#15325b" },
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
                        // barWidth: 1,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 3,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: "rgba(102, 184, 255,0.5)" },
                                    { offset: 0.2, color: "rgba(102, 184, 255,0.3)" },
                                    { offset: 1, color: "rgba(102, 184, 255,0)" },
                                ]),
                            },
                        },
                        // itemStyle: {
                        //     normal: {
                        //         barBorderRadius: 3,
                        //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        //             { offset: 0, color: "rgba(22, 104, 220,0.5)" },
                        //             { offset: 0.2, color: "rgba(22, 104, 220,0.3)" },
                        //             { offset: 1, color: "rgba(22, 104, 220,0)" },
                        //         ]),
                        //     },
                        // },
                        z: -12,
                        data: allList
                    }
                ]
            };
            if (option) {
                mychart.setOption(option, true);
            }
        }
    }, [queData, turnName, selectedHour, selectedMin])
    return (
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    )
}
export default QueCar;