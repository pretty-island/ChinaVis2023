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
            var xAxisData = [
                "2018-01",
                "2018-02",
                "2018-03",
                "2018-04",
                "2018-05",
                "2018-06",
                "2018-07",
                "2018-08",
                "2018-09",
                "2018-10",
                "2018-11",
                "2018-12",
              ];
            const option: EChartOption = {
                legend: {
                    show: true,
                    left: "right",
                    y: "5%",
                    itemWidth: 18,
                    itemHeight: 12,
                    textStyle: { color: "#fff", fontSize: 14 },
                  },
                  color: ["#036BC8", "#4A95FF", "#5EBEFC", "#2EF7F3", "#FFFFFF"],
                  grid: {
                    left: "2%",
                    top: "12%",
                    bottom: "5%",
                    right: "5%",
                    containLabel: true,
                  },
                  tooltip: { trigger: "axis", },
                  xAxis: [
                    {
                      type: "category",
                      axisLine: { show: true, lineStyle: { color: "#6173A3" } },
                      axisLabel: { interval: 0, textStyle: { color: "#9ea7c4", fontSize: 14 } },
                      axisTick: { show: false },
                      data: xAxisData,
                    },
                  ],
                  yAxis: [
                    {
                      axisTick: { show: false },
                      splitLine: { show: false },
                      axisLabel: { textStyle: { color: "#9ea7c4", fontSize: 14 } },
                      axisLine: { show: true, lineStyle: { color: "#6173A3" } },
                    },
                  ],
                  series:  [
                    {
                      data: [150, 230, 224, 218, 135, 147, 260],
                      type: 'line'
                    }
                  ],
                };
               
            //     tooltip: {
            //         trigger: 'axis',
            //         formatter(params: any) {
            //             let a = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>'
            //             let b = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>'
            //             let c = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>'
            //             return a + '时间：' + params[0].name + "<br>" + b + "总内存：" +
            //                 params[1].data + "<br>" + c + "剩余内存" + params[0].value

            //         }
            //     },

            //     legend: {
            //         top: '4%',
            //         data: charts.names,
            //         textStyle: {
            //             fontSize: 14,
            //             color: 'F1F1F3'
            //         },
            //         right: '4%'
            //     },
            //     grid: {
            //         top: '10%',
            //         left: '4%',
            //         right: '4%',
            //         bottom: '10%',
            //         containLabel: true
            //     },
            //     xAxis: {
            //         show: true,
            //         type: 'category',
            //         boundaryGap: false,
            //         data: charts.lineX,
            //         axisLabel: {
            //             textStyle: {
            //                 color: 'rgb(0,253,255,0.6)'
            //             },
            //             formatter: function (params: any) {
            //                 return params.split(' ')[0] + '\n' + params.split(' ')[1]
            //             }
            //         }
            //     },
            //     yAxis: {
            //         show: true,
            //         splitArea: {
            //             show: true,
            //             areaStyle: {
            //                 color: "rgba(1, 22, 53, 0)"
            //             }
            //         },
            //         name: charts.unit,
            //         type: 'value',
            //         axisLabel: {
            //             formatter: '{value}',
            //             textStyle: {
            //                 color: 'rgb(0,253,255,0.6)'
            //             }
            //         },
            //         splitLine: {
            //             lineStyle: {
            //                 color: 'rgb(23,255,243,0.3)'
            //             }
            //         },

            //         axisLine: {
            //             show: true,
            //             lineStyle: {
            //                 color: 'rgb(0,253,255,0.6)'
            //             }
            //         }
            //     },
            //     series: lineY
            // }
            // setInterval(() => {
            //     mychart.setOption({
            //         legend: {
            //             selected: {
            //                 '出口': false,
            //                 '入口': false
            //             }
            //         }
            //     })
            //     mychart.setOption({
            //         legend: {

            //             selected: {
            //                 '出口': true,
            //                 '入口': true
            //             }
            //         }
            //     })
            // }, 10000)


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