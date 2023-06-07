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
      // const dataSH =healData2
      // const dataRight=healData1
      // const dataLeft =healData2
      // const dataBJ = [
      //   [1, 55, 9, 56, 0.46, 18, 6, '良'],
      //   [2, 25, 11, 21, 0.65, 34, 9, '优'],
      //   [3, 56, 7, 63, 0.3, 14, 5, '良'],
      //   [4, 33, 7, 29, 0.33, 16, 6, '优'],
      //   [5, 42, 24, 44, 0.76, 40, 16, '优'],
      //   [6, 82, 58, 90, 1.77, 68, 33, '良'],
      //   [7, 74, 49, 77, 1.46, 48, 27, '良'],
      //   [8, 78, 55, 80, 1.29, 59, 29, '良'],
      //   [9, 267, 216, 280, 4.8, 108, 64, '重度污染'],
      //   [10, 185, 127, 216, 2.52, 61, 27, '中度污染'],
      //   [11, 39, 19, 38, 0.57, 31, 15, '优'],
      //   [12, 41, 11, 40, 0.43, 21, 7, '优'],
      //   [13, 64, 38, 74, 1.04, 46, 22, '良'],
      //   [14, 108, 79, 120, 1.7, 75, 41, '轻度污染'],
      //   [15, 108, 63, 116, 1.48, 44, 26, '轻度污染'],
      //   // [16, 33, 6, 29, 0.34, 13, 5, '优'],
      //   // [17, 94, 66, 110, 1.54, 62, 31, '良'],
      //   // [18, 186, 142, 192, 3.88, 93, 79, '中度污染'],
      //   // [19, 57, 31, 54, 0.96, 32, 14, '良'],
      //   // [20, 22, 8, 17, 0.48, 23, 10, '优'],
      //   // [21, 39, 15, 36, 0.61, 29, 13, '优'],
      //   // [22, 94, 69, 114, 2.08, 73, 39, '良'],
      //   // [23, 99, 73, 110, 2.43, 76, 48, '良'],
      //   // [24, 31, 12, 30, 0.5, 32, 16, '优'],
      //   // [25, 42, 27, 43, 1, 53, 22, '优'],
      //   // [26, 154, 117, 157, 3.05, 92, 58, '中度污染'],
      //   // [27, 234, 185, 230, 4.09, 123, 69, '重度污染'],
      //   // [28, 160, 120, 186, 2.77, 91, 50, '中度污染'],
      //   // [29, 134, 96, 165, 2.76, 83, 41, '轻度污染'],
      //   // [30, 52, 24, 60, 1.03, 50, 21, '良'],
      //   // [31, 46, 5, 49, 0.28, 10, 6, '优']
      // ];
      // const dataGZ = [
      //   [1, 26, 37, 27, 1.163, 27, 13, '优'],
      //   [2, 85, 62, 71, 1.195, 60, 8, '良'],
      //   [3, 78, 38, 74, 1.363, 37, 7, '良'],
      //   [4, 21, 21, 36, 0.634, 40, 9, '优'],
      //   [5, 41, 42, 46, 0.915, 81, 13, '优'],
      //   [6, 56, 52, 69, 1.067, 92, 16, '良'],
      //   [7, 64, 30, 28, 0.924, 51, 2, '良'],
      //   [8, 55, 48, 74, 1.236, 75, 26, '良'],
      //   [9, 76, 85, 113, 1.237, 114, 27, '良'],
      //   [10, 91, 81, 104, 1.041, 56, 40, '良'],
      //   [11, 84, 39, 60, 0.964, 25, 11, '良'],
      //   [12, 64, 51, 101, 0.862, 58, 23, '良'],
      //   [13, 70, 69, 120, 1.198, 65, 36, '良'],
      //   [14, 77, 105, 178, 2.549, 64, 16, '良'],
      //   [15, 109, 68, 87, 0.996, 74, 29, '轻度污染'],
      //   // [16, 73, 68, 97, 0.905, 51, 34, '良'],
      //   // [17, 54, 27, 47, 0.592, 53, 12, '良'],
      //   // [18, 51, 61, 97, 0.811, 65, 19, '良'],
      //   // [19, 91, 71, 121, 1.374, 43, 18, '良'],
      //   // [20, 73, 102, 182, 2.787, 44, 19, '良'],
      //   // [21, 73, 50, 76, 0.717, 31, 20, '良'],
      //   // [22, 84, 94, 140, 2.238, 68, 18, '良'],
      //   // [23, 93, 77, 104, 1.165, 53, 7, '良'],
      //   // [24, 99, 130, 227, 3.97, 55, 15, '良'],
      //   // [25, 146, 84, 139, 1.094, 40, 17, '轻度污染'],
      //   // [26, 113, 108, 137, 1.481, 48, 15, '轻度污染'],
      //   // [27, 81, 48, 62, 1.619, 26, 3, '良'],
      //   // [28, 56, 48, 68, 1.336, 37, 9, '良'],
      //   // [29, 82, 92, 174, 3.29, 0, 13, '良'],
      //   // [30, 106, 116, 188, 3.628, 101, 16, '轻度污染'],
      //   // [31, 118, 50, 0, 1.383, 76, 11, '轻度污染']
      // ];
      // const dataSH = [
      //   [1, 91, 45, 125, 0.82, 34, 23, 23, '良'],
      //   [2, 65, 27, 78, 0.86, 45, 29, 23, '良'],
      //   [3, 83, 60, 84, 1.09, 73, 27, 23, '良'],
      //   [4, 109, 81, 121, 1.28, 68, 51, 23, '轻度污染'],
      //   [5, 106, 77, 114, 1.07, 55, 51, 23, '轻度污染'],
      //   [6, 109, 81, 121, 1.28, 68, 51, 23, '轻度污染'],
      //   [7, 106, 77, 114, 1.07, 55, 51, 23, '轻度污染'],
      //   [8, 89, 65, 78, 0.86, 51, 26, 23, '良'],
      //   [9, 53, 33, 47, 0.64, 50, 17, 23, '良'],
      //   [10, 80, 55, 80, 1.01, 75, 24, 23, '良'],
      //   [11, 117, 81, 124, 1.03, 45, 24, 23, '轻度污染'],
      //   [12, 99, 71, 142, 1.1, 62, 42, 23, '良'],
      //   [13, 95, 69, 130, 1.28, 74, 50, 23, '良'],
      //   [14, 116, 87, 131, 1.47, 84, 40, 23, '轻度污染'],
      //   [15, 108, 80, 121, 1.3, 85, 37, 23, '轻度污染'],
      //   // [16, 134, 83, 167, 1.16, 57, 43, '轻度污染'],
      //   // [17, 79, 43, 107, 1.05, 59, 37, '良'],
      //   // [18, 71, 46, 89, 0.86, 64, 25, '良'],
      //   // [19, 97, 71, 113, 1.17, 88, 31, '良'],
      //   // [20, 84, 57, 91, 0.85, 55, 31, '良'],
      //   // [21, 87, 63, 101, 0.9, 56, 41, '良'],
      //   // [22, 104, 77, 119, 1.09, 73, 48, '轻度污染'],
      //   // [23, 87, 62, 100, 1, 72, 28, '良'],
      //   // [24, 168, 128, 172, 1.49, 97, 56, '中度污染'],
      //   // [25, 65, 45, 51, 0.74, 39, 17, '良'],
      //   // [26, 39, 24, 38, 0.61, 47, 17, '优'],
      //   // [27, 39, 24, 39, 0.59, 50, 19, '优'],
      //   // [28, 93, 68, 96, 1.05, 79, 29, '良'],
      //   // [29, 188, 143, 197, 1.66, 99, 51, '中度污染'],
      //   // [30, 174, 131, 174, 1.55, 108, 50, '中度污染'],
      //   // [31, 187, 143, 201, 1.39, 89, 53, '中度污染']
      // ];
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
            color: ['#216473','#c2be58','#fe6969'].reverse()
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