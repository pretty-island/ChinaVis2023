import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getHealth } from '../../../apis/api';
interface HealthParallelProps {
  selectedRoad: string;
  // setTypeName: React.Dispatch<React.SetStateAction<string>>;
  // typeName: string;
}
const HealthParallel: React.FC<HealthParallelProps> = ({ selectedRoad }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [heal, setHeal] = useState();
  const [healData1, setHealData1] = useState();
  const [healData2, setHealData2] = useState();
  // 获取数据
  useEffect(() => {
    getHealth("/getHealth").then((res) => {
      const data = res.data;
      setHeal(data);
    });
  }, []);
  // 设置数据
  useEffect(() => {
    if (selectedRoad && heal) {
      if (selectedRoad == "all") {
        const data1 = []
        data1.push(...heal["道路1"]["道路1_向右"])
        data1.push(...heal["道路2"]["道路2_向右"])
        data1.push(...heal["道路3"]["道路3_向右"])
        data1.push(...heal["道路4"]["道路4_向右"])
        data1.push(...heal["道路5"]["道路5_向右"])
        data1.push(...heal["道路6"]["道路6_向右"])
        data1.push(...heal["道路7"]["道路7_向右"])
        data1.push(...heal["道路8"]["道路8_向右"])
        data1.push(...heal["道路9"]["道路9_向右"])
        data1.push(...heal["道路10"]["道路10_向右"])
        data1.push(...heal["道路11"]["道路11_向上"])
        data1.push(...heal["道路12"]["道路12_向上"])
        data1.push(...heal["道路13"]["道路13_向上"])
        data1.push(...heal["道路14"]["道路14_向上"])
        data1.push(...heal["道路15"]["道路15_向上"])
        setHealData1(data1)
        const data2 = []
        data2.push(...heal["道路1"]["道路1_向左"])
        data2.push(...heal["道路2"]["道路2_向左"])
        data2.push(...heal["道路3"]["道路3_向左"])
        data2.push(...heal["道路4"]["道路4_向左"])
        data2.push(...heal["道路5"]["道路5_向左"])
        data2.push(...heal["道路6"]["道路6_向左"])
        data2.push(...heal["道路7"]["道路7_向左"])
        data2.push(...heal["道路8"]["道路8_向左"])
        data2.push(...heal["道路9"]["道路9_向左"])
        data2.push(...heal["道路10"]["道路10_向左"])
        data2.push(...heal["道路11"]["道路11_向下"])
        data2.push(...heal["道路12"]["道路12_向下"])
        data2.push(...heal["道路13"]["道路13_向下"])
        data2.push(...heal["道路14"]["道路14_向下"])
        data2.push(...heal["道路15"]["道路15_向下"])
        setHealData2(data2)
      }
      else if (selectedRoad == "11" || selectedRoad == "12" || selectedRoad == "13" || selectedRoad == "14" || selectedRoad == "15") {
        setHealData1(heal["道路" + selectedRoad]["道路" + selectedRoad + "_向上"])
        setHealData2(heal["道路" + selectedRoad]["道路" + selectedRoad + "_向下"])
      }
      else {
        setHealData1(heal["道路" + selectedRoad]["道路" + selectedRoad + "_向右"])
        setHealData2(heal["道路" + selectedRoad]["道路" + selectedRoad + "_向左"])
      }
    }
  }, [selectedRoad, heal])
  useEffect(() => {
    if (chartRef.current !== null) {
      let mychart = echarts.getInstanceByDom(chartRef.current);
      if (mychart == null) {
        mychart = echarts.init(chartRef.current);
      }
      const dataBJ = []
      // ...healData1
      if (healData1 && healData2) {
        dataBJ.push(...healData1)
        dataBJ.push(...healData2)
      }
      const schema = [
        { name: 'road', index: 0, text: '道路' },
        { name: 'date', index: 1, text: '时间' },
        { name: 'cong', index: 2, text: '道路占有率' },
        { name: 'road', index: 3, text: '平均延迟' },
        { name: 'flow', index: 4, text: '超速事件' },
        { name: 'nixing', index: 5, text: ' 逆行事件' },
        { name: 'overspeed', index: 6, text: '占用公交车道' },
        { name: 'stop', index: 7, text: '占用机动车道' },
        { name: 'health', index: 8, text: '道路健康度' },
        { name: '等级', index: 9, text: '等级' }
      ];
      const lineStyle = {
        width: 1,
        opacity: 0.5
      };

      const roadMapping = function (num: string) {
        let x = "";
        switch (num) {
          case "all":
            x = "全部道路"
            break;
          default:
            x = "道路" + num
        }
        return x
      };
      const option: EChartOption = {
        // legend: {
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
        tooltip: {
          padding: 10,
          // backgroundColor: '#222',
          // borderColor: '#777',
          // borderWidth: 1
          // trigger: "axis",
          formatter: function (params) {
            var data = params.data;
            var tooltipContent = '道路: ' + data[0] + '<br>';
            tooltipContent += '时间: ' + data[1] + '时'+'<br>';
            tooltipContent += '道路健康度: ' + data[data.length - 2] + '<br>';
            tooltipContent += '健康度等级: ' + data[data.length - 1];
            return tooltipContent;
          },
        },
        parallelAxis: [
          {
            dim: 0,
            name: schema[0].text,
            type: 'category',
            axisLabel:{
              show:false
            }
          },
          {
            dim: 1,
            name: schema[1].text,
            inverse: false,
            max: 15,
            min: 7,
            // nameLocation: 'start'
          },
          { dim: 2, name: schema[2].text },
          { dim: 3, name: schema[3].text },
          { dim: 4, name: schema[4].text },
          { dim: 5, name: schema[5].text },
          { dim: 6, name: schema[6].text },
          { dim: 7, name: schema[7].text },
          { dim: 8, name: schema[8].text },
          {
            dim: 9,
            name: schema[9].text,
            type: 'category',
            inverse: true,
            nameLocation: 'start',
            data: ['非常健康', '健康', '亚健康', '不健康']
          }
        ],
        visualMap: {
          show: true,
          // type:'piecewise',
          min: 0,
          max: 100,
          right: 0,
          // top:200,
          // inverse: true,
          dimension:8,
          // pieces:[
          //   {value:'非常健康',color:'green'},
          //   {value:'健康',color:'blue'},
          //   {value:'亚健康',color:'orange'},
          //   {value:'不健康',color:'red'},

          // ]
          
          inRange: {
            color: ['#003f76','#52CC6C','#FFA500','#9C3538','#852D30','#852D30'].reverse()
            // colorAlpha: [0, 1]
          }
        },
        parallel: {
          left: '4.5%',
          right: '12.5%',
          top: "17%",
          bottom: '10%',
          // layout: 'vertical',
          parallelAxisDefault: {
            type: 'value',
            name: '道路健康度',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
              color: '#fff',
              fontSize: 12
            },
            axisLine: {
              lineStyle: {
                color: '#aaa'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#777'
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              color: '#fff'
            }
          }
        },
        graphic: [
          {
            type: 'text',
            left: '14',
            top: '10',
            style: {
              text: roadMapping(selectedRoad),
              fill: '#fFF',
              fontSize: 13,
              // fontWeight: 'bold'
            }
          }
        ],
        series: [
          {
            // name: 'Beijing',
            type: 'parallel',
            lineStyle: lineStyle,
            data: dataBJ
          },
          // {
          //   name: 'Shanghai',
          //   type: 'parallel',
          //   lineStyle: lineStyle,
          //   data: dataSH
          // },
        ]
      };

      if (option) {
        mychart.setOption(option, true);
      }
    }
  }, [selectedRoad, healData1, healData2])
  return (
    <div ref={chartRef} style={{ width: "95%", height: "95%" }}></div>
  )
}
export default HealthParallel;