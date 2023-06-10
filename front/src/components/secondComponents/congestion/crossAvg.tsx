import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getAvgCrossCongestion } from '../../../apis/api';

interface CongestionProps {
    setSelectedMin: React.Dispatch<React.SetStateAction<string>>;
    selectedHour: string;
    setSelectedCross: React.Dispatch<React.SetStateAction<string>>;
    // setTurnName: React.Dispatch<React.SetStateAction<string>>;
}

const CrossAvgCongestion: React.FC<CongestionProps> = ({ setSelectedCross, setSelectedMin, selectedHour }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [congData, setCongData] = useState();
    // 获取数据
    useEffect(() => {
        getAvgCrossCongestion("/getAvgCrossCongestion").then((res) => {
            const data = res.data;
            setCongData(data);
        });
    }, []);

    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current);
            }
            const hours = [
                '路口1', '路口2',
                '路口3', '路口4',
                '路口5', '路口6',
                '路口7', '路口8'
            ];
            // prettier-ignore
            const days = [
                '00', '05', '10',
                '15', '20', '25', '30', '35', '40',
                '45', '50', '55',
            ];
            // prettier-ignore
            // console.log('congData');
            // console.log(congData[selectedHour]);

            const data = congData?.[selectedHour]
                ?.map(function (item) {
                    return [item[1], item[0], item[2]];
                });
            // console.log(data?.val);

            //   const roadMapping = function (num: string) {
            //     let x = "";
            //     switch (num) {
            //         case "all":
            //             x = "道路1"
            //             break;
            //         default:
            //             x = "道路" + num
            //     }
            //     return x
            // };
            const option: EChartOption = {
                textStyle: {
                    color: "#fff",
                },
                tooltip: {
                    backgroundColor:'rgba(0,0,0,0.2)',
                    textStyle:{
                        color:'#fff',
                        fontWeight:'bold'
                    },
                    // padding: 10,
                    // backgroundColor: '#222',
                    // borderColor: '#777',
                    // borderWidth: 1
                    // trigger: "axis",
                    axisPointer: {
                        type: 'cross',
                        // snap:false
                    },
                    // formatter: '{a}<br/>{b0}: {c3}'
                    formatter: function (params) {
                        let time = selectedHour?.replace("点", "") + ":00-" + selectedHour?.replace("点", "") + ":05"
                        if (params.data[1] * 5 == 5) {
                            time = selectedHour?.replace("点", "") + ':0' + String(params.data[1] * 5) + "-" + selectedHour?.replace("点", "") + ':0' + String(params.data[1] * 5 + 5)
                        }
                        else if (params.data[1] * 5 == 55) {
                            time = selectedHour?.replace("点", "") + ':' + String(params.data[1] * 5) + "-" + String(Number(selectedHour?.replace("点", "")) + 1) + ':00'
                        }
                        else if (params.data[1] * 5 < 55 && params.data[1] * 5 > 5) {
                            time = selectedHour?.replace("点", "") + ':' + String(params.data[1] * 5) + "-" + selectedHour?.replace("点", "") + ':' + String(params.data[1] * 5 + 5)
                        }
                        let crossLevel = '畅通';
                        if (params.data[2] >= 145) {
                            crossLevel = '严重拥堵';
                        }
                        else if (params.data[2] >= 100) {
                            crossLevel = '中度拥堵';
                        }
                        else if (params.data[2] >= 55) {
                            crossLevel = '轻度拥堵';
                        }
                        return params.seriesName + '<br>' + params.name + "：" + params.data[2] + '秒' + "<br>拥堵程度：" + crossLevel + "<br>时间：" + time
                    },
                },
                // legend: {
                //   textStyle: {
                //     color: "#fff",
                //   },
                //   bottom: 0,
                //   // left:20,
                //   // data: ['Beijing', 'Shanghai', 'Guangzhou'],
                //   itemGap: 20,
                //   textStyle: {
                //     color: '#fff',
                //     // color: '#',
                //     fontSize: 14
                //   }
                // },
                // tooltip: {
                // padding: 10,
                // backgroundColor: '#222',
                // borderColor: '#777',
                // borderWidth: 1
                // },
                grid: {
                    // width: '50%',
                    left: 'center',
                    bottom: 10,
                    //   right: 20,
                    top: 30,
                    containLabel: true
                },
                graphic: [
                    {
                        type: 'text',
                        left: '14',
                        top: '8',
                        style: {
                            text: '时间：' + selectedHour + "     " + "路口平均拥堵情况",
                            fill: '#fFF',
                            fontSize: 13,
                            // fontWeight: 'bold'
                        }
                    }
                ],
                xAxis: {
                    type: 'category',
                    data: hours,
                    boundaryGap: false,
                    splitLine: {
                        show: true
                    },
                    axisLabel: {
                        show: true,
                        interval: 0, // 设置为 0，强制显示所有标签
                        // rotate: 40, // 旋转角度，使标签倾斜显示
                        formatter: function (value) {
                            // 自定义格式化函数，根据需要进行调整
                            return value;
                        }
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    //   left:'0',
                    data: days,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        margin: 30
                    }
                },
                visualMap: [
                    {
                        show: false,
                        left: 'right',
                        top: '10%',
                        dimension: 2,
                        min: 0,
                        max: 120,
                        itemWidth: 30,
                        itemHeight: 120,
                        calculable: true,
                        precision: 0.1,
                        textGap: 30,
                        inRange: {
                            symbolSize: [10, 45]
                        },
                        outOfRange: {
                            symbolSize: [10, 45],
                            color: ['rgba(255,255,255,0.4)']
                        },
                        controller: {
                            inRange: {
                                color: ['#c23531']
                            },
                            outOfRange: {
                                color: ['#999']
                            }
                        }
                    },
                    {
                        right: 'center',
                        top: 'top',
                        orient: 'horizontal',
                        dimension: 2,
                        // min: 0,
                        // max: 138,
                        // itemHeight: 120,
                        textGap: 10,
                        type: 'piecewise',
                        pieces: [
                            { min: 0, max: 55, color: '#61B5FF', label: '畅通（0~55）', },
                            { min: 55, max: 100, color: '#FFDC05', label: '轻度拥堵（55~100）', },
                            { min: 100, max: 145, color: '#F78606', label: '中度拥堵（100~145）', },
                            { min: 145, max: 300, color: '#8f0021', label: '严重拥堵（>145）', },],
                        textStyle: {
                            color: '#fff'
                        }
                        // inRange: {
                        //   color: ['#61B5FF','#61B5FF','#d5c173','#d5c173','#d5c173','#d5c173','#852D30','#852D30','#852D30','#852D30','#852D30','#852D30','#852D30','#852D30','#852D30','#852D30','#852D30','#852D30','#852D30']

                        //   // colorLightness: [0.9, 0.5]
                        // },
                        // outOfRange: {
                        //   color: ['rgba(255,255,255,0.4)']
                        // },
                        // controller: {
                        //   inRange: {
                        //     color: ['#c23531']
                        //   },
                        //   outOfRange: {
                        //     color: ['#999']
                        //   }
                        // }
                    }
                ],
                series: [
                    {
                        name: '路口拥堵指数（最大车均延误）',
                        type: 'scatter',
                        data: data,
                    }
                ]
            };

            if (option) {
                mychart.setOption(option, true);
            }
            mychart.on('click', 'series', (params) => {
                // console.log(params.name.split("_")[1]);
                // console.log(params.value[1]*5);
                let min = '00-05'
                if (params.value[1] * 5 == 5) {
                    min = '0' + String(params.value[1] * 5) + "-" + String(params.value[1] * 5 + 5)
                  }
                  else if (params.value[1] * 5 > 5&&params.value[1] * 5<55) {
                    min = String(params.value[1] * 5) + "-" + String(params.value[1] * 5 + 5)
                  }  
                  else if (params.value[1] * 5 == 55) {
                    min = String(params.value[1] * 5) + "-00"
                  }  
                // console.log(min);        
                setSelectedMin(min)
                setSelectedCross(params.name.replace("路口", ''))
                // setTurnName(params.name.split("_")[1])
            })
        }
    }, [congData, selectedHour, setSelectedMin, setSelectedCross])
    return (
        <div ref={chartRef} style={{ width: "100%", height: "95%" }}></div>
    )
}
export default CrossAvgCongestion;