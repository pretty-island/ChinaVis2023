import "./layout.css";
import { useEffect, useState } from "react";

// 引入数据获取的接口
// import { testUrl, postParams } from "../../apis/api";
import ChartHeader from "../chartHeader/chartHeader";
import FirstConsole from "../firstComponents/firstConsole/firstConsole";
import QueCar from "../firstComponents/queCar/queCar";
import TrafficFlow from "../firstComponents/trafficFlow/trafficFlow";
import CarHeat from "../firstComponents/carHeat/carHeat";
import MainVisualizationView from "../MainVisualizationView";
import RoadMap from "../secondComponents/roadMap/roadMap";
import RelativeMap from "../secondComponents/relativeMap/relativemap";

import { BorderBox1, BorderBox13, Decoration6, Decoration8, Decoration11, FullScreenContainer } from '@jiaminghi/data-view-react'
import Speed from "../firstComponents/trafficFlow/speed";
import Total from "../firstComponents/total/total";
import EventChart from "../firstComponents/event/eventChart";
const Layout = () => {
  // 当前用户在第几屏，默认第一屏
  const [nowPageIndex, setNowPageIndex] = useState<string>("firstButton");
  // 第一屏：用户选择的道路
  const [selectedRoad, setSelectedRoad] = useState<string>("all")
  // 第一屏：用户选择的时间段
  const [selectedTime, setSelectedTime] = useState<string>("all")

  // 用户切换速度和流量视图
  const [nowView, setNowView] = useState<string>("流量");

  interface ChangePageProps {
    id: string;
    text: string;
  }

  // 切换页面的组件
  const ChangePage: React.FC<ChangePageProps> = ({ id, text }) => {
    const color = id === nowPageIndex ? "rgb(26, 152, 252)" : "rgb(0, 69, 124)";
    return (
      <div
        onClick={() => {
          setNowPageIndex(id)
        }}
        // style={{ cursor: 'pointer' }}>
        style={{ cursor: 'pointer', width: '42%', height: '100%' }}>
        {/* style={{ cursor: 'pointer', width: '150px', height: '60px' }}> */}
        <Decoration11
          id={id}
          className="changePage"
          color={[color]}
          style={{
            // width: '150px', height: '60px'
          }}
        >{text}</Decoration11>
      </div>
    )
  }
  // 切换流量速度视图的组件
  const ChangeView: React.FC = () => {
    // 切换视图的函数
    const change = (): void => {
      setNowView(nowView === '流量' ? "速度" : "流量");
    };
    const btnText: string = nowView === '流量' ? "切换到速度视图" : "切换到流量视图";

    return (
      <div>
        <button onClick={change} style={{ color: "black", fontSize: '12px' }}>{btnText}</button>
      </div>
    )
  }
  return (
    <div id="layout">
      <FullScreenContainer>
        <div className="head">
          <div className="head-left" id="changeButton">
            <ChangePage id="firstButton" text="概览" ></ChangePage>
            <ChangePage id="secondButton" text="拥堵分析"></ChangePage>
          </div>
          <div className="head-center">
            <Decoration8 style={{ width: '50%', height: '70%' }} />
            <div className="head-title">
              <span>交通态势感知</span>
              <Decoration6 style={{ width: '60%', height: '13%' }}></Decoration6>
            </div>
            <Decoration8 reverse={true} style={{ width: '50%', height: '70%' }} />
          </div>
          <div className="head-right">
            <div style={{ width: '35%', height: '76%' }}></div>
            <div style={{ width: '35%', height: '76%' }}></div>
          </div>
        </div>

        {
          nowPageIndex === "firstButton" &&
          <div className="container">
            <div className="f-left" style={{ width: "22%" }}>
              <BorderBox13 className="f-console" style={{ height: "22%" }}>
                <ChartHeader chartName={"控制台"} />
                <FirstConsole setSelectedRoad={setSelectedRoad}
                  selectedRoad={selectedRoad}
                  setSelectedTime={setSelectedTime}
                  selectedTime={selectedTime}
                />
              </BorderBox13>
              <BorderBox1 className="f-queue">
                <ChartHeader chartName={"交通事件"} />
                <div className="t" style={{ height: "50%" }}>
                  <EventChart />
                  {/* <CarHeat /> */}
                </div>
                <div className="b">
                </div>
                {/* <QueCar /> */}
              </BorderBox1>
            </div>

            <div className="f-right" style={{ width: "78%" }}>
              <div className="f-r-left" style={{ width: "65%" }}>
                <BorderBox1 className="f-rl-top" style={{ height: "65%" }}>
                  <MainVisualizationView />
                </BorderBox1>
                <BorderBox1 className="f-rl-bottom" style={{ height: "35%" }}>
                  <div className="changeView">
                    <ChartHeader chartName={"交通流量与平均速度"} />
                    <ChangeView />
                  </div>
                  {nowView === "流量" &&
                    <TrafficFlow />
                  }
                  {nowView === "速度" &&
                    <Speed />
                  }
                  {/* <ChartHeader chartName={"交通流量统计图"} /> */}
                  {/* <div > */}
                  {/* <TrafficFlow /> */}
                  {/* </div> */}
                  {/* <div>
                    <Speed />
                  </div> */}
                </BorderBox1>
              </div>
              <div className="f-r-right" style={{ width: "35%" }}>
                <BorderBox1 className="f-rr-top" style={{ height: "35%" }}>
                  <ChartHeader chartName={"道路通行量"} />
                  <Total selectedRoad={selectedRoad}/>
                  {/* <EventChart /> */}
                </BorderBox1 >
                <BorderBox1 className="f-rr-bottom" style={{ height: "65%" }}>
                  <div className="rt" style={{ height: "70%" }}>
                  <ChartHeader chartName={"车流热力图"} />
                  <CarHeat />
                  </div>
                  <div className="rb">
                  </div>                  
                </BorderBox1>
              </div>
            </div>
          </div>
        }
        {
          nowPageIndex === "secondButton" &&
          <div className="container">
            <div className="left">
              <BorderBox13 className="console">
                <ChartHeader chartName={"控制台"} />
              </BorderBox13>
              <BorderBox1 className="relative">
                <ChartHeader chartName={"排队车辆统计"} />
                <RelativeMap />
              </BorderBox1>
            </div>
            <div className="right">
              <div className="r-top">
                <BorderBox1 className="rt-left" style={{ height: "100%", width: "80%" }}>
                  <RoadMap />
                </BorderBox1>
                <BorderBox1 className="rt-right" style={{ height: "100%", width: "20%" }}>
                  <ChartHeader chartName={"拥堵分析"} />

                </BorderBox1>
              </div>
              <BorderBox1 className="r-bottom" style={{ height: "35%" }}>
                {/* <ChartHeader chartName={"断面车流统计"} />
                <TrafficFlow /> */}

              </BorderBox1>
            </div>
          </div>
        }
      </FullScreenContainer >
    </div >

  );
};

export default Layout;
