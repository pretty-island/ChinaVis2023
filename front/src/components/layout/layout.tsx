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

import { BorderBox1, BorderBox13, Decoration6, Decoration8, Decoration11, FullScreenContainer } from '@jiaminghi/data-view-react'
const Layout = () => {
  // 当前用户在第几屏，默认第一屏
  const [nowPageIndex, setNowPageIndex] = useState<string>("secondButton");
  // 第一屏：用户选择的路口
  const [selectedIntersection, setSelectedIntersection] = useState<string>("all")
  // 第一屏：用户选择的时间
  const [selectedTime, setSelectedTime] = useState<string>("all")


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
                <FirstConsole setSelectedIntersection={setSelectedIntersection}
                  selectedIntersection={selectedIntersection}
                  setSelectedTime={setSelectedTime}
                  selectedTime={selectedTime}
                />
              </BorderBox13>
              <BorderBox1 className="f-queue">
                <ChartHeader chartName={"排队车辆统计"} />
                <div className="t" style={{ height: "50%" }}>
                  <QueCar />
                </div>
                <div className="b">
                </div>
                {/* <QueCar /> */}
              </BorderBox1>
            </div>

            <div className="f-right" style={{ width: "78%" }}>
              <div className="f-r-top" style={{ height: "65%" }}>
                <BorderBox1 className="f-rt-left" style={{ width: "65%" }}>
                  <MainVisualizationView />
                </BorderBox1>
                <BorderBox1 className="f-rt-right" style={{ width: "35%" }}>
                  <ChartHeader chartName={"车流热力图"} />
                  <CarHeat />
                </BorderBox1>
              </div>
              <BorderBox1 className="f-r-bottom" style={{ height: "35%" }}>
                <ChartHeader chartName={"断面车流统计"} />
                <TrafficFlow />
              </BorderBox1>
            </div>
          </div>

        }
        {
          nowPageIndex === "secondButton" &&
          <div className="container">
          {/* <RoadMap /> */}
            <div className="left">
              <BorderBox13 className="console">
                <ChartHeader chartName={"控制台"} />
              </BorderBox13>
              <BorderBox1 className="queue">
                <ChartHeader chartName={"排队车辆统计"} />
                <QueCar />
              </BorderBox1>
            </div>
            <div className="right">
              <div className="r-top">
                <BorderBox1 className="rt-left" style={{ width: "65%" }}>
                  <MainVisualizationView />
                </BorderBox1>
                <BorderBox1 className="rt-right" style={{ width: "35%" }}>
                  <ChartHeader chartName={"车流热力图"} />
                  <RoadMap />
                </BorderBox1>
              </div>
              <BorderBox1 className="r-bottom" style={{ height: "35%" }}>
                <ChartHeader chartName={"断面车流统计"} />
                <TrafficFlow />
              </BorderBox1>
            </div>
          </div>
        }
      </FullScreenContainer >
    </div >

  );
};

export default Layout;
