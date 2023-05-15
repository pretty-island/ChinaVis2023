import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getFlow } from '../../../apis/api';

const TrafficFlow: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    interface FlowData {
        fid : string;
        flow: number;
    }
    const [flowData, setFlowData] = useState<FlowData[]>([]);
    // 获取数据
    useEffect(() => {
        getFlow("/getFlow").then((res) => {
            const data = res.data;
            setFlowData(data);
        });
    }, []);

    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current, undefined);
            }

            const dateList = flowData.map(function (item) {
                return "车道"+item.fid;
            });
            const allList = flowData.map(function (item) {
                return item.flow;
            });
            const option: EChartOption = {
                tooltip: {
                    // trigger: 'axis'
                },
                xAxis: {
                    name:"车道",
                    type: 'category',
                    // data: ['路口1', '路口2', '路口3', '路口4', '路口5', '路口6', '路口7']
                    data:dateList
                },
                yAxis: {
                    name:"车流量",
                    type: 'value'
                },
                series: [
                    {
                        // data: [120, 200, 150, 80, 70, 110, 130],
                        data:allList,
                        type: 'bar'
                    }
                ]
            };
            if (option) {
                mychart.setOption(option, true);
            }
        }

    })
    return (
        <div ref={chartRef} style={{ width: "95%", height: "95%" }}></div>
    )
}

export default TrafficFlow;