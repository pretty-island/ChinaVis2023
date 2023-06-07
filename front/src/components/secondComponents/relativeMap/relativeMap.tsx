import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getTurnFlow } from '../../../apis/api';
interface RelativeMapProps {
    selectedCross: string;
    selectedHour: string;
    selectedMin: string;
    setTurnName:React.Dispatch<React.SetStateAction<string>>;
}
const RelativeMap: React.FC<RelativeMapProps> = ({ setTurnName,selectedCross, selectedHour, selectedMin }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [turnData, setTurnData] = useState();
    const [turnUse, setTurnUse] = useState();
    // 获取数据
    useEffect(() => {
        getTurnFlow("/getTurnFlow").then((res) => {
            setTurnData(res.data);
            // console.log(turnData);            
        });
    }, []);
    // 设置数据
    useEffect(() => {
        if (selectedCross && selectedHour && selectedMin && turnData) {
            let data = []
            if (["7点", "8点", "9点"].includes(selectedHour)) {
                const time = "0" + selectedHour.replace("点", "") + ":" + selectedMin.split("-")[0];
                data = turnData[time]["路口" + selectedCross];
            }
            else {
                const time = selectedHour.replace("点", "") + ":" + selectedMin.split("-")[0];
                data = turnData[time]["路口" + selectedCross];
            }
            setTurnUse(data);
        }
        // console.log(turnUse);
    }, [turnData, selectedCross, selectedHour, selectedMin]);


    useEffect(() => {
        if (chartRef.current !== null) {
            let mychart = echarts.getInstanceByDom(chartRef.current);
            if (mychart == null) {
                mychart = echarts.init(chartRef.current);
            }
            const down1 = (turnUse?.["下道路"]?.["掉头"]) ? (turnUse?.["下道路"]?.["掉头"]) : 0;
            const down2 = (turnUse?.["下道路"]?.["左转"]) ? (turnUse?.["下道路"]?.["左转"]) : 0;
            const down3 = (turnUse?.["下道路"]?.["直行"]) ? (turnUse?.["下道路"]?.["直行"]) : 0;
            const down4 = (turnUse?.["下道路"]?.["右转"]) ? (turnUse?.["下道路"]?.["右转"]) : 0;
            const left1 = (turnUse?.["左道路"]?.["右转"]) ? (turnUse?.["左道路"]?.["右转"]) : 0;
            const left2 = (turnUse?.["左道路"]?.["掉头"]) ? (turnUse?.["左道路"]?.["掉头"]) : 0;
            const left3 = (turnUse?.["左道路"]?.["左转"]) ? (turnUse?.["左道路"]?.["左转"]) : 0;
            const left4 = (turnUse?.["左道路"]?.["直行"]) ? (turnUse?.["左道路"]?.["直行"]) : 0;
            const up1 = (turnUse?.["上道路"]?.["直行"]) ? (turnUse?.["上道路"]?.["直行"]) : 0;
            const up2 = (turnUse?.["上道路"]?.["右转"]) ? (turnUse?.["上道路"]?.["右转"]) : 0;
            const up3 = (turnUse?.["上道路"]?.["掉头"]) ? (turnUse?.["上道路"]?.["掉头"]) : 0;
            const up4 = (turnUse?.["上道路"]?.["左转"]) ? (turnUse?.["上道路"]?.["左转"]) : 0;
            const right1 = (turnUse?.["右道路"]?.["左转"]) ? (turnUse?.["右道路"]?.["左转"]) : 0;
            const right2 = (turnUse?.["右道路"]?.["直行"]) ? (turnUse?.["右道路"]?.["直行"]) : 0;
            const right3 = (turnUse?.["右道路"]?.["右转"]) ? (turnUse?.["右道路"]?.["右转"]) : 0;
            const right4 = (turnUse?.["右道路"]?.["掉头"]) ? (turnUse?.["右道路"]?.["掉头"]) : 0;
            // console.log(turnUse);

            const hazards = [
                { name: '右路入', value: down4 + left4 + up4 + right4 },
                { name: '下路出', value: down1 + down2 + down3 + down4 },
                { name: '下路入', value: down1 + left1 + up1 + right1 },
                { name: '左路出', value: left1 + left2 + left3 + left4 },
                { name: '左路入', value: down2 + left2 + up2 + right2 },
                { name: '上路出', value: up1 + up2 + up3 + up4 },
                { name: '上路入', value: down3 + left3 + up3 + right3 },
                { name: '右路出', value: right1 + right2 + right3 + right4 },
            ];
            // const hazards = [
            //     {name:'右路入',value:2939,symbolSize:0,label:{},color:''},
            //     {name:'',value:0},
            //     {name:'    ',value:0},
            //     {name:'南2',value:2025},
            //     {name:'南1',value:1626},
            //     {name:' ',value:0},
            //     {name:'     ',value:0},
            //     {name:'西2',value:530},
            //     {name:'西1',value:365},
            //     {name:'  ',value:0},
            //     {name:'      ',value:0},
            //     {name:'北1',value:268},
            //     {name:'北2',value:230},
            //     {name:'   ',value:0},
            //     {name:'       ',value:0},
            //     {name:'东1',value:63},
            //     // {name:'Epidemic',value:39},
            //     //{name:'Volcanic',value:32},
            //     // {name:'Insect infestation',value:3},
            // ];
            const chains = [

                { source: '下路出', target: '下路入', value: down1 },
                { source: '下路出', target: '左路入', value: down2 },
                { source: '下路出', target: '上路入', value: down3 },
                { source: '下路出', target: '右路入', value: down4 },
                { source: '左路出', target: '下路入', value: left1 },
                { source: '左路出', target: '左路入', value: left2 },
                { source: '左路出', target: '上路入', value: left3 },
                { source: '左路出', target: '右路入', value: left4 },
                { source: '上路出', target: '下路入', value: up1 },
                { source: '上路出', target: '左路入', value: up2 },
                { source: '上路出', target: '上路入', value: up3 },
                { source: '上路出', target: '右路入', value: up4 },
                { source: '右路出', target: '下路入', value: right1 },
                { source: '右路出', target: '左路入', value: right2 },
                { source: '右路出', target: '上路入', value: right3 },
                { source: '右路出', target: '右路入', value: right4 },
            ];
            // const chains = [

            //     {source:'南2',target:'南1',value:20,lineStyle:{}},
            //     {source:'南2',target:'西1',value:25},
            //     {source:'南2',target:'北2',value:15},
            //     {source:'南2',target:'东2',value:16},
            //     {source:'西2',target:'南1',value:20,lineStyle:{}},
            //     {source:'西2',target:'西1',value:25},
            //     {source:'西2',target:'北2',value:15},
            //     {source:'西2',target:'东2',value:16},
            //     {source:'北1',target:'南1',value:20,lineStyle:{}},
            //     {source:'北1',target:'西1',value:25},
            //     {source:'北1',target:'北2',value:15},
            //     {source:'北1',target:'东2',value:16},
            //     {source:'东1',target:'南1',value:20,lineStyle:{}},
            //     {source:'东1',target:'西1',value:25},
            //     {source:'东1',target:'北2',value:15},
            //     {source:'东1',target:'东2',value:16},
            //     // {source:'5',target:'6',value:11},
            //     // {source:'6',target:'7',value:11},
            //     // {source:'7',target:'8',value:15},
            // ];
            // 设置图中每个节点的大小及其他属性
            hazards.forEach(function (node) {
                node.symbolSize = node.value / 2.4;
                node.label = {
                    normal: {
                        show: node.name,
                        color: 'white'
                    },
                };
            });
            // 设置连接线的宽度及其他属性
            chains.forEach(function (chains) {
                chains.lineStyle = {
                    normal: {
                        width: chains.value,
                        opacity: 0.4,
                        type:'solid'
                    },
                };
            });

            const time = selectedHour.replace("点", "") + ":" + selectedMin.split("-")[0]+"-"+selectedHour.replace("点", "") + ":" + selectedMin.split("-")[1];
            const option: EChartOption = {
                // animationDurationUpdate: 1500,
                // animationEasingUpdate: 'quinticInOut',
                tooltip: {
                    formatter: function (params: any) {
                        if (params.dataType === 'node') {
                            return params.data.name + "车流量：" + params.data.value;
                        }
                        else if (params.dataType === 'edge') {
                            const sourceName = params.data.source;
                            const targetName = params.data.target;
                            const value = params.data.value;
                            const tooltipText = "车流量<br>" + sourceName + "->" + targetName + ': ' + value;
                            return tooltipText;
                        }
                    },
                    triggerOn: 'click'
                },
                graphic: [
                    {
                        type: 'text',
                        left: '14',
                        top: '10',
                        style: {
                            text: '时间：'+time + "     " + "路口"+selectedCross,
                            fill: '#fFF',
                            fontSize: 13,
                            // fontWeight: 'bold'
                        }
                    }
                ],
                series: [
                    {
                        name: 'hazards Interaction',
                        type: 'graph', //设置图形类别 关系图
                        layout: 'circular',
                        center: ['50%', '50%'],
                        zoom: 0.7,
                        circular: {
                            // radius:'0%',
                            // 设置环形布局是否旋转标签
                            rotateLabel: true,

                        },
                        edgeSymbol:['circle', 'arrow'],
                        // edgeSymbolSize: function (value, params) {
                        //     // 自定义回调函数根据连接线的粗细计算箭头的大小
                        //     let lineWidth = params.data.lineStyle.normal.width;
                        //     // 可根据需要调整箭头大小与连接线粗细的比例关系
                        //     let arrowSize = lineWidth;
                        //     return [0, 100];
                        //   },
                        edgeSymbolSize:0,
                        // borderCap:'square',
                        data: hazards,
                        links: chains,
                        // edgeSymbol: ['none', 'arrow'],
                        roam: false,
                        label: {
                            normal: {
                                fontSize: 20,
                                position: 'top',
                                formatter: '{b}',
                                rotate: -20,
                                distance: 5
                            },
                        },
                        itemStyle: { //配置节点的颜色
                            borderCap:'round',
                            normal: {
                                color: function (param: any) {
                                    // let colorList = ['#FFA500', '', '', '#9acd32', '#9acd32', ' ', '', '#F5F5DC', '#F5F5DC', ' ', '', '#00ffff', '#00ffff', ' ', '', '#FFA500'];
                                    // let colorList = ['#beddfc', '#252525', '#3d72a1', '#ffe380', '#ffe380', '#5fc8dd', '#5fc8dd', '#beddfc'];
                                    let colorList = ['#437db1',  '#A1794C', '#A1794C', '#8CA5D1', '#8CA5D1','#B5A462', '#B5A462', '#437db1'];
                                    return colorList[param?.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{b}\n{c}'
                                },
                                opacity: 1, //设置透明度，为0时不绘制
                            }
                        },

                        lineStyle: {
                            normal: {
                                show: true,
                                color: 'source',
                                curveness: 0.2,
                                opacity: 1,
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

            if (option) {
                mychart.setOption(option, true);
            }
            mychart.on('click',(params)=>{
                if (params.dataType === "node") {
                    const nodeName = params.name;
                    if(nodeName=="下路出"){
                        setTurnName("下")
                    }
                    else if(nodeName=="上路出"){
                        setTurnName("上")
                    }
                    else if(nodeName=="左路出"){
                        setTurnName("左")
                    }
                    else if(nodeName=="右路出"){
                        setTurnName("右")
                    }
                    console.log(nodeName);

                }
            })
        }
    }, [turnUse,setTurnName])
    return (
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
    )
}
export default RelativeMap;