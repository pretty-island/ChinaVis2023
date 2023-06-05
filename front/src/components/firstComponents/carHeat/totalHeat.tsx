// 全部小时车辆热力图
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getHourRoad, getRoad } from '../../../apis/api';

const TotalHeat: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    // 
    interface RoadData {
        type: number;
        roads: {
            road: string;
            count: number;
            avg_speed: number;
        }
    }
    interface HourData {
        time: string;
        types: {
            type: number;
            roads: {
                road: string;
                count: number;
                avg_speed: number;
            }
        }
    }
    interface HeatData {
        road: string;
        count: number;
        avg_speed: number;
    }
    const [roadData, setRoadData] = useState<RoadData[]>([]);
    const [hourData, setHourData] = useState<HourData[]>([]);
    const [heatData, setHeatData] = useState<HeatData[]>([]);
    const [roads, setRoads] = useState();
    const [xData, setXData] = useState();
    const [typeName, setTypeName] = useState("");
    const [speeds, setSpeeds] = useState();


    // 获取数据
    useEffect(() => {
        getRoad("/getRoad").then((res) => {
            setRoadData(res.data);
        });
        getHourRoad("/getHourRoad").then((res) => {
            setHourData(res.data);
        });
    }, []);
    // 设置数据
    useEffect(() => {
        if (roadData && hourData) {
            const data = [];
            const speedData = [];
            const typeArray = [];
            const roadArray = [];
            const typeMapping = {
                1: "小型车辆",
                2: "行人",
                3: "非机动车",
                4: "卡车",
                6: "客车",
                10: "手推车、三轮车",
            };

            roadData.map((dataItem) => {
                const { type, roads } = dataItem;
                typeArray.push(typeMapping[type]);
                roads.forEach((road) => {
                    const { road: r, count, avg_speed } = road;
                    roadArray.push(r);
                    data.push([typeMapping[type], r, count]);

                    if (!(type in speedData)) {
                        speedData[type] = []
                    }
                    speedData[type].push({ "road": r, "speed": avg_speed })
                });
            });
            const roadsdata = [...new Set(roadArray)];
            // 获取道路名中的最后一个数字
            const getLastDigitFromRoad = (road) => {
                const digits = road.match(/\d+$/);
                return digits ? parseInt(digits[0]) : 0;
            };
            roadsdata.sort((a, b) => {
                const lastDigitA = getLastDigitFromRoad(a);
                const lastDigitB = getLastDigitFromRoad(b);
                return lastDigitA - lastDigitB;
            });

            const sortedSpeed = {}
            // 自定义排序函数
            function compareByLastDigit(a, b) {
                const lastDigitA = getLastDigitFromRoad(a.road);
                const lastDigitB = getLastDigitFromRoad(b.road);
                return lastDigitA - lastDigitB;
            }

            // 对每个 type 的道路速度数组进行排序
            for (const type in speedData) {
                const roads = speedData[type];
                const sortedRoads = roads.sort(compareByLastDigit);
                sortedSpeed[type] = sortedRoads.map((item) => { return item.speed });
            }

            // console.log(speedData[10][1].speed);
            console.log(sortedSpeed);

            setSpeeds(sortedSpeed)
            setTypeName("")
            setRoads(roadsdata)
            setXData(typeArray)
            setHeatData(data);
        }
    }, [roadData, hourData]);

    // echarts
    useEffect(() => {
        if (chartRef.current != null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current, undefined);
            }
            const typeMapping1 = {
                "小型车辆": 1,
                "行人": 2,
                "非机动车": 3,
                "卡车": 4,
                "客车": 6,
                "手推车、三轮车": 10,
            };
            const timeMap = {
                "7:00": "7点",
                "8:00": "8点",
                "9:00": "9点",
                "10:00": "10点",
                "11:00": "11点",
                "12:00": "12点",
                "13:00": "13点",
                "14:00": "14点",
                "15:00": "15点",
            };
            const useData: { [key: number]: ProcessedHourData[] } = {};
            hourData.forEach((hour) => {
                const { time, types } = hour;
                types.forEach((typeData) => {
                    const { type, roads } = typeData;
                    if (!useData[type]) {
                        useData[type] = [];
                    }
                    roads.forEach((roadData) => {
                        // useData[type].push({
                        // hour: time,
                        // road: roadData.road,
                        // count: roadData.count,
                        // speed: roadData.avg_speed
                        // });
                        useData[type].push([timeMap[time], roadData.road, roadData.count])
                    });
                });
            });
            // console.log(useData[typeMapping1["手推车、三轮车"]]);

            // 生成小时刻度
            const generateHourXAxis = () => {
                const xAxisData = [];
                for (let i = 0; i < 9; i++) {
                    xAxisData.push(`${i + 7}点`)
                }
            }
            const handleClick = (typeIndex) => {
                if (typeIndex in typeMapping1) {
                    const hourFlow = useData[typeMapping1[typeIndex]]
                    // console.log(typeIndex);
                    setHeatData(hourFlow)
                    // currentData = hourFlow;
                    const currentXAxisData = generateHourXAxis();
                    setXData(currentXAxisData)
                    setTypeName(typeIndex + "流量")
                }
            }
            const handleRestore = () => {
                console.log("11231");
                if (roadData && hourData) {
                    const data = [];
                    const typeArray = [];
                    const roadArray = [];
                    const typeMapping = {
                        1: "小型车辆",
                        2: "行人",
                        3: "非机动车",
                        4: "卡车",
                        6: "客车",
                        10: "手推车、三轮车",
                    };

                    roadData.map((dataItem) => {
                        const { type, roads } = dataItem;
                        typeArray.push(typeMapping[type]);
                        roads.forEach((road) => {
                            const { road: r, count } = road;
                            roadArray.push(r);
                            data.push([typeMapping[type], r, count]);
                        });
                    });
                    const roadsdata = [...new Set(roadArray)];
                    // 获取道路名中的最后一个数字
                    const getLastDigitFromRoad = (road) => {
                        const digits = road.match(/\d+$/);
                        return digits ? parseInt(digits[0]) : 0;
                    };
                    roadsdata.sort((a, b) => {
                        const lastDigitA = getLastDigitFromRoad(a);
                        const lastDigitB = getLastDigitFromRoad(b);
                        return lastDigitA - lastDigitB;
                    });
                    // console.log(data);
                    setTypeName("")
                    setRoads(roadsdata)
                    setXData(typeArray)
                    setHeatData(data);
                }

            }
            const counts = heatData?.map((item) => item[2]).filter(Number.isFinite);
            const minCount = Math.min(...counts);
            const maxCount = Math.max(...counts);
            // console.log(maxCount);

            const option: EChartOption = {
                color: [
                    "#003A6C",
                    "#33C0CD",
                    "#73ACFF",
                    "#9E87FF",
                    "#FE6969",
                    "#FDB36A",
                    "#FECE43",
                ],
                tooltip: {
                    position: 'top',
                },
                textStyle: {
                    color: "#fff",
                },
                grid: [{
                    // height: '50%',
                    // top: '10%',
                    left: '0%',
                    right: '7%',
                    bottom: '14%',
                    top: '15%',
                    containLabel: true
                },
                {
                    left: '0%',
                    right: '78%',
                    bottom: '17%',
                    top: '12.06%',
                    containLabel: true
                },
                {
                    left: '13.8%',
                    right: '71%',
                    bottom: '17%',
                    top: '12.06%',
                    containLabel: true
                },
                {
                    left: '27.8%',
                    right: '50%',
                    bottom: '17%',
                    top: '12.06%',
                    containLabel: true
                },
                {
                    left: '41.6%',
                    right: '36%',
                    bottom: '17%',
                    top: '12.06%',
                    containLabel: true
                },
                {
                    left: '55.5%',
                    right: '22.5%',
                    bottom: '17%',
                    top: '12.06%',
                    containLabel: true
                },
                {
                    left: '69.4%',
                    right: '9%',
                    bottom: '17%',
                    top: '12.06%',
                    containLabel: true
                }
                ],
                legend: {
                    //     // data: ['总车流量', '排队车辆']
                    textStyle: {
                        fontSize: 12,
                        fontFamily: 'SourceHanSansCN-Regular',
                        color: '#FFFFFF',
                    },
                    top: "5%",
                },
                graphic: [
                    {
                        type: 'text',
                        left: '13',
                        top: '10',
                        style: {
                            text: '时间范围：7:00-16:00' + "             " + typeName,
                            fill: '#fFF',
                            fontSize: 13,
                            // invisible:false
                            // fontWeight: 'bold'
                        },
                        tooltip: {
                            show: false
                        }
                    }
                ],
                toolbox: {
                    feature: {
                        restore: { show: true },
                        // saveAsImage: { show: true }
                    }
                },
                xAxis: [{
                    type: 'category',
                    data: xData,
                    // data: ["全部9小时"],
                    splitArea: {
                        // show: true
                    },
                    axisLabel: {
                        show: true,
                        interval: 0, // 设置为 0，强制显示所有标签
                        // rotate: 30, // 旋转角度，使标签倾斜显示
                        formatter: function (value) {
                            // 自定义格式化函数，根据需要进行调整
                            return value;
                        }
                    }
                },
                {
                    // name: "速度（m/s）",
                    splitLine: { show: true },
                    // axisLine: {
                    //     lineStyle: {
                    //         // color: "#B4B4B4",
                    //     },
                    // },
                    axisLabel: {
                        position: 'top',
                        //   formatter: "{value} m/s",
                    },
                    boundaryGap: true,
                    gridIndex: 1,
                    position: 'top',

                },
                {
                    splitLine: { show: true },
                    axisLabel: {
                        position: 'top',
                        //   formatter: "{value} m/s",
                    },
                    boundaryGap: true,
                    gridIndex: 2,
                    position: 'top',
                },
                {
                    splitLine: { show: true },
                    axisLabel: {
                        position: 'top',
                        //   formatter: "{value} m/s",
                    },
                    boundaryGap: true,
                    gridIndex: 3,
                    position: 'top',
                },
                {
                    splitLine: { show: true },
                    axisLabel: {
                        position: 'top',
                        //   formatter: "{value} m/s",
                    },
                    boundaryGap: true,
                    gridIndex: 4,
                    position: 'top',
                },
                {
                    splitLine: { show: true },
                    axisLabel: {
                        position: 'top',
                        //   formatter: "{value} m/s",
                    },
                    boundaryGap: true,
                    gridIndex: 5,
                    position: 'top',
                },
                {
                    splitLine: { show: true },
                    axisLabel: {
                        position: 'top',
                        //   formatter: "{value} m/s",
                    },
                    boundaryGap: true,
                    gridIndex: 6,
                    position: 'top',
                },
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: roads,
                        splitArea: {
                            show: true
                        },
                    },
                    {
                        // type: 'category',
                        // show: false,
                        // position: "left",
                        data: roads,
                        // offset: 50,
                        // splitArea: {
                        //     show: true
                        // },
                        gridIndex: 1
                    },
                    {                
                        data: roads,                       
                        gridIndex: 2
                    },
                    {                
                        data: roads,                       
                        gridIndex: 3
                    },
                    {                
                        data: roads,                       
                        gridIndex: 4
                    },
                    {                
                        data: roads,                       
                        gridIndex: 5
                    },
                    {                
                        data: roads,                      
                        gridIndex: 6
                    },

                ],
                visualMap: [{
                    // min: 129,
                    // max: 18683,
                    textStyle: { color: "#fff", },
                    min: minCount === Infinity ? 129 : minCount,
                    max: maxCount === -Infinity ? 18683 : maxCount,
                    inRange: {
                        // color:['#20396B','#1B9CFC']
                        color: ['#D2E9FF', '#003A6C']
                    },
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '3%',
                    seriesIndex: 0
                }],
                series: [
                    {
                        name: '车流量',
                        type: 'heatmap',
                        data: heatData,
                        label: {
                            show: true,
                            // formatter: (params) => {
                            //     const { value, dataIndex } = params;
                            //     const typeIndex = dataIndex % typeArray.length;
                            //     const count = value[2];
                            //     return `${count}`
                            // }
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        name: '小型车辆速度',
                        type: 'line',
                        data: speeds?.[1],
                        smooth: true,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        // label: {
                        //     show: true,

                        // },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        name: '行人速度',
                        type: 'line',
                        data: speeds?.[2],
                        smooth: true,
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        // label: {
                        //     show: true,

                        // },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        name: '非机动车速度',
                        type: 'line',
                        data: speeds?.[3],
                        smooth: true,
                        xAxisIndex: 3,
                        yAxisIndex: 3,
                        // label: {
                        //     show: true,

                        // },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        name: '卡车速度',
                        type: 'line',
                        data: speeds?.[4],
                        smooth: true,
                        xAxisIndex: 4,
                        yAxisIndex: 4,
                        // label: {
                        //     show: true,

                        // },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        name: '客车速度',
                        type: 'line',
                        data: speeds?.[6],
                        smooth: true,
                        xAxisIndex: 5,
                        yAxisIndex: 5,
                        // label: {
                        //     show: true,

                        // },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        name: '手推车、三轮车速度',
                        type: 'line',
                        data: speeds?.[10],
                        smooth: true,
                        xAxisIndex: 6,
                        yAxisIndex: 6,
                        // label: {
                        //     show: true,

                        // },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
            };
            // if (option) {
            mychart.setOption(option, true);

            // }
            mychart.on('click', 'series', (params) => {
                const typeIndex = params.value[0];
                handleClick(typeIndex);
                // console.log("1111111111111111");
                // console.log(params.value[0]);
            })
            mychart.on('restore', handleRestore);

            return () => {
                mychart.dispose();
            }
        }

    }, [heatData, hourData, roads, xData, typeName, speeds])
    return (
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    )
}
export default TotalHeat;