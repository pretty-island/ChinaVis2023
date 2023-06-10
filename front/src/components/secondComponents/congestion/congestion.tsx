import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import React, { useEffect, useRef, useState } from "react";
import { getRoadCongestion } from '../../../apis/api';

interface CongestionProps {
  setSelectedMin: React.Dispatch<React.SetStateAction<string>>;
  selectedHour: string;
  // setSelectedCross: React.Dispatch<React.SetStateAction<string>>;
  // setTurnName: React.Dispatch<React.SetStateAction<string>>;
}

const CongestionParallel: React.FC<CongestionProps> = ({ selectedHour, setSelectedMin }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [congData, setCongData] = useState<QueData[]>([]);
  // 获取数据
  useEffect(() => {
    getRoadCongestion("/getRoadCongestion").then((res) => {
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
        '道路1_向右', '道路1_向左', '道路2_向右', '道路2_向左', '道路3_向右', '道路3_向左',
        '道路4_向右', '道路4_向左',
        '道路5_向右', '道路5_向左', '道路6_向右', '道路6_向左', '道路7_向右',

        '道路7_向左', '道路8_向右', '道路8_向左', '道路9_向右', '道路9_向左',
        '道路10_向右',
        '道路10_向左', '道路11_向上', '道路11_向下', '道路12_向上', '道路12_向下', '道路13_向上', '道路13_向下', '道路14_向上', '道路14_向下', '道路15_向上', '道路15_向下'
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

      const data = congData[selectedHour]
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
          backgroundColor: 'rgba(0,0,0,0.2)',
          textStyle: {
            color: '#fff',
            fontWeight: 'bold'
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
            let roadLevel = '畅通';
            if (params.data[2] >= 4) {
              roadLevel = '严重拥堵';
            }
            else if (params.data[2] >= 2) {
              roadLevel = '中度拥堵';
            }
            else if (params.data[2] >= 1.5) {
              roadLevel = '轻度拥堵';
            }

            return params.seriesName + '<br>' + params.name + "：" + params.data[2] + "<br>拥堵程度：" + roadLevel + "<br>时间：" + time
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
          left: 27,
          bottom: 10,
          right: 30,
          top: 30,
          containLabel: true
        },
        graphic: [
          {
            type: 'text',
            left: '14',
            top: '8',
            style: {
              text: '时间：' + selectedHour + "     " + "道路拥堵情况",
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
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            interval: 0, // 设置为 0，强制显示所有标签
            rotate: 40, // 旋转角度，使标签倾斜显示
            formatter: function (value) {
              // 自定义格式化函数，根据需要进行调整
              return value;
            }
          },
        },
        yAxis: {
          type: 'category',
          data: days,
          axisLine: {
            show: false
          }
        },
        visualMap: [
          {
            show: false,
            left: 'right',
            top: '10%',
            dimension: 2,
            min: 0,
            max: 10,
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
            // max: 9,
            // itemHeight: 120,
            // text: ['明暗：二氧化硫'],
            textGap: 10,
            type: 'piecewise',
            pieces: [
              { min: 0, max: 1.5, color: '#61B5FF', label: '畅通（0~1.5）', },
              { min: 1.5, max: 2.0, color: '#FFDC05', label: '轻度拥堵（1.5~2.0', },
              { min: 2.0, max: 4.0, color: '#F78606', label: '中度拥堵（2.0~4.0）', },
              { min: 4.0, max: 9, color: '#8f0021', label: '严重拥堵（>4.0）', },],
            textStyle: {
              color: '#fff'
            }
            // inRange: {
            //   color: ['#61B5FF', '#61B5FF', '#d5c173', '#d5c173', '#d5c173', '#d5c173', '#852D30', '#852D30', '#852D30', '#852D30', '#852D30', '#852D30', '#852D30', '#852D30', '#852D30', '#852D30', '#852D30', '#852D30', '#852D30']

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
            name: '道路拥堵指数（平均延迟）',
            type: 'scatter',

            data: data,
            // symbolSize: function (val) {
            //   // console.log(val[1]);
            //   let d=0
            //   if(val[2]<1){
            //     d=val[2]*10
            //   }
            //   else if(val[2]<5){
            //     d=val[2]*7
            //   }
            //   else {
            //     d=val[2]*5
            //   }
            //   return d;
            // },

            // animationDelay: function (idx) {
            //   // return idx * 5;
            // }
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
        else if (params.value[1] * 5 > 5 && params.value[1] * 5 < 55) {
          min = String(params.value[1] * 5) + "-" + String(params.value[1] * 5 + 5)
        }
        else if (params.value[1] * 5 == 55) {
          min = String(params.value[1] * 5) + "-00"
        }
        // console.log(min);        
        setSelectedMin(min)
        // setSelectedCross(params.name.split("_")[0])
        // setTurnName(params.name.split("_")[1])
      })
    }
  }, [congData, selectedHour, setSelectedMin])
  return (
    <div ref={chartRef} style={{ width: "100%", height: "95%" }}></div>
  )
}
export default CongestionParallel;