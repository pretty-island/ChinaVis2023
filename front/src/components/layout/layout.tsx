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
import CarScatter from "../secondComponents/carScatter/carScatter";
import SecurityParallel from "../secondComponents/securityParallel/securityParallel";
import LineMap from "../thirdComponents/lineMap/lineMap";

import { BorderBox1, BorderBox13, Decoration6, Decoration8, Decoration11, FullScreenContainer } from '@jiaminghi/data-view-react'
import Speed from "../firstComponents/trafficFlow/speed";
import Total from "../firstComponents/total/total";
import EventChart from "../firstComponents/event/eventChart";
import TotalHeat from "../firstComponents/carHeat/totalHeat";
import Flow from "../firstComponents/carHeat/flow";
import EventTable from "../firstComponents/event/eventTable";
import Radar from "../firstComponents/firstConsole/radar";
const Layout = () => {
  // 当前用户在第几屏，默认第一屏
  const [nowPageIndex, setNowPageIndex] = useState<string>("firstButton");
  // 第一屏：用户选择的道路
  const [selectedRoad, setSelectedRoad] = useState<string>("all")
  // 第一屏：用户选择的时间段
  const [selectedTime, setSelectedTime] = useState<string>("all")
  // 用户选择的类型
  const [typeName, setTypeName] = useState("");
  const [eventName, setEventName] = useState("全天交通事件");

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
        style={{ cursor: 'pointer', width: '29%', height: '81%' }}>
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
            <ChangePage id="firstButton" text="交通概览" ></ChangePage>
            <ChangePage id="secondButton" text="拥堵分析"></ChangePage>
            <ChangePage id="thirdButton" text="驾驶行为" ></ChangePage>
          </div>
          <div className="head-center">
            <Decoration8 style={{ width: '50%', height: '70%' }} />
            <div className="head-title">
              <span>交通态势感知与可视分析系统</span>
              <Decoration6 style={{ width: '75%', height: '13%' }}></Decoration6>
            </div>
            <Decoration8 reverse={true} style={{ width: '50%', height: '70%' }} />
          </div>
          <div className="head-right">
            {/* <ChangePage id="thirdButton" text="拥堵分析" ></ChangePage> */}
            {/* <ChangePage id="fourthButton" text="驾驶行为"></ChangePage> */}
            {/* <div style={{ width: '35%', height: '76%' }}></div>
            <div style={{ width: '35%', height: '76%' }}></div> */}
          </div>
        </div>
        {
          nowPageIndex === "firstButton" &&
          <div className="container">
            <div className="f-left" style={{ width: "22%" }}>
              <BorderBox1 className="f-console" style={{ height: "35%" }}>
                <ChartHeader chartName={"道路运行健康度"} />
                {/* <FirstConsole setSelectedRoad={setSelectedRoad}
                  selectedRoad={selectedRoad}
                  setSelectedTime={setSelectedTime}
                  selectedTime={selectedTime}
                /> */}
                <Radar selectedRoad={selectedRoad} />
              </BorderBox1>
              <BorderBox1 className="f-queue" style={{ height: "65%" }}>
                <ChartHeader chartName={"交通事件"} />

                <div className="t" style={{ width: "100%", height: "50%" }}>
                  <EventChart setEventName={setEventName} />
                  {/* <CarHeat /> */}
                </div>
                <div className="b" style={{ width: "100%", height: "50%" }}>
                  <EventTable eventName={eventName} setEventName={setEventName} />
                </div>

              </BorderBox1>
            </div>

            <div className="f-right" style={{ width: "78%" }}>
              <div className="f-r-left" style={{ width: "65%" }}>
                <BorderBox1 className="f-rl-top" style={{ height: "65%", position: "relative", float: "left" }}>
                  <div style={{ position: "absolute", top: "40px", left: "50px", float: "left" }}>
                    {/* <BorderBox13 className="f-console" style={{ position:"absolute" }}> */}
                    {/* <ChartHeader chartName={"控制台"} /> */}
                    <FirstConsole setSelectedRoad={setSelectedRoad}
                      selectedRoad={selectedRoad}
                      setSelectedTime={setSelectedTime}
                      selectedTime={selectedTime}
                    />
                    {/* <Radar selectedRoad={selectedRoad} /> */}
                    {/* </BorderBox13> */}
                  </div>
                  {/* <div style={{ position:"absolute" }}> */}
                  <MainVisualizationView />
                  {/* </div> */}

                </BorderBox1>
                <BorderBox1 className="f-rl-bottom" style={{ height: "35%" }}>
                  <div className="changeView">
                    <ChartHeader chartName={"交通流量与平均速度"} />
                    <ChangeView />
                  </div>
                  {nowView === "流量" &&
                    <TrafficFlow selectedRoad={selectedRoad} />
                  }
                  {nowView === "速度" &&
                    <Speed selectedRoad={selectedRoad} />
                  }
                </BorderBox1>
              </div>
              <div className="f-r-right" style={{ width: "35%" }}>
                <BorderBox1 className="f-rr-top" style={{ height: "35%" }}>
                  <ChartHeader chartName={"道路通行量"} />
                  <Total selectedRoad={selectedRoad} typeName={typeName} setTypeName={setTypeName} />
                  {/* <EventChart /> */}
                </BorderBox1 >
                <BorderBox1 className="f-rr-bottom" style={{ height: "65%" }}>
                  <div className="rt" style={{ height: "60%" }}>
                    <ChartHeader chartName={"道路流量热力图"} />
                    {/* <CarHeat /> */}
                    <TotalHeat setTypeName={setTypeName} typeName={typeName} />
                  </div>
                  <div className="rb" style={{ width: "100%", height: "40%" }}>
                    <Flow typeName={typeName} />
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
                <BorderBox1 className="rt-left" style={{ height: "100%", width: "65%" }}>
                  <RoadMap />
                </BorderBox1>
                <BorderBox1 className="rt-right" style={{ height: "100%", width: "35%" }}>
                  <ChartHeader chartName={"拥堵分析"} />
                  <SecurityParallel />
                </BorderBox1>
              </div>
              <BorderBox1 className="r-bottom" style={{ height: "35%" }}>
                <ChartHeader chartName={"断面车流统计"} />
                <CarScatter />
              </BorderBox1>


            </div>
          </div>
        }
        {
          nowPageIndex === "thirdButton" &&
          <div className="container">
            {/* <div className="f-right" style={{ width: "78%" }}> */}
            <div className="f-r-left" style={{ width: "65%" }}>
              <BorderBox1 className="f-rl-top" style={{ height: "65%" }}>
                <MainVisualizationView />
              </BorderBox1>
              <BorderBox1 className="f-rl-bottom" style={{ height: "35%" }}>
                <LineMap />
                
                
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
                <Total selectedRoad={selectedRoad} />
                {/* <EventChart /> */}
              </BorderBox1 >
              <BorderBox1 className="f-rr-bottom" style={{ height: "65%" }}>

                <ChartHeader chartName={"交通事件"} />

                <div className="t" style={{ width: "100%", height: "50%" }}>
                  <EventChart />
                  {/* <CarHeat /> */}
                </div>
                <div className="b" style={{ width: "100%", height: "50%" }}>
                  <EventTable />
                </div>
              </BorderBox1>
            </div>
          </div>
          // </div>
        }
      </FullScreenContainer >
    </div >

  );
};

export default Layout;
