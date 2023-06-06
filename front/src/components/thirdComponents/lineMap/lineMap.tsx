import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getQueCar } from '../../../apis/api';

const LineMap: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    interface QueData {
        time: string;
        all_count: number;
        stop_count: number;
    }
    const [queData, setQueData] = useState<QueData[]>([]);
    // 获取数据
    useEffect(() => {
        getQueCar("/getQueCar").then((res) => {
            const data = res.data;
            setQueData(data);

        });
    }, []);

    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current);
            }
            
            var charts = {
                unit: '单位(km)',
                names: ['出口1', '入口2'],
                lineX: ['2018-11-11 17:01', '2018-11-11 17:02', '2018-11-11 17:03', '2018-11-11 17:04', '2018-11-11 17:05', '2018-11-11 17:06', '2018-11-11 17:07', '2018-11-11 17:08', '2018-11-11 17:09', '2018-11-11 17:10', '2018-11-11 17:11', '2018-11-11 17:12', '2018-11-11 17:13', '2018-11-11 17:14', '2018-11-11 17:15', '2018-11-11 17:16', '2018-11-11 17:17', '2018-11-11 17:18', '2018-11-11 17:19', '2018-11-11 17:20'],
                value: [
                    [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
                    [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65, 325, 468, 108, 253, 98]
                ]
            }
            var color = ['rgba(205, 173, 62', 'rgba(93, 255, 255']
            var lineY = []
            
            for (var i = 0; i < charts.names.length; i++) {
                var x = i
                if (x > color.length - 1) {
                    x = color.length - 1
                }
                var data = {
                    name: charts.names[i],
                    type: 'line',
                    color: color[x] + ')',
                    markLine:5,

                    smooth: false,
                    areaStyle: {
                        normal: {
                            
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: color[x] + ', 0.3)'
                            }, {
                                offset: 0.8,
                                color: color[x] + ', 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    symbol: 'circle',
                    symbolSize: 5,
                    data: charts.value[i],
                }
                lineY.push(data)
            }
            
            lineY[0].markLine = {
                silent: true,
                data: [{
                    yAxis: 5
                }, {
                    yAxis: 100
                }, {
                    yAxis: 200
                }, {
                    yAxis: 300
                }, {
                    yAxis: 400
                }]
            }
            var option = {
                
                 title: {
                    text: '历史数据-曲线',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16,
                        color: '#F1F1F3'
                    },
                    left: '6%',
                    top: '4%'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter(params:any){
                        let a = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>'
                        let b ='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>'
                        let c ='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>'
                        return a+'时间：'+params[0].name+"<br>"+b+"总内存："+ 
                        params[1].data  + "<br>"+c+"剩余内存"+params[0].value
                                
                    }
                },
                
                legend: {
                       top: '4%',
                    data: charts.names,
                    textStyle: {
                        fontSize: 14,
                        color: 'F1F1F3'
                    },
                    right: '4%'
                },
                grid: {
                    top: '10%',
                    left: '4%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    show: true,
                    type: 'category',
                    boundaryGap: false,
                    data: charts.lineX,
                    axisLabel: {
                        textStyle: {
                            color: 'rgb(0,253,255,0.6)'
                        },
                        formatter: function(params:any) {
                            return params.split(' ')[0] + '\n' + params.split(' ')[1]
                        }
                    }
                },
                yAxis: {
                show: true,
                 splitArea: {
                 show: true,
                 areaStyle: {
                    color:"rgba(1, 22, 53, 0)"
                   }
                 },
                    name: charts.unit,
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: 'rgb(0,253,255,0.6)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgb(23,255,243,0.3)'
                        }
                    },
                    
                    axisLine: {
                            show:true,
                        lineStyle: {
                            color: 'rgb(0,253,255,0.6)'
                        }
                    }
                },
                series: lineY
            }
            setInterval(() => {
                mychart.setOption({
                  legend: {
                    selected: {
                      '出口': false,
                      '入口': false
                    }
                  }
                })
                mychart.setOption({
                  legend: {
                      
                    selected: {
                      '出口': true,
                      '入口': true
                    }
                  }
                })
            },10000)
              
            
            if (option) {
                mychart.setOption(option, true);
            }
        }
    })
    return (
        <div ref={chartRef} style={{ width: "90%", height: "95%" }}></div>
    )
}
export default LineMap;