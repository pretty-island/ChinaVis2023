import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getQueCar } from '../../../apis/api';

const CarScatter: React.FC = () => {
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
            
            var option = {
                xAxis: {
                    splitLine : {show : false}
                },
                yAxis: {
                    splitLine : {show : false}
                },
                series: [
                  {
                    symbolSize: 10,
                    data: [
                      [10.0, 8.04],
                      [8.07, 6.95],
                      [13.0, 7.58],
                      [9.05, 8.81],
                      [11.0, 8.33],
                      [14.0, 7.66],
                      [13.4, 6.81],
                      [10.0, 6.33],
                      [14.0, 8.96],
                      [12.5, 6.82],
                      [9.15, 7.2],
                      [11.5, 7.2],
                      [3.03, 4.23],
                      [12.2, 7.83],
                      [2.02, 4.47],
                      [1.05, 3.33],
                      [4.05, 4.96],
                      [6.03, 7.24],
                      [12.0, 6.26],
                      [12.0, 8.84],
                      [7.08, 5.82],
                      [5.02, 5.68]
                    ],
                    type: 'scatter'
                  }
                ]
              };
            
            if (option) {
                mychart.setOption(option, true);
            }
        }
    })
    return (
        <div ref={chartRef} style={{ width: "90%", height: "95%" }}></div>
    )
}
export default CarScatter;