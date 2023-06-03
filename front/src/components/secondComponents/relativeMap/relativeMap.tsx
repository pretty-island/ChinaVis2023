import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getQueCar } from '../../../apis/api';

const RelativeMap: React.FC = () => {
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
            var hazards = [
                {name:'东2',value:2939,symbolSize:0,label:{},color:''},
                {name:'',value:0},
                {name:'    ',value:0},
                {name:'南2',value:2025},
                {name:'南1',value:1626},
                {name:' ',value:0},
                {name:'     ',value:0},
                {name:'西2',value:530},
                {name:'西1',value:365},
                {name:'  ',value:0},
                {name:'      ',value:0},
                {name:'北1',value:268},
                {name:'北2',value:230},
                {name:'   ',value:0},
                {name:'       ',value:0},
                {name:'东1',value:63},
                // {name:'Epidemic',value:39},
                //{name:'Volcanic',value:32},
                // {name:'Insect infestation',value:3},
            ];
            var chains = [
                
                {source:'南2',target:'南1',value:20,lineStyle:{}},
                {source:'南2',target:'西1',value:25},
                {source:'南2',target:'北2',value:15},
                {source:'南2',target:'东2',value:16},
                {source:'西2',target:'南1',value:20,lineStyle:{}},
                {source:'西2',target:'西1',value:25},
                {source:'西2',target:'北2',value:15},
                {source:'西2',target:'东2',value:16},
                {source:'北1',target:'南1',value:20,lineStyle:{}},
                {source:'北1',target:'西1',value:25},
                {source:'北1',target:'北2',value:15},
                {source:'北1',target:'东2',value:16},
                {source:'东1',target:'南1',value:20,lineStyle:{}},
                {source:'东1',target:'西1',value:25},
                {source:'东1',target:'北2',value:15},
                {source:'东1',target:'东2',value:16},
                // {source:'5',target:'6',value:11},
                // {source:'6',target:'7',value:11},
                // {source:'7',target:'8',value:15},
            ];
            // 设置图中每个节点的大小及其他属性
            hazards.forEach(function (node) {
                node.symbolSize = node.value / 60;
                node.label = {
                    normal: {
                        show: node.name,
                        color:'white'
                    },
                };
            });
            // 设置连接线的宽度及其他属性
            chains.forEach(function (chains) {
                chains.lineStyle = {
                    normal: {
                        width: chains.value,
                        opacity: 0.5,
                    },
                };
            });
            var option = {
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                tooltip:{
                    formatter:function(params:any){
                        var sourceName=params.data.source;
                        var targetName=params.data.target;
                        var value=params.data.value;
                        var tooltipText="车流量<br>"+sourceName+"->"+targetName+': '+value;
                        return tooltipText;
                    },
                    triggerOn:'click'
                },
                series: [
                    {
                        name: 'hazards Interaction',
                        type: 'graph', //设置图形类别 关系图
                        layout: 'circular',
                        circular: {
                            // 设置环形布局是否旋转标签
                            rotateLabel: true,
                        },
                        data: hazards,
                        links: chains,
                        // edgeSymbol: ['none', 'arrow'],
                        roam: true,
                        label: {
                            normal: {
                                fontSize: 20,
                                position: 'top',
                                formatter: '{b}',
                                rotate:-20,
                                distance:5
                            },
                        },
                        itemStyle: { //配置节点的颜色
                            normal: {
                                color: function(param:any) {
                                    let colorList = ['#FFA500', '', '', '#9acd32', '#9acd32', ' ', '', '#F5F5DC', '#F5F5DC', ' ', '', '#00ffff', '#00ffff', ' ', '', '#FFA500'];
                                    return colorList[param.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{b}\n{c}'
                                },
                                opacity: 0.9, //设置透明度，为0时不绘制
                            }
                        },
            
                        lineStyle: {
                            normal: {
                                show: true,
                                color: 'source',
                                curveness: 0.3,
                                opacity: 0.2,
                            },
                        },
                        emphasis: {
                            focus: 'adjacency',
                            lineStyle: {
                              width: 10
                            }
                          }
                    },
                ],
            };
            

            // const dateList = queData.map(function (item) {
            //     return item.time;
            // });
            // const stopList = queData.map(function (item) {
            //     return item.stop_count;
            // });
            // const allList = queData.map(function (item) {
            //     return item.all_count;
            // });
            // var hazards = [
            //     { name: 'Flood', value: 2939, symbolSize: 0, label: {} },
            //     { name: 'Extreme temperature', value: 2025 },
            //     { name: 'Storm', value: 1626 },
            //     { name: 'Landslide', value: 530 },
            //     { name: 'Earthquake', value: 365 },
            //     { name: 'Wildfire', value: 268 },
            //     { name: 'Drought', value: 230 },
            //     { name: 'Tsunami', value: 63 },
            //     // {name:'Epidemic',value:39},
            //     { name: 'Volcanic', value: 32 },
            //     // {name:'Insect infestation',value:3},
            // ];
            // var chains = [
            //     { source: 'Landslide', target: 'Flood', value: 38, lineStyle: {} },
            //     { source: 'Storm', target: 'Flood', value: 22 },
            //     { source: 'Earthquake', target: 'Tsunami', value: 11 },
            //     { source: 'Landslide', target: 'Storm', value: 11 },
            //     { source: 'Earthquake', target: 'Landslide', value: 2 },
            //     { source: 'Landslide', target: 'Tsunami', value: 4 },
            // ];
            // // 设置图中每个节点的大小及其他属性
            // hazards.forEach(function (node) {
            //     node.symbolSize = node.value / 60;
            //     node.label = {
            //         normal: {
            //             show: node.name,
            //         },
            //     };
            // });
            // // 设置连接线的宽度及其他属性
            // chains.forEach(function (chains) {
            //     chains.lineStyle = {
            //         normal: {
            //             width: chains.value,
            //             opacity: 0.5,
            //         },
            //     };
            // });
            // var option = {
            //     // animationDurationUpdate: 1500,
            //     // animationEasingUpdate: 'quinticInOut',
            //     series: [
            //         {
            //             name: 'hazards Interaction',
            //             type: 'graph', //设置图形类别 关系图
            //             layout: 'circular',
            //             circular: {
            //                 // 设置环形布局是否旋转标签
            //                 rotateLabel: true,
            //             },
            //             data: hazards,
            //             links: chains,
            //             roam: true,
            //             label: {
            //                 normal: {
            //                     fontSize: 20,
            //                     position: 'right',
            //                     formatter: '{b}',
            //                 },
            //             },
            //             itemStyle: {
            //                 normal: {
            //                     color: '#0f3475',
            //                 },
            //             },
            //             lineStyle: {
            //                 normal: {
            //                     color: {
            //                         type: 'linear',
            //                         x: 0,
            //                         y: 0,
            //                         x2: 0,
            //                         y2: 1,
            //                         colorStops: [
            //                             {
            //                                 offset: 0,
            //                                 color: '#1551c2',
            //                             },
            //                             {
            //                                 offset: 1,
            //                                 color: '#7be0ff',
            //                             },
            //                         ],
            //                         globalCoord: false,
            //                     },
            //                     curveness: 0.3,
            //                     opacity: 0.2,
            //                 },
            //             },
            //         },
            //     ],
            // };

            // option && mychart.setOption(option, true);
            if (option) {
                mychart.setOption(option, true);
            }
        }
    })
    return (
        <div ref={chartRef} style={{ width: "90%", height: "95%" }}></div>
    )
}
export default RelativeMap;