import "./layout.css";
import { useEffect } from "react";

// 引入数据获取的接口
import { testUrl, postParams } from "../../apis/api";
import ChartHeader from "../chartHeader/chartHeader";
import QueCar from "../queCar/queCar";
import TrafficFlow from "../trafficFlow/trafficFlow";
import MainVisualizationView from "../MainVisualizationView";
import { BorderBox1, Decoration6, Decoration8, Decoration11, FullScreenContainer } from '@jiaminghi/data-view-react'
const Layout = () => {
  useEffect(() => {
    testUrl("/").then((res) => {
      // 后端返回的数据
      const data = res.data;
      console.log(data);
    });

    postParams("/passParam", { id: "testid", name: 'testname' }).then((res) => {
      console.log(res.data);
    });


  }, []);
  return (
    <div id="layout">
      <FullScreenContainer>
        <div className="head">
          <div className="head-left">
            <Decoration11 style={{ width: '150px', height: '60px' }} >概览</Decoration11>
            <Decoration11 style={{ width: '150px', height: '60px' }} >拥堵分析</Decoration11>
          </div>
          <div className="head-center">
            <Decoration8 style={{ width: '300px', height: '60px' }} />
            <div className="head-title">
              <span>交通态势感知</span>
              <Decoration6 style={{ width: '250px', height: '10px' }}></Decoration6>
            </div>
            <Decoration8 reverse={true} style={{ width: '300px', height: '60px' }} />
          </div>
          <div className="head-right">
            <div style={{ width: '150px', height: '60px' }}></div>
            <div style={{ width: '150px', height: '60px' }}></div>
          </div>
        </div>
        <div className="container">
          <div className="left">
            <BorderBox1 className="console">
              <ChartHeader chartName={"控制台"} />
            </BorderBox1>
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
                <ChartHeader chartName={"断面车流统计"} />
                <TrafficFlow />
              </BorderBox1>
            </div>
            <BorderBox1 className="r-bottom" style={{ height: "35%" }}>
              <ChartHeader chartName={"断面车流统计"} />
              <TrafficFlow />
            </BorderBox1>

            {/* <div id="heat" className="marginc"> */}
            {/* <ChartHeader chartName={"车辆热力图"} /> */}
            {/* <BorderBox1></BorderBox1> */}
            {/* </div> */}


          </div>
        </div>
      </FullScreenContainer >
    </div >

  );
};

export default Layout;
