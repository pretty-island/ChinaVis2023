// 总通行量
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getEvent, getEventRoad } from '../../../apis/api';
interface EventProps {
    selectedRoad: string;
    setEventName: React.Dispatch<React.SetStateAction<string>>;
    // typeName: string;
}
const EventChart: React.FC<EventProps> = ({ selectedRoad, setEventName }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [eventData, setEventData] = useState();
    const [eventRoadData, setEventRoadData] = useState();
    const [useData, setUseData] = useState();
    // 获取数据
    useEffect(() => {
        getEvent("/getEvent").then((res) => {
            setEventData(res.data);
            // console.log(eventData);
        });
        getEventRoad("/getEventRoad").then((res) => {
            setEventRoadData(res.data);
            // console.log(eventData);
        });
    }, []);
    // 设置数据
    useEffect(() => {
        if (eventData && eventRoadData) {
            if (selectedRoad == "all") {
                setUseData(eventData)
            }
            else {
                setUseData(eventRoadData["道路" + selectedRoad])
            }
        }
    }, [eventData, eventRoadData, selectedRoad])
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
            console.log(useData);
            let alldata = []
            if (useData) {
                alldata = Object.keys(useData)?.map((eventName) => {
                    const eventDetails = useData[eventName];
                    if (eventDetails) {
                        let totalCount = 0;
                        Object.values(eventDetails)?.forEach((count) => {
                            totalCount += count;
                        });
                        let displayName = eventName
                        if (eventName === "time_nixing") {
                            displayName = "逆行"
                        }
                        else if (eventName === "time_true_cross") {
                            displayName = "行人横穿马路"
                        }
                        else if (eventName === "bicycle_way") {
                            displayName = "机动车占用非机动车道"
                        }
                        else if (eventName === "bus_way") {
                            displayName = "机动车占用公交车道"
                        }
                        else if (eventName === "time_true_overspeed") {
                            displayName = "机动车超速"
                        }
                        return { value: totalCount, name: displayName };
                    }
                });
            }
            // const alldata = totaldata.sort((a, b) => {
            //     return b.value - a.value;
            // });
            // console.log(alldata);

            const data = ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h'];

            const time_nixing = data.map(hour => (useData?.['time_nixing']?.[hour]) ? (useData?.['time_nixing']?.[hour]) : 0);
            const time_true_cross = data.map(hour => (useData?.['time_true_cross']?.[hour]) ? (useData?.['time_true_cross']?.[hour]) : 0);
            const bicycle_way = data.map(hour => (useData?.['bicycle_way']?.[hour]) ? (useData?.['bicycle_way']?.[hour]) : 0);
            const bus_way = data.map(hour => (useData?.['bus_way']?.[hour]) ? (useData?.['bus_way']?.[hour]) : 0);
            const time_true_overspeed = data.map(hour => (useData?.['time_true_overspeed']?.[hour]) ? (useData?.['time_true_overspeed']?.[hour]) : 0);
            // console.log("time_nixing");
            // console.log(time_nixing);
            const title = '总量';
            const formatNumber = function (num: number) {
                const reg = /(?=(\B)(\d{3})+$)/g;
                return num?.toString()?.replace(reg, ',');
            }
            const total = alldata?.reduce((a, b) => {
                return a + b.value * 1
            }, 0);
            const handleClick = (eventIndex) => {
                setEventName(eventIndex)
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
                angleAxis: {
                    type: 'category',
                    data: ['7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点'],
                    // z: 10,
                },
                // color: [
                //     "#247683",
                //     "#7C6CA1", 
                //     "#9E3F2C",
                //     "#3D72A1",
                //     "#C78100",
                    // "#993437",              
                    // "#2F8CA1",
                    // "#C2B069",

                    // "#8582E8",
                    // "#FFA500",                    

                    // "#7B7F8E",
                    // "rgba(51,192,205,0.57)",
                    // "rgba(158,135,255,0.57)",
                    // "rgba(252,75,75,0.57)",
                    // "rgba(20,75,75,0.57)",
                    // "#FDB36ac2",

                // ],
                textStyle: {
                    color: "#fff",
                },
                // legend: {
                // top: '5%',
                // right: '30%',
                //     textStyle: {
                //         fontSize: 12,
                //         fontFamily: 'SourceHanSansCN-Regular',
                //         color: '#FFFFFF',
                //     },
                // },
                radiusAxis: {},
                polar: {
                    center: ["50%", "45%"],
                    // radius: 150,
                    radius: ["25%", "60%"],
                },
                tooltip: {
                    backgroundColor:'rgba(0,0,0,0.2)',
                    textStyle:{
                        color:'#fff',
                        fontWeight:'bold'
                    },
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
                graphic: [
                    {
                        type: 'text',
                        left: '13',
                        top: '10',
                        style: {
                            text: roadMapping(selectedRoad),
                            fill: '#fFF',
                            fontSize: 13,
                            // fontWeight: 'bold'
                        }
                    }
                ],
                title: [{
                    text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
                    top: '35%',
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
                // toolbox: {
                //     feature: {
                //         restore: { show: true },
                //         // saveAsImage: { show: true }
                //     }
                // },
                series: [
                    {
                        name: "全天交通事件",
                        type: "pie",
                        radius: ["76%", "85%"],
                        center: ["50%", "45%"],
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
                            // textStyle:{
                                // color:"#3D72A1"
                                // function(params){
                                //     if(params.name==='机动车占用非机动车道'){
                                //         return '#247683';
                                //     }
                                //     else if(params.name==='逆行'){
                                //         return "#7C6CA1";
                                //     }
                                //     else if(params.name==='行人横穿马路'){
                                //         return "#9E3F2C";
                                //     }
                                //     else if(params.name==='机动车超速'){
                                //         return "#3D72A1";
                                //     }
                                //     else if(params.name==='机动车占用公交车道'){
                                //         return "#C78100";
                                //     }
                                // }
                            // }
                        },
                        labelLine: {
                            normal: {
                                show: false,
                            },
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                // color:"#3D72A1",
                                borderColor: "#ffffff",
                                color:function(params){
                                    if(params.name==='机动车占用非机动车道'){
                                        return '#247683';
                                    }
                                    else if(params.name==='逆行'){
                                        return "#9E3F2C";
                                    }
                                    else if(params.name==='行人横穿马路'){
                                        return "#3D72A1";
                                    }
                                    else if(params.name==='机动车超速'){
                                        return "#C78100";
                                    }
                                    else if(params.name==='机动车占用公交车道'){
                                        return "#7C6CA1";
                                    }
                                }
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
                        data: alldata
                    }, {
                        type: 'bar',
                        data: bus_way,
                        coordinateSystem: 'polar',
                        name: '机动车占用公交车道',
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                color:"#7C6CA1", 
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
                        data: time_nixing,
                        coordinateSystem: 'polar',
                        name: '逆行',
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                //   borderColor: "#ffffff",
                                color:"#9E3F2C",
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
                        data: time_true_cross,
                        coordinateSystem: 'polar',
                        name: '行人横穿马路',
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                color:"#3D72A1",
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
                        data: time_true_overspeed,
                        coordinateSystem: 'polar',
                        name: '机动车超速',
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                color:"#C78100",
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
                        data: bicycle_way,
                        coordinateSystem: 'polar',
                        name: '机动车占用非机动车道',
                        stack: 'a',
                        itemStyle: {
                            normal: {
                                borderWidth: 0,
                                color:"#247683",
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
                    bottom: '0%',
                    right: '3%',
                    textStyle: {
                        fontSize: 13,
                        // fontFamily: 'SourceHanSansCN-Regular',
                        color: '#FFFFFF',
                    },
                }
            };

            if (option) {
                mychart.setOption(option, true);
            }
            mychart.on('click', 'series', (params) => {
                const eventIndex = params.name + params.seriesName;
                handleClick(eventIndex);
                // console.log("1111111111111111");
                // console.log(params.name+params.seriesName);
            })
            // mychart.on('restore', ()=>{
            //     setEventName("全天交通事件")
            // });

            return () => {
                mychart.dispose();
            }
        }

    }, [useData, selectedRoad, eventData, eventRoadData, setEventName])
    return (
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    )
}

export default EventChart;